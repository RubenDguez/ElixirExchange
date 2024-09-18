import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;

  if (authHeaders) {
    const token = authHeaders.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json(err);
      }

      req.user = user as JwtPayload;
      return next();
    });
  }
};
