<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class TodoView extends Pivot
{
    protected $table = 'todo_views';

    protected $fillable = ['user_id', 'user_ip', 'todo_id'];
}
