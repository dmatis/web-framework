import axios from 'axios';
import { User } from './models/User';

const user = User.buildUser({ id: 1, name: "wow name", age: 100 });

user.on('change', () => {
  console.log(user);
})

user.fetch();