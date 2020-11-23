import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <table class="users">
        <tr>
          <th>User ID: ${this.model.get('id')}
        </tr>
        <tr>
          <th>User Name</th>
          <th>User Age</th>
        </tr>
        <tr>
          <td>${this.model.get('name')}</th>
          <td>${this.model.get('age')}</th>
        </tr>
      <table>
    `;
  }
}