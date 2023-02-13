<?php
namespace App\Services;

use App\Http\Requests\Category\AddCategoryRequest;
use App\Http\Requests\Category\DeleteCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Requests\Category\ListCategoryRequest;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Request;

class CategoryService extends BaseService {
    
    public static function list(){
        $user = auth('api')->user();
        
        $categories = $user->categories;
        return $categories;
    }

    public static function add(AddCategoryRequest $request){
        try{
            DB::beginTransaction();
            $data = $request->validated();
            $user = auth()->user();

            $category = $user->categories()->create($data);

            DB::commit();

            return response($category, 200);
        }catch(Exception $e){
            DB::rollBack();
            return response(['message' => 'An error has occurred !'], 500);
        }
    }

    public static function update(UpdateCategoryRequest $request){
      try{
          $category = $request->category;
          $category->title = $request->title;
          $request->category->save();

          return response($category, 200);

      }catch(Exception $e){
          return response(['message' => 'An error has occurred !'], 500);
      }
  }

  public static function delete (DeleteCategoryRequest $request){
    try {
        DB::beginTransaction();

        $request->category->forceDelete();

        DB::commit();

        return response(['message' => 'حذف با موفقیت انجام شد'], 200);
    } catch (Exception $exception) {
        DB::rollBack();
        Log::error($exception);
        return response(['message' => 'حذف انجام نشد'], 500);
    }
  }

}