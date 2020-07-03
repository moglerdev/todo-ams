import { Component } from '@angular/core';
import { API_OAuth } from 'src/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ui';
  isAuth: boolean = false;
  isFetching: boolean = true;

  constructor(){
    this.testAuth();
  }

  async testAuth(){
    this.isAuth = await API_OAuth.isAuth();
    this.isFetching = false;
  }

  async logout(e){
    let r = await API_OAuth.signOut();
    this.isFetching = false;
    this.isAuth = false;
  }
}
