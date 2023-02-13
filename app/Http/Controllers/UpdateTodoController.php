<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\ShowTodoRequest;
use App\Services\CategoryService;
use App\Services\TodoService;

class UpdateTodoController extends Controller
{
    public function index(ShowTodoRequest $request){
        $pageData = getPageData('آپدیت کار', 'اینجا صفحه آپدیت کار است');
        $pageData['todos'] = TodoService::show($request);
        $pageData['categories'] = CategoryService::list();
        // logger($pageData);
        return response(['pageData'=>$pageData]);
    }
}
