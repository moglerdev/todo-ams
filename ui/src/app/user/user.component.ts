import { Component, OnInit } from '@angular/core';
import { API_User } from 'src/api';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users = [];

  constructor() { }

  ngOnInit(): void {
    this.load();
  }

  formatDate(date) : string{
    return moment(new Date(date)).format('DD.MM.YYYY');
  }

  async load(){
    let r = await API_User.getAll();

    if(r.ok){
      this.users = await r.json();
    }
  }
}
