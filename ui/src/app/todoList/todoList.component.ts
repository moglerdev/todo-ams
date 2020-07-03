import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { API_Todos } from '../../api';
import { Todo } from '../Todo.type';

import * as moment from 'moment';
import { Sort } from '@angular/material/sort';
import { TodoService } from '../todo.service';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[]  = [];
  main_todo: Todo = null;
  
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
    const data = this.todos.slice();
    if (!sort.active || sort.direction === '') {
      this.todos = data;
      return;
    }

    this.todos = data.sort((a, b) => {
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

  selectMainTodo(todo) {
    this.todoService.setMainTodo(todo[0]);
  }

  closeMainTodo(){
    this.todoService.setMainTodo(null);
  }

  constructor(public todoService: TodoService) {

  }

  ngOnInit() {
    this.getTodos();
    this.todoService.getMainTodo().subscribe(mainTodo => this.main_todo = mainTodo);
  }

  async getTodos(){
    let r = await this.todoService.fetchTodos();

    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }  
}



