import { Component } from '@angular/core';
import { Todo } from './Todo.type'
import { API_OAuth } from 'src/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ui';
  edit: Todo | null;
  main_todo: Todo = null;
  isAuth: boolean = false;

  constructor(){
    this.testAuth();
  }

  async testAuth(){
    this.isAuth = await API_OAuth.isAuth();
  }

  editTodo(todo){
    this.edit = todo;
  }

  closeTodo(e){
    this.edit = null;
  }

  async logout(e){
    let r = await API_OAuth.signOut();
    this.isAuth = false;
  }
}
