import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'AutoBot', password: 'password', firstName: 'Auto', lastName: 'Bot', email: 'auto.bot@test.com', dob: '2024-09-16' },
    { username: 'ChillyP', password: 'password', firstName: 'Chilly', lastName: 'Palmer', email: 'chilly.p@coolmail.com', dob:'1989'},
  ], { individualHooks: true });
};
