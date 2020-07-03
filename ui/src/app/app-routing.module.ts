import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';
import { TodoComponent } from './todo/todo.component';


const routes: Routes = [
  { path: 'User', component: UserComponent },
  { path: 'Auth', component: AuthComponent },
  { path: 'Todo', component: TodoComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
