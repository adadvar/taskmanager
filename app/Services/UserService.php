<?php

namespace App\Services;

use App\Exceptions\UserAlreadyRegisteredException;
use App\Http\Requests\Auth\RegisterNewUserRequest;
use App\Http\Requests\Auth\RegisterVerifyUserRequest;
use App\Http\Requests\Auth\ResendVerificationCodeRequest;
use App\Http\Requests\User\ChangeEmailRequest;
use App\Http\Requests\User\ChangeEmailSubmitRequest;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Requests\User\UnregisterUserRequest;
use App\Http\Requests\User\UserDeleteRequest;
use App\Http\Requests\User\UserListRequest;
use App\Http\Requests\User\UserLogoutRequest;
use App\Http\Requests\User\UserMeRequest;
use App\Http\Requests\User\UserResetPasswordRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Mail\VerificationCodeMail;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Passport\Client;
use Laravel\Socialite\Facades\Socialite;

class UserService extends BaseService
{
    const CHANGE_EMAIL_CACHE_KEY = 'change.email.for.user.';

    public static function loginWithGoogle()
    {
        return response()->json([
            'url' => Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(),
        ]);
    }

    public static function googleCallback()
    {
        try {

            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::updateOrCreate([
                'google_id' => $googleUser->id,
            ], [
                'email' => $googleUser->email,
                'name' => $googleUser->name,
                'password' => bcrypt($googleUser->email),
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
                'verified_at' => now(),
            ]);
            Auth::login($user);
            $response = UserService::login($user->email, $user->email);

            return response($response, 200);
        } catch (Exception $e) {
            return response(['message' => 'خطایی رخ داده است لطفا دوباره تلاش کنید'], 500);
        }
    }

    public static function login($username, $password)
    {
        try {
            // DB::beginTransaction();
            $client = Client::where('password_client', 1)->first();
            $response = Http::acceptJson()->asForm()->post(env('APP_URL') . '/oauth/token', [
                'grant_type' => 'password',
                'client_id' => $client->id,
                'client_secret' => $client->secret,
                'username' => $username,
                'password' => $password,
                'scope' => null,
            ]);
            if ($response->successful()) {
                return $response->json();
            } else {
                return response(['message' => 'اطلاعات وارد شده اشتباه میباشد'], 500);
            }
        } catch (Exception $exception) {
            return response(['message' => 'اطلاعات وارد شده اشتباه میباشد'], 500);
        }
    }

    public static function registerNewUser(RegisterNewUserRequest $request)
    {
        try {
            DB::beginTransaction();
            $field = $request->getFieldName();
            $value = $request->getFieldValue();

            // اگر کاربر از قبل ثبت نام کرده باشد باید روال ثبت نام را قطع کنیم
            if ($user = User::withTrashed()->where($field, $value)->first()) {
                // اگر کاربر من ازقبل ثبت نام خودش رو کامل کرده باشه باید بهش خطا بدم
                if ($user->verified_at) {
                    throw new UserAlreadyRegisteredException('شما قبلا ثبت نام کرده اید');
                }

                return response(['message' => 'کد فعالسازی قبلا برای شما ارسال شده'], 200);
            }

            $code = random_verification_code();
            $user = User::create([
                $field => $value,
                'verify_code' => $code,
            ]);

            Log::info('SEND-REGISTER-CODE-MESSAGE-TO-USER', ['code' => $code]);

            // if (!env('APP_DEBUG', true)) {  its main code
            if (true) {
                if ($request->getFieldName() === 'email') {
                    Mail::to($user)->send(new VerificationCodeMail($code));
                } else {
                    // \Kavenegar::Send(config('kavenegar.sender'), $value, 'کد فعالسازی ' . $code);
                }
            }

            DB::commit();
            return response(['message' => 'کاربر ثبت موقت شد'], 200);
        } catch (Exception $exception) {
            Db::rollBack();

            if ($exception instanceof UserAlreadyRegisteredException) {
                throw $exception;
            }

            Log::error($exception);
            return response(['message' => 'خطایی رخ داده است'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public static function registerNewUserVerify(RegisterVerifyUserRequest $request)
    {
        $field = $request->getFieldName();
        $value = $request->getFieldValue();
        $code = $request->code;
        $user = User::where(['verify_code' => $code, $field => $value])->first();

        if (empty($user)) {
            throw new ModelNotFoundException('کاربر یافت نشد');
        }

        $value = $request->input($field);
        $user->verify_code = null;
        $user->verified_at = now();
        $user->password = bcrypt($value);
        $user->save();

        $response = UserService::login($value, $value);

        return response($response, 200);
    }

    public static function resendVerificationCodeUser(ResendVerificationCodeRequest $request)
    {
        $field = $request->getFieldName();
        $value = $request->getFieldValue();

        $user = User::where($field, $value)->whereNull('verified_at')->first();

        if (!empty($user)) {
            $dateDiff = now()->diffInMinutes($user->updated_at);

            if ($dateDiff > config('auth.resend_verification_code_time_diff', 60)) {
                $user->verify_code = random_verification_code();
                $user->save();
            }


            Log::info('RESEND-REGISTER-CODE-MESSAGE-TO-USER', ['code' => $user->verify_code]);
            if ($field === 'email') {
                Mail::to($user)->send(new VerificationCodeMail($user->verify_code));
            } else {
                // \Kavenegar::Send(config('kavenegar.sender'), $value, 'کد فعالسازی ' . $code);
            }

            return response([
                'message' => 'کد مجددا برای شما ارسال گردید.'
            ], 200);
        }

        throw new ModelNotFoundException('کاربر پیدا نشد یا از قبل ثبت نام کرده است');
    }

    public static function changeEmail(ChangeEmailRequest $request)
    {
        try {
            $email = $request->email;
            $userId = auth()->id();
            $user = auth()->user();
            $code = random_verification_code();
            $expireDate = now()->addMinutes(config('auth.change_email_cache_expiration', 1440));
            Cache::put(self::CHANGE_EMAIL_CACHE_KEY . $userId, compact('email', 'code'), $expireDate);

            Mail::to($user)->send(new VerificationCodeMail($code));
            Log::info('SEND_CHANGE_EMAIL_CODE', compact('code'));
            return response([
                'message' => 'یک ایمیل برای شما ارسال شده است لطفا آن را بررسی نمایید'
            ], 200);
        } catch (Exception $e) {
            Log::error($e);
            return response([
                'message' => 'یک خطایی رخ داده است و سرور قادر به ارسال کد فعال سازی نمی باشد'
            ], 500);
        }
    }

    public static function changeEmailSubmit(ChangeEmailSubmitRequest $request)
    {
        $userId = auth()->id();
        $cacheKey = self::CHANGE_EMAIL_CACHE_KEY . $userId;
        $cache = Cache::get($cacheKey);

        if (empty($cache) || $cache['code'] != $request->code) {
            return response([
                'message' => 'درخواست نامعتبر'
            ], 400);
        }

        $user = auth()->user();
        $user->email = $cache['email'];
        $user->save();
        Cache::forget($cacheKey);
        return response([
            'email' => $user->email,
            'message' => 'ایمیل با موفقیت تغییر یافت'
        ], 200);
    }

    public static function changePassword(ChangePasswordRequest $request)
    {
        try {
            $user = auth()->user();

            if (!Hash::check($request->old_password, $user->password)) {
                return response(['message' => 'رمز وارد شده مطابقت ندارد'], 400);
            }

            $user->password = bcrypt(($request->new_password));
            $user->save();

            return response([
                'message' => 'پسورد با موفقیت تغییر یافت!'
            ], 200);
        } catch (Exception $e) {
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }

    public static function list(UserListRequest $request)
    {
        return User::paginate($request->per_page ?? 10);
    }

    public static function update(UserUpdateRequest $request)
    {
        $request->user->update($request->validated());
        return $request->user;
    }

    public static function resetPassword(UserResetPasswordRequest $request)
    {
        $request->user->update(['password' => env('REQUEST_PASSWORD_DEFAULT', bcrypt('123456'))]);
        return response(null, Response::HTTP_ACCEPTED);
    }

    public static function unregister(UnregisterUserRequest $request)
    {
        try {
            DB::beginTransaction();
            $request->user()->delete();
            DB::table('oauth_access_tokens')
                ->where('user_id', $request->user()->id)
                ->delete();
            DB::commit();
            return response(['message' => 'با موفقیت لغو ثبت نام شد!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }

    public static function delete(UserDeleteRequest $request)
    {
        try {
            DB::beginTransaction();
            $request->user->delete();
            DB::table('oauth_access_tokens')
                ->where('user_id', $request->user->id)
                ->delete();
            DB::commit();
            return response(['message' => 'کاربر با موفقیت حذف شد!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }

    public static function me(UserMeRequest $request)
    {
        $user = auth('api')->user();

        return $user;
    }

    public static function logout(UserLogoutRequest $request)
    {
        try {
            $request->user()->currentAccessToken()->revoke();

            return response(['message' => 'باموفقیت خارج شدید'], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error($e);
        }

        return response(['message' => 'خروج ناموفق بود'], Response::HTTP_BAD_REQUEST);
    }
}
