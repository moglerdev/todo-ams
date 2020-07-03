import { Injectable } from '@angular/core';
import { API_OAuth, API_Todos } from 'src/api';
import { Todo } from './Todo.type';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isFetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private main_todo: BehaviorSubject<Todo | null> = new BehaviorSubject<Todo | null>(null);;
  private todos: Todo[] = [];

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  getMainTodo(): Observable<Todo> {
    return this.main_todo.asObservable();
  }
  setMainTodo(mainTodo: Todo) : void{
    this.todos.splice(0, this.todos.length);
    this.fetchTodos(mainTodo);
    this.main_todo.next(mainTodo);
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
    this.isFetching.next(true);
    this.isAuth.next(await API_OAuth.isAuth());
    this.isFetching.next(false);
  }

  async logout(e){
    this.isFetching.next(true);
    let r = await API_OAuth.signOut();
    this.isAuth.next(false);
    this.isFetching.next(false);
  }

  async fetchTodos(mainTodo: Todo){
    this.isFetching.next(true);
    let r, todo = mainTodo;
    console.log(mainTodo);
    if(todo === undefined){
      todo = this.main_todo.getValue();
    }
    if(todo == null){
      r = await API_Todos.getAllMainTodos();
    }else{
      r = await API_Todos.getAllTodosFromMain(todo.id);
    }

    if(r.ok){
      this.todos.push(await r.json());
      //this.onGoingTodos = this.todos.filter(x=> x.status < 90);
      //this.doneTodos = this.todos.filter(x=> x.status > 90);
    }

    this.isFetching.next(false);
    return r;
  }
}
