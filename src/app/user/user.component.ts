import { Component, Input } from '@angular/core';
import { User } from '../../../definitions';
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

  toggleEditUser() {
    this.showEditUser = !this.showEditUser;
  }

}
