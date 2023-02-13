<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\listTodoRequest;
use App\Services\CategoryService;
use App\Services\TodoService;
use Illuminate\Support\Facades\Request;

class DashboardController extends Controller
{
    public function index(Request $request){
        $pageData = getPageData('داشبورد', 'اینجا داشبورد است');
        $pageData['todos'] = TodoService::list();
        $pageData['categories'] = CategoryService::list();
        // logger($pageData);
        return response(['pageData'=>$pageData]);
    }
}
