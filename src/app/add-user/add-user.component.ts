import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../definitions';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  newUser: User | null = null;
  userForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    website: new FormControl(''),
  });

  @Output() addUser = new EventEmitter<User>();

  handleSubmit() {
    this.newUser = {
      id: 11,
      name: this.userForm.value.name || '',
      email: this.userForm.value.email || '',
      phone: this.userForm.value.phone || '',
      username: this.userForm.value.username || '',
      website: this.userForm.value.website || ''
    }
    this.addUser.emit(this.newUser);
    this.userForm.reset();
  }
}
