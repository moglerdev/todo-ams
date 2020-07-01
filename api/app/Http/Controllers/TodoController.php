<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;

class TodoController extends Controller
{
    //
    public function getAllTodos() {
      $todos = Todo::get()->toJson(JSON_PRETTY_PRINT);
      return response($todos, 200);
    }

    public function createTodo(Request $request){
        $todo = new Todo();
        $todo->subject = $request->subject;
        $todo->description = $request->description;
        $todo->weight = $request->weight;
        $todo->deadline = $request->deadline;
        $todo->state = $request->state;
        $todo->autor = $request->autor;
        $todo->save();

        return response()->json([
            "message" => "todo created"
        ], 201);
    }

    public function getTodo($id){
        if(Todo::where("id", '=', $id)->first() !== null){
            $todo = Todo::where('id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($todo, 200);
        }
        else{
            return response()->json([
                "message" => "Student not found"
            ], 404);
        }
    }

    public function updateTodo(Request $request, $id){
        print("FUCK U");
        if(Todo::where("id", '=', $id)->first() !== null){
            $todo = Todo::find($id);
            $todo->subject = is_null($request->subject) ? $todo->subject : $request->subject;
            $todo->description = is_null($request->description) ? $todo->description : $request->description;
            $todo->weight = is_null($request->weight) ? $todo->weight : $request->weight;
            $todo->deadline = is_null($request->deadline) ? $todo->deadline : $request->deadline;
            $todo->state = is_null($request->state) ? $todo->state : $request->state;
            $todo->autor = is_null($request->autor) ? $todo->autor : $request->autor;
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

    public function deleteTodo($id){
        if(Todo::where("id", '=', $id)->first() !== null){
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
