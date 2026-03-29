import prisma from '../config/db';
import { User, Role } from '../types';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

interface AuthResponse {
  user: Omit<User, 'password_hash'>;
  token: string;
}

export class AuthService {
  async register(name: string, email: string, password: string, role: Role): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    
    const userRole = Object.values(Role).includes(role) ? role : Role.OPERATIONS;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
        role: userRole,
      },
    });

    const token = generateToken(String(newUser.id), newUser.role as Role);

    const { password_hash, ...userWithoutPassword } = newUser;
    const sanitizedUser = { ...userWithoutPassword, id: String(userWithoutPassword.id) };

    return { user: sanitizedUser as unknown as Omit<User, 'password_hash'>, token };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(String(user.id), user.role as Role);

    const { password_hash, ...userWithoutPassword } = user;
    const sanitizedUser = { ...userWithoutPassword, id: String(userWithoutPassword.id) };

    return { user: sanitizedUser as unknown as Omit<User, 'password_hash'>, token };
  }
  
  async getUserById(id: string): Promise<Omit<User, 'password_hash'> | null> {
    const user = await prisma.user.findUnique({
      where: { id: id as any },
    });
    
    if (!user) return null;
    
    const { password_hash, ...userWithoutPassword } = user;
    const sanitizedUser = { ...userWithoutPassword, id: String(userWithoutPassword.id) };
    return sanitizedUser as unknown as Omit<User, 'password_hash'>;
  }
}

export const authService = new AuthService();
