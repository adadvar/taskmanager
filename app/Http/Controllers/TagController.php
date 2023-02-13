<?php

namespace App\Http\Controllers;


use App\Http\Requests\Tag\AddTagRequest;
use App\Http\Requests\Tag\ListTagsRequest;
use App\Services\TagService;

class tagController extends Controller
{
    public function list(ListTagsRequest $request){
        return TagService::list($request);
    }

    public function create(AddTagRequest $request){
        return TagService::create($request);
    }
}
