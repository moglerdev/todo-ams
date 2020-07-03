import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo.type';

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

  closeTodo(e){
    this.edit = null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
