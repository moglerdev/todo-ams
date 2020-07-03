import { Injectable } from '@angular/core';
import { API_OAuth, API_Todos } from 'src/api';
import { Todo } from './Todo.type';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isFetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);;

  private main_todo: Todo = null;
  private todos: Todo[] = [];

  getTodos(): Todo[]{
    return this.todos;
  }

  getAuth(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

  setAuth(value: boolean) : void {
    this.isAuth.next(value);
  }

  getIsFetching() : Observable<boolean> {
    return this.isFetching.asObservable();
  }

  constructor() {
    this.testAuth();
   }

  async testAuth(){
    this.isAuth.next(await API_OAuth.isAuth());
    this.isFetching.next(false);
  }

  async logout(e){
    let r = await API_OAuth.signOut();
    this.isAuth.next(false);
    this.isFetching.next(false);
  }

  async fetchTodos(){
    let r, todo = this.main_todo;
    if(todo == null){
      r = await API_Todos.getAllMainTodos();
    }else{
      r = await API_Todos.getAllTodosFromMain(todo.id);
    }

    if(r.ok){
      this.todos = await r.json();
      //this.onGoingTodos = this.todos.filter(x=> x.status < 90);
      //this.doneTodos = this.todos.filter(x=> x.status > 90);
    }
  }
}
