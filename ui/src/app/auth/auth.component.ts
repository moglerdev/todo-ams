import { OnInit, Component, Output, EventEmitter} from '@angular/core';
import { API_OAuth } from 'src/api';
import { TodoService } from '../todo.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],  
})
export class AuthComponent implements OnInit {
  isRegister: boolean = true;
  
  user = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  constructor(public todoService: TodoService) {
  }

  ngOnInit() {
  }

  async login(e){

    if(typeof e == "string"){
      this.isRegister = false;
      switch(e){
        case "asmus":
          this.user.name="asmus";
          this.user.email="asmus@ams.de";
          this.user.password="123";
        break;
        case "marco":
          this.user.name="marco";
          this.user.email="marco@ams.de";
          this.user.password="123";
        break;
        case "simon":
          this.user.name="simon";
          this.user.email="simon@ams.de";
          this.user.password="123";
        break;
      }
    }

    let r;
    if(this.isRegister){
      r = await API_OAuth.signUp(this.user);
    }else{
      r = await API_OAuth.signIn(this.user);
    }

    if(!r){
      alert("Can not loggin!");
    }
    else{
      await this.todoService.fetchSessionUser();
      this.todoService.setAuth(true);
    }
  }
}
