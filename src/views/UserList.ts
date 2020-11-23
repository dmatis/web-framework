import { CollectionView } from './CollectionView';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';

export class UserList extends CollectionView<User, UserProps> {

  // create a view, render it to the itemParent
  renderItem(model: User, itemParent: Element): void {
     new UserShow(itemParent, model).render();
  }
}