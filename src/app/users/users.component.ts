import { Component, OnInit } from '@angular/core';
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
export class UsersComponent implements OnInit {
  users: User[] = [];
  showAddUser = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers();

    this.usersService.users$.subscribe(users => {
      this.users = users;
    });
  }

  addUser(userToSave: User) {
    this.usersService.postUser(userToSave).subscribe();
    this.showAddUser = false;
  }
}
