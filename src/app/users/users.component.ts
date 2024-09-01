import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UsersService } from '../users.service';
import { User } from '../../../definitions';
import { AddUserComponent } from "../add-user/add-user.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserComponent, AddUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  showAddUser = false;

  constructor(private usersService: UsersService) {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  addUser(userToSave: User) {
    this.usersService.postUser(userToSave).subscribe((savedUser: User) => {
      savedUser.id = Math.floor(Math.random() * (10000 - 11) + 11);
      this.users.unshift(savedUser);
    })

    this.showAddUser = false;
  }
}
