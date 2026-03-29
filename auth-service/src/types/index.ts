import { Role } from '@prisma/client';

export { Role };

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
  created_at: Date;
}

export interface JwtPayload {
  userId: string;
  role: Role;
}
