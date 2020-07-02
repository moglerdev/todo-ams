import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { API_Todos } from '../../api';
import { Todo } from '../Todo.type';

import * as moment from 'moment';
import { Sort } from '@angular/material/sort';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css'],
})
export class TodoListComponent implements OnInit, OnChanges {
  todos: Todo[]  = [];

  sortedTodos: Todo[] = [];


  onGoingTodos: Todo[] = [];
  doneTodos: Todo[] = [];

  @Output() editingTodo = new EventEmitter();
  @Output() selectedMainTodo = new EventEmitter();
  @Output() closedMainTodo = new EventEmitter();
  @Input() main_todo: Todo = null;

  async deleteTodo(todo){
    // TODO Delete TODO
    let r = await API_Todos.deleteTodo(todo.id);
    if(!r.ok){
      alert("Todo konnte nicht gelöscht werden!");
    }else{
      this.todos = this.todos.filter(x=> x.id !== todo.id);
    }
  }

  sortTodo(sort: Sort){
    const data = this.onGoingTodos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTodos = data;
      return;
    }

    this.sortedTodos = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'subject': return compare(a.subject, b.subject, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'weight': return compare(a.weight, b.weight, isAsc);
        case 'deadline': return compare(a.deadline, b.deadline, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }

  createTodo(e){
    let nTodo:Todo = {
      id: null,
      subject: null,
      user_id: 1, // TODO Get Current Autor,
      todo_id: this.main_todo == null ? null : this.main_todo.id, // TODO Get Current Autor,
      created_at: moment().format(),
      updated_at: null,
      description: null,
      deadline:  null,
      status: 11,
      weight:  3,
    };
    this.editingTodo.emit(nTodo);
  }

  selectMainTodo(todo){
    this.main_todo = todo;
    this.selectedMainTodo.emit(todo);
  }
  closeMainTodo(e){
    this.main_todo = null;
    this.closedMainTodo.emit(e);
  }
  deleteMainTodo(e){

  }

  editTodo(todo){
    this.editingTodo.emit(todo);
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges | { main_todo: Todo }): void {
    console.log(changes);
    this.fetchData();
  }

  ngOnInit() {
    this.fetchData();
  }
  
  async fetchData(){
    this.todos = [];
    this.onGoingTodos = [];
    this.doneTodos = [];
    this.sortedTodos = [];

    let r, todo = this.main_todo;
    if(todo == null){
      r = await API_Todos.getAllMainTodos();
    }else{
      r = await API_Todos.getAllTodosFromMain(todo.id);
    }

    if(r.ok){
      this.todos = await r.json();
      this.onGoingTodos = this.todos.filter(x=> x.status < 90);
      this.sortedTodos = this.onGoingTodos;
      this.doneTodos = this.todos.filter(x=> x.status > 90);
    }
  }
}



