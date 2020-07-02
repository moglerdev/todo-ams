<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function getAllMainTodos() {  // TODO Is from Autor
        $user_id = Auth::user()->id;
        $todos = Todo::where("todo_id", '=', null)->where("user_id", '=', $user_id)->get()->toJson(JSON_PRETTY_PRINT);
        return response($todos, 200);
    }

    public function getAllTodosFromMain($main_todo_id){  // TODO Is from Autor
        $user_id = Auth::user()->id;
        $todo_db = Todo::where("todo_id", '=', $main_todo_id, "user_id", '=', $user_id);
        if($todo_db->first() !== null){
            $todo_db = Todo::where("todo_id", '=', $main_todo_id, "user_id", '=', $user_id);
            $todo = $todo_db->get()->toJson(JSON_PRETTY_PRINT);
            return response($todo, 200);
        }
        else{
            return response()->json([
                "message" => "Student not found"
            ], 404);
        }
    }

    public function getTodo($id){ // TODO Is from Autor
        $user_id = Auth::user()->id;
        $todo_db = Todo::where("id", '=', $id, "user_id", '=', $user_id)->first();
        if(todo_db !== null){
            $todo = $todo_db->toJson(JSON_PRETTY_PRINT);
            return response($todo, 200);
        }
        else{
            return response()->json([
                "message" => "Student not found"
            ], 404);
        }
    }

    public function createTodo(Request $request){  // TODO Is from Autor
        $user_id = Auth::user()->id;
        $todo = new Todo();
        $todo->user_id = $user_id;
        $todo->todo_id = $request->todo_id;
        $todo->subject = $request->subject;
        $todo->description = $request->description;
        $todo->weight = $request->weight;
        $todo->deadline = $request->deadline;
        $todo->status = $request->status;
        $todo->save();

        return response()->json([
            "message" => "todo created"
        ], 201);
    }

    public function updateTodo(Request $request, $id){ // TODO Is from Autor
        $user_id = Auth::user()->id;
        if(Todo::where("id", '=', $id, "user_id", '=', $user_id)->first() !== null){
            $todo = Todo::find($id);
            $todo->user_id = $user_id;
            $todo->todo_id = is_null($request->todo_id) ? $todo->todo_id : $request->todo_id;
            $todo->subject = is_null($request->subject) ? $todo->subject : $request->subject;
            $todo->description = is_null($request->description) ? $todo->description : $request->description;
            $todo->weight = is_null($request->weight) ? $todo->weight : $request->weight;
            $todo->deadline = is_null($request->deadline) ? $todo->deadline : $request->deadline;
            $todo->status = is_null($request->status) ? $todo->status : $request->status;
            $todo->save();

            return response()->json([
                "message" => "record updated successfuly"
            ], 200);
        }
        else{
            return response()->json([
                "message" => "Todo not found"
            ], 404);
        }
    }

    public function deleteTodo($id){  // TODO Is from Autor
        $user_id = Auth::user()->id;
        if(Todo::where("id", '=', $id, "user_id", '=', $user_id)->first() !== null){
            $todo = Todo::find($id);
            $todo->delete();

            return response()->json([
                "message" => "record deleted"
            ], 200);
        }
        else{
            return response()->json([
                "message" => "Todo not found"
            ], 404);
        }
    }
}
