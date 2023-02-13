<?php
namespace App\Services;

use App\Http\Requests\Tag\AddTagRequest;
use App\Http\Requests\Tag\ListTagsRequest;
use App\Models\Tag;

class TagService extends BaseService {

    public static function list(ListTagsRequest $request){
        return Tag::all();
    }

    public static function add(AddTagRequest $request){
        $data = $request->validated();
        return Tag::create($data);
    }
}