import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { API_Todos } from '../../api';
import { Todo } from '../Todo.type';

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';
import { TodoService } from '../todo.service';
import { FormControl } from '@angular/forms';

export const GERMAN_FORMAT = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'dd-mm-yyyy',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'dd-mm-yyyy',
  },
};


@Component({
  selector: 'app-todoEditor',
  templateUrl: './todoEditor.component.html',
  styleUrls: ['./todoEditor.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: GERMAN_FORMAT},
  ],
})
export class TodoEditorComponent implements OnInit {
  todo: Todo = null;
  deadline = new FormControl(moment());

  saveTodo(e){
    this.todo.deadline = moment(this.deadline.value).format('YYYY-MM-DD');
    this.todoService.saveEdit({...this.todo});
  }

  closeTodo(){
    this.todoService.setEdit(null);
  }

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService.getEdit().subscribe(edit => {
      this.todo = edit;
      this.deadline = new FormControl(moment(edit.deadline));
    });
  }
}
