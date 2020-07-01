import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { API_Todos } from '../../api';
import { Todo } from '../Todo.type';

import * as moment from 'moment';

@Component({
  selector: 'app-todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css'],
})
export class TodoListComponent implements OnInit {
  todos = [];

  @Output() editingTodo = new EventEmitter();
  @Input() isEditing: boolean = false;

  async deleteTodo(todo){
    // TODO Delete TODO
    let r = await API_Todos.deleteTodo(todo.id);
    if(!r.ok){
      alert("Todo konnte nicht gelöscht werden!");
    }else{
      this.todos = this.todos.filter(x=> x.id !== todo.id);
    }
  }

  createTodo(e){
    let nTodo:Todo = {
      id: null,
      subject: null,
      autor: 1, // TODO Get Current Autor,
      created_at: moment().format(),
      updated_at: null,
      description: null,
      deadline:  null,
      status: 1,
      weight:  3,
    };
    this.todos = [...this.todos, nTodo];
    this.editingTodo.emit(nTodo);
    console.log(this.todos);
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
