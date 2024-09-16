import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'RubenDominguez', password: 'password' },
    { username: 'ChrisCrumbley', password: 'password' },
    { username: 'LeonardoReis', password: 'password' }
  ], { individualHooks: true });
};
