import { OnInit, Component, Output, EventEmitter} from '@angular/core';
import { API_OAuth } from 'src/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],  
})
export class AuthComponent implements OnInit {
  isRegister: boolean = true;

  @Output() onAuth = new EventEmitter();
  
  user = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  constructor() {
  }

  ngOnInit() {
  }

  async login(e){
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
      this.onAuth.emit(e);
    }
  }
}
