import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { AuthRequest } from '../middlewares/authMiddleware';
import Joi from 'joi';
import { Role } from '../types';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(...Object.values(Role))
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    try {
      const { user, token } = await authService.register(
        value.name,
        value.email,
        value.password,
        value.role as Role
      );
      res.status(201).json({ user, token });
    } catch (err: any) {
      if (err.message === 'User already exists') {
        res.status(409).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    try {
      const { user, token } = await authService.login(value.email, value.password);
      res.status(200).json({ user, token });
    } catch (err: any) {
      if (err.message === 'Invalid email or password') {
        res.status(401).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  async me(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }
      
      const user = await authService.getUserById(req.user.userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
