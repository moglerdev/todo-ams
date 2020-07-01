import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { API_Todos } from '../../api';
import { Todo } from '../Todo.type';

import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as moment from 'moment';

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
  @Input() todo: Todo;

  @Output() closeTodo = new EventEmitter();
  
  async saveTodo(e){
    // TODO If Todo.ID == 0 then create new
    //TODO Save TODO
    let r;
    if(this.todo.id == null){
      r = await API_Todos.createTodo(this.todo);

    }else{
      r = await API_Todos.updateTodo(this.todo.id, this.todo);

    }


    if(!r.ok){
      alert("Fehler beim Speichern!");
    }else{
      this.closeTodo.emit(e);
    }
  }

  constructor() {
  }

  ngOnInit() {
  }
}
