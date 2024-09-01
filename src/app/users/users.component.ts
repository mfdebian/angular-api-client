import { Component } from '@angular/core';
import { UsersService } from '../users.service';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];

  constructor(private usersService: UsersService) {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
