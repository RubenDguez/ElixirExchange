import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({where: {username}});

  if (!user || user === null) return res.status(401).json({message: 'Authentication failed'});
  
  const isPasswordValid = bcrypt.compare(password, user!.password);

  if (!isPasswordValid) return res.status(401).json({message: 'Authentication failed'});

  const secretKey = process.env.JWT_SECRET_KEY || '';

  const { firstName, lastName, email, dob } = user;

  const token = jwt.sign({ username, firstName, lastName, email, dob }, secretKey, { expiresIn: '1h' });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
