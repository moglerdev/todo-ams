import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { API_Todos } from '../../api';
import { Todo } from '../Todo.type';
import * as moment from 'moment';
import { Sort } from '@angular/material/sort';
import { TodoService } from '../todo.service';

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
  editableTodos: Todo[] = [];
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

  getDoneTodos(){
    return this.todos.filter(x => x.status > 90).sort((a, b) => compare(a.weight, b.weight, false));
  }

  sortTodo(sort: Sort){
    const data = this.editableTodos.slice();
    if (!sort.active || sort.direction === '') {
      this.editableTodos = data;
      return;
    }

    this.editableTodos = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'subject': return compare(a.subject, b.subject, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'weight': return compare(a.weight, b.weight, isAsc);
        case 'deadline': return compare(a.deadline, b.deadline, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        case 'calcWeight': return compare(this.calcWeight(a), this.calcWeight(b), isAsc);
        default: return 0;
      }
    });
  }

  selectMainTodo(todo) {
    this.todoService.setMainTodo(todo);
  }

  closeMainTodo(){
    this.todoService.setMainTodo(null);
  }

  constructor(public todoService: TodoService) {

  }

  createTodo(e){
    this.todoService.setEdit({
      id: null,
      created_at: ''  ,
      deadline: '',
      description: '',
      status: 11,
      subject: '',
      todo_id: null,
      updated_at: '',
      user_id: null,
      weight: 2
    } as Todo);
  }

  editTodo(e: Todo){
    this.todoService.setEdit(e);
  }

  calcWeight(todo: Todo) : number{
    let w: number;
    if(typeof todo.weight === "string"){
        w = parseInt(todo.weight);
    }else{
      w = todo.weight;
    }

    if(todo.deadline != null){
      let c = moment(todo.created_at);
      let d = moment(todo.deadline);
      let n = moment();
      console.log(c, d, n);
      let r = (d.diff(c, 'days') / d.diff(n, 'days')) * w;
      if(isNaN(r)){
        return 100;
      }
      return r;
    }
    else
      return w;
  }

  getGewicht(todo:Todo): string{
    switch(todo.weight) {
      case 1: return "unwichtig";
      case 2: return "kaum wichtig";
      case 3: return "normal";
      case 4: return "wichtig";
      case 5: return "sehr wichtig";
    }
  }

  getStatus(todo:Todo): string{
    switch(todo.status) {
      case 11: return "Offen";
      case 21: return "in Bearbeitung";
      case 91: return "erledigt";
      case 92: return "verspätet erledigt";
      case 93: return "abgebrochen";
    }
  }

  getDate(todo){
    return moment(todo).format('DD.MM.YYYY');
  }

  ngOnInit() {
    this.getTodos();
    this.todoService.getMainTodo().subscribe(mainTodo => this.main_todo = mainTodo);
  }

  async getTodos(){
    let r = await this.todoService.fetchTodos();
    this.editableTodos = [];

    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      console.log(todos);
      this.editableTodos = todos.filter(x=> x.status < 90);
    });
  }
}



