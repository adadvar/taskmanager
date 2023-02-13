<?php

namespace App\Services;

use App\Http\Requests\Todo\AddTodoRequest;
use App\Http\Requests\Todo\DeleteTodoRequest;
use App\Http\Requests\Todo\listTodoRequest;
use App\Http\Requests\Todo\ShowTodoRequest;
use App\Http\Requests\Todo\UpdateTodoRequest;
use App\Models\Category;
use App\Models\Todo;
use Illuminate\Support\Facades\DB;

class TodoService extends BaseService
{

    public static function list()
    {
        $user = auth('api')->user();

        $todos = $user->isAdmin()
            ? Todo::with('user')
            : $user->todos()->with('category')->get();

        // $result = $todos
        //     ->orderBy('id')
        //     ->paginate($request->per_page ?? 10);

        return $todos;
    }

    public static function show(ShowTodoRequest $request)
    {

        // $todo = $request->todo->toArray();

        // $conditions = [
        //     'id' => $request->todo->id,
        //     'user_id' => auth('api')->check() ? auth('api')->id() : null,
        // ];

        // if (!auth('api')->check()) {
        //     $conditions['user_ip'] = client_ip();
        // }
        // $todo['tags'] = $request->todo->tags;

        $todo = $request->todo;

        // if($todo->category_id)
        // $todo->category = Category::find($todo->category_id);


        return [$todo];
    }



    public static function add(AddTodoRequest $request)
    {
        try {

            DB::beginTransaction();
            $data = $request->validated();

            $user = auth()->user();

            $todo = $user->todos()->create($data);

            // if ($request->tags) {
            //     $todo->tags()->sync($request->tags);
            // }
            $todo->isCompleted = false;

            if ($request->category_id) {
                $todo->category = Category::find($request->category_id);
            }

            // if ($request->tags) {
            //     $todo['tags'] = Tag::find($request->tags);
            // }

            DB::commit();

            return response($todo, 200);
        } catch (Exception $e) {
            DB::rollBack();

            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }

    public static function delete(DeleteTodoRequest $request)
    {
        try {
            DB::beginTransaction();

            $request->todo->forceDelete();

            DB::commit();

            return response(['id' => $request->todo->id, 'message' => 'حذف با موفقیت انجام شد'], 200);
        } catch (Exception $exception) {
            DB::rollBack();
            Log::error($exception);
            return response(['message' => 'حذف انجام نشد'], 500);
        }
    }



    public static function update(UpdateTodoRequest $request)
    {
        // $todo = $request->todo;
        try {

            DB::beginTransaction();

        $request->todo->update($request->validated());


            // if ($request->has('title')) $todo->title = $request->title;
            // if ($request->has('description')) $todo->description = $request->description;
            // if ($request->has('category_id')) $todo->category_id = $request->category_id;
            // if ($request->has('isCompleted')) $todo->isCompleted = $request->isCompleted;


            // if ($request->tags) {
            //     $todo->tags()->attach($request->tags);
            // }

            // $todo->save();

            // if ($request->tags) {
            //     $todo->tags = Tag::find($request->tags);
            // }

            if ($request->category_id) {
                $request->todo['category'] = Category::find($request->category_id);
            }

            DB::commit();

            return response($request->todo, 200);
        } catch (Exception $e) {
            DB::rollBack();

            Log::error($e);
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }
}
