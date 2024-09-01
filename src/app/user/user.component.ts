import { Component, Input } from '@angular/core';
import { User } from '../../../definitions';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input() user: User | null = null;
}
