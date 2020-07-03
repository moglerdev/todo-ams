import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo.type';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  edit: Todo = null;
  main_todo: Todo = null;
  
  editTodo(todo){
    this.edit = todo;
  }

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

}
