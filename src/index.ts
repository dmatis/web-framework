import { UserList } from './views/UserList';
import { Collection } from './models/Collection';
import { UserProps, User } from './models/User';


// Create a collection of users, specifying:
// 1) rootUrl for where the data is located
// 2) the callback that will deserialize the data (when fetched)
const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.buildUser(json);
});

// Register an event handler on 'change' events (which get triggered when users are fetched)
// which in turn will render the users to the DOM
users.on('change', () => {
  const root = document.querySelector('#root');

  if (root) {
    new UserList(root, users).render();
  }
});

// Fetch the users (in order to trigger rendering them to the page)
users.fetch();