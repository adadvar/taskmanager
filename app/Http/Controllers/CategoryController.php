<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\AddCategoryRequest;
use App\Http\Requests\Category\DeleteCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Requests\Category\ListCategoryRequest;
use App\Services\CategoryService;
use Illuminate\Support\Facades\Request;

class CategoryController extends Controller
{
    public function list()
    {
        return CategoryService::list();
    }

    public function add(AddCategoryRequest $request)
    {
        return CategoryService::add($request);
    }

    public function update(UpdateCategoryRequest $request)
    {
        return CategoryService::update($request);
    }

    public function delete(DeleteCategoryRequest $request)
    {
        return CategoryService::delete($request);
    }
}
