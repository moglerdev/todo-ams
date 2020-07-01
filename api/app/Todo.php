<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    //
    protected $table = "todos";
    protected $fillable = ["subject", "description", "weight", "deadline", "state", "autor"];

}
