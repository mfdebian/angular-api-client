import { Component, Input } from '@angular/core';
import { User } from '../../../definitions';
import { UsersService } from '../users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [EditUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user: User | null = null;
  showEditUser = false;

  constructor(private usersService: UsersService) {}

  toggleEditUser() {
    this.showEditUser = !this.showEditUser;
  }

  handleDelete(id: number) {
    this.usersService.deleteUser(id).subscribe();
  }
}
