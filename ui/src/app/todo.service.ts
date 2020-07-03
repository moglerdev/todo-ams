import { Injectable } from '@angular/core';
import { API_OAuth, API_Todos, API_User } from 'src/api';
import { Todo, User } from './Todo.type';
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

  private users: User[] = [];
  private sessionUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private main_todo: BehaviorSubject<Todo | null> = new BehaviorSubject<Todo | null>(null);;
  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private edit: BehaviorSubject<Todo> = new BehaviorSubject<Todo>(null);
  /*{
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
  } as Todo */

  getTodos(): Observable<Todo[]> {
    return this.todos.asObservable();
  }

  getSessionUser(): Observable<User>{
    return this.sessionUser.asObservable();
  }

  setSessionUser(value: User): void{
    this.sessionUser.next(value);
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
    this.todos.next([]);
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

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  setUser(): void{
    // TODO Set User / Add USer / etc
  }

  constructor() {
    this.fetching.asObservable().subscribe(fet => {
      if(fet < 1){
        this.isFetching.next(false);
      }else if(this.isFetching.getValue() === false){
        this.isFetching.next(true);
      }
    });
    this.fetchUsers();
  }

  addFetch(){
    this.isFetching.next(true);
  }
  removeFetch(){
    this.isFetching.next(false);
  }

  async fetchSessionUser(){
    let r = await API_User.get();
    if(r.ok){
      let j = await r.json();
      this.sessionUser.next(j);
    }else
      this.sessionUser.next(null);
  }

  async fetchUsers(){
    let r = await API_User.getAll();
    if(r.ok){
      let j = await r.json();
      this.users.push(...j);
    }
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
    this.todos.next([]);
    if(r.ok){
      let l = await r.json();
      this.todos.next([...l]);
      //this.onGoingTodos = this.todos.filter(x=> x.status < 90);
      //this.doneTodos = this.todos.filter(x=> x.status > 90);
    }
    this.removeFetch();
    console.log(this.todos);
    return r;
  }
}
