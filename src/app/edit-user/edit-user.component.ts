import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { User } from '../../../definitions';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() toggleEditUser = new EventEmitter<void>();
  editUserForm!: FormGroup;

  constructor(private usersService: UsersService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.editUserForm = new FormGroup({
        name: new FormControl(this.user.name),
        username: new FormControl(this.user.username),
        email: new FormControl(this.user.email),
        phone: new FormControl(this.user.phone),
        website: new FormControl(this.user.website),
      });
    }
  }

  handleSubmit() {
    if (this.user) {
      const updatedUser: User = {
        ...this.user,
        ...this.editUserForm.value
      };
      this.usersService.updateUser(updatedUser).subscribe(() => {
        this.toggleEditUser.emit();
      });
    }
  }

  handleCancel() {
    this.toggleEditUser.emit();
  }
}
