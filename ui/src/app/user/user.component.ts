import { Component, OnInit } from '@angular/core';
import { API_User } from 'src/api';
import * as moment from 'moment';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users = [];

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.load();
  }

  formatDate(date) : string{
    return moment(new Date(date)).format('DD.MM.YYYY');
  }

  async load(){
    this.todoService.addFetch();
    let r = await API_User.getAll();

    if(r.ok){
      this.users = await r.json();
    }
    this.todoService.removeFetch();
  }
}
