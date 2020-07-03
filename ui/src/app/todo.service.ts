import { Injectable } from '@angular/core';
import { API_OAuth, API_Todos } from 'src/api';
import { Todo } from './Todo.type';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isFetching: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private fetching: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private main_todo: BehaviorSubject<Todo | null> = new BehaviorSubject<Todo | null>(null);;
  private todos: Todo[] = [];
  private edit: BehaviorSubject<Todo> = new BehaviorSubject<Todo>(null);

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  getEdit(): Observable<Todo>{
    return this.edit.asObservable();
  }
  setEdit(value: Todo) {
    this.edit.next(value);
  }
  async saveEdit(todo){
    let r, m = this.main_todo.getValue();
    todo.todo_id = m?.id;
    if(todo.id == null){
      r = await API_Todos.createTodo(todo);
    }else{
      r = await API_Todos.updateTodo(todo.id, todo);
    }
    if(!r.ok){
      alert("Fehler beim Speichern!");
    }else{
    }
    this.edit.next(null);
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
    this.fetching.asObservable().subscribe(fet => {
      if(fet < 1){
        this.isFetching.next(false);
      }else if(this.isFetching.getValue() === false){
        this.isFetching.next(true);
      }
    });
  }

  addFetch(){
    this.isFetching.next(true);
  }
  removeFetch(){
    this.isFetching.next(false);
  }

  async testAuth(){
    this.addFetch();
    this.isAuth.next(await API_OAuth.isAuth());
    this.removeFetch();
  }

  async logout(e){
    this.addFetch();
    let r = await API_OAuth.signOut();
    this.isAuth.next(false);
    this.removeFetch();
  }

  async fetchTodos(mainTodo: Todo | undefined | null = undefined){
    this.addFetch();
    let r, todo = mainTodo;
    if(todo === undefined){
      todo = this.main_todo.getValue() || null;
    }
    if(todo == null){
      r = await API_Todos.getAllMainTodos();
    }else{
      r = await API_Todos.getAllTodosFromMain(todo.id);
    }
    this.todos.splice(0, this.todos.length);
    console.log(this.todos);
    if(r.ok){
      let l = await r.json();
      console.log(l);
      for(var i = 0; i < l.length; ++i){
        this.todos.push(l[i]);
      }
      //this.onGoingTodos = this.todos.filter(x=> x.status < 90);
      //this.doneTodos = this.todos.filter(x=> x.status > 90);
    }
    this.removeFetch();
    return r;
  }
}
