<?php

namespace App\Http\Controllers;

use App\Http\Requests\Todo\AddTodoRequest;
use App\Http\Requests\Todo\DeleteTodoRequest;
use App\Http\Requests\Todo\listTodoRequest;
use App\Http\Requests\Todo\ShowTodoRequest;
use App\Http\Requests\Todo\UpdateTodoRequest;
use App\Services\TodoService;

class TodoController extends Controller
{
    public function list(){
        return TodoService::list();
        
    }

    public function show(ShowTodoRequest $request){
        return TodoService::show($request);
    }

    public function add(AddTodoRequest $request){
        return TodoService::add($request);
    }

    public function delete(DeleteTodoRequest $request)
    {
        return TodoService::delete($request);
    }

    public function update(UpdateTodoRequest $request){
        return TodoService::update($request);
    }

}
