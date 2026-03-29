import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import prisma from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'auth-service' });
});

app.listen(PORT, async () => {
  console.log(`Auth Service is running on port ${PORT}`);
  
  try {
    await prisma.$connect();
    console.log('Database connected successfully via Prisma');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
});
