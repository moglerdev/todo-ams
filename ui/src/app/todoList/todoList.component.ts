import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todoList',
  templateUrl: './todoList.component.html',
  styleUrls: ['./todoList.component.css']
})
export class TodoListComponent implements OnInit {
  todos = []

  constructor() { }

  ngOnInit() {
  }

}
