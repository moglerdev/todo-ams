import { Component } from '@angular/core';
import { Todo } from './Todo.type'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ui';
  edit: Todo | null;
  main_todo: Todo = null;

  editTodo(todo){
    this.edit = todo;
  }

  closeTodo(e){
    this.edit = null;
  }
}
