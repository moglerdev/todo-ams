<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //
    protected $table = "todos";
    protected $fillable = ["subject", "user_id", "todo_id", "description", "weight", "deadline", "status"];

}
