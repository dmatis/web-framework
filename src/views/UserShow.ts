import { View } from './View';
import { User, UserProps } from '../models/User';
import '../styles/UserShow.css';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <table class="users">
        <tr>
          <th>User Name</th>
          <th>User Age</th>
          ${this.model.get('id') ? '<th>User ID</th>' : ''}
        </tr>
        <tr>
          <td>${this.model.get('name')}</th>
          <td>${this.model.get('age')}</th>
          ${this.model.get('id') ? `<td>${this.model.get('id')}</td>` : ''}
        </tr>
      <table>
    `;
  }
}