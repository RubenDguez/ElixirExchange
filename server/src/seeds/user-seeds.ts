import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'AutoBot', password: 'password', firstName: 'Auto', lastName: 'Bot', email: 'auto.bot@test.com', dob: '2024-09-16' },
  ], { individualHooks: true });
};
