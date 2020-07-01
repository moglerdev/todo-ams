import { Component, OnInit } from '@angular/core';
import { API_Todos } from '../../api';
@Component({
  selector: 'app-todoEditor',
  templateUrl: './todoEditor.component.html',
  styleUrls: ['./todoEditor.component.css'],
})
export class TodoEditorComponent implements OnInit {
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
