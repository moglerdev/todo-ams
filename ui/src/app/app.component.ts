import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import {Router} from "@angular/router"
import { API_User, API_OAuth } from 'src/api';
import { User } from './Todo.type';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'ui';
  isAuth: boolean = false;
  isFetching: Subject<boolean> = new BehaviorSubject<boolean>(false);
  user: User = null;

  constructor(public todoService: TodoService, private router: Router){
  }

  ngOnInit() {
    this.auth();
    this.todoService.getIsFetching().subscribe(isFetching => this.isFetching.next(isFetching));
    this.todoService.fetchSessionUser();
    this.todoService.getSessionUser().subscribe(user => this.user = user);
  }

  async auth(){
    await this.todoService.testAuth();
    this.todoService.getAuth().subscribe(isAuth => {
      this.isAuth = isAuth; this.router.navigate([isAuth ? "/Todo" : "/Auth"]);
     });
  }

  async logout(){
    let r = await API_OAuth.signOut();
    this.todoService.setSessionUser(null); 
    this.todoService.setAuth(false);
  }
}
