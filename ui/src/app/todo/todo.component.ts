import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo.type';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  isEdit: boolean = false;
  isMainTodo: boolean = true;

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getEdit().subscribe(t => {
      this.isEdit = t != null;
    });

    this.todoService.getMainTodo().subscribe(m => this.isMainTodo = m == null);
  }

}
