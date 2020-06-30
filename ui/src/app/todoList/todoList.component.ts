import { Component, OnInit } from '@angular/core';
import { API_Todos } from '../../api';
@Component({
  selector: 'app-todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css'],
})
export class TodoListComponent implements OnInit {
  todos = [];

  constructor() {}

  ngOnInit() {
    API_Todos.getAllTodos()
      .then((res) => res.json())
      .then((res) => {
        this.todos = res;
      });
  }
}
