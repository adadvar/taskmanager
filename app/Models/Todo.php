<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Todo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'todos';

    protected $fillable = [
        'user_id',
        'category_id',
        'slug',
        'title',
        'description',
        'isCompleted',
        'start_date',
        'due_date',
        'publish_at'
    ];

    // protected $with = ['tags', 'category'];


    // public function tags()
    // {
    //     return $this->belongsToMany(Tag::class, 'todo_tags');
    // }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // public function getRouteKeyName()
    // {
    //     return 'slug';
    // }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // public function getTagListAttribute(){
    //     return $this->tags();
    // }

    // public function getCategoryAttribute(){
    //     return $this->category();
    // }

    public function toArray()
    {
        $data = parent::toArray();

        $data['views'] = TodoView::where('todo_id', $this->id)->count();

        return $data;
    }

    public function viewers()
    {
        return $this
            ->belongsToMany(User::class, 'todo_views')
            ->withTimestamps();
    }

    public static function views($userId)
    {
        return static::where('todos.user_id', $userId)
            ->join('todo_views', 'todos.id', '=', 'todo_views.todo_id');
    }

    public function related()
    {
        return static::selectRaw('COUNT(*) related_tags, todos.*')
            ->leftJoin('todo_tags', 'todos.id', '=', 'todo_tags.todo_id')
            ->whereRaw('todos.id != ' . $this->id)
            ->whereIn(DB::raw('todo_tags.tag_id'), function ($query) {
                $query->selectRaw('todo_tags.tag_id')
                    ->from('todos')
                    ->leftJoin('todo_tags', 'todos.id', '=', 'todo_tags.todo_id')
                    ->whereRaw('todos.id=' . $this->id);
            })
            ->groupBy(DB::raw('todos.id'))
            ->orderBy('related_tags', 'desc');
    }
}
