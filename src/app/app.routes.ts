import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: 'users', title: 'Angular Api Client - Users', component: UsersComponent },
];
