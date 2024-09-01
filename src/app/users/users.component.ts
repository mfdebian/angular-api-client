import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { UsersService } from '../users.service';
import { User } from '../../../definitions';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserComponent, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  showAddUser = false;
  newUser: User | null = null;
  userForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    website: new FormControl(''),
  });

  constructor(private usersService: UsersService) {
    this.usersService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  handleSubmit() {
    this.newUser = {
      id: 11,
      name: this.userForm.value.name || '',
      email: this.userForm.value.email || '',
      phone: this.userForm.value.phone || '',
      username: this.userForm.value.username || '',
      website: this.userForm.value.website || ''
    }
    this.addUser(this.newUser);
  }

  addUser(userToSave: User) {
    this.usersService.postUser(userToSave).subscribe((savedUser: User) => {
      savedUser.id = Math.floor(Math.random() * (10000 - 11) + 11);
      this.users.unshift(savedUser);
    })

    this.userForm.reset();
    this.showAddUser = false;
  }
}
