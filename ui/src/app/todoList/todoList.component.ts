import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { API_Todos } from '../../api';
@Component({
  selector: 'app-todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css'],
})
export class TodoListComponent implements OnInit {
  todos = [];

  @Output() editingTodo = new EventEmitter();

  deleteTodo(todo){
    // TODO Delete TODO
  }

  editTodo(todo){
    this.editingTodo.emit(todo);
  }

  constructor() {}

  ngOnInit() {
    this.fetchData();
  }
  
  fetchData(){
    API_Todos.getAllTodos()
      .then((res) => res.json())
      .then((res) => {
        this.todos = res;
      });
  }
}
