<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    const TYPE_ADMIN = 'admin';
    const TYPE_USER = 'user';
    const TYPES = [self::TYPE_ADMIN, self::TYPE_USER];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'users';

    protected $fillable = [
        'type',
        'mobile',
        'email',
        'name',
        'password',
        'google_id',
        'avatar',
        'verify_code',
        'verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'verify_code',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'verified_at' => 'datetime',
    ];

    public function findForPassport($username)
    {

        $user = static::withTrashed()->where('mobile', to_valid_mobile_number($username))->orWhere('email', $username)->first();
        return $user;
    }

    public function setMobileAttribute($value)
    {
        $this->attributes['mobile'] = to_valid_mobile_number($value);
    }

    public function getAvatarAttribute()
    {
        $avatar = $this->attributes['avatar'];

        if (empty($avatar)) {
            $avatar = asset('img/avatar.png');
        }
        return $avatar;
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function todos(){
        return $this->hasMany(Todo::class);
    }

    public function isAdmin()
    {
        return $this->type === User::TYPE_ADMIN;
    }

    public function isBaseUser()
    {
        return $this->type === User::TYPE_USER;
    }



    public function views()
    {
        return $this
            ->belongsToMany(Todo::class, 'todo_views')
            ->withTimestamps();
    }

}
