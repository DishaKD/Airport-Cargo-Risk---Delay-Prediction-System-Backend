import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ override: true });

export const prisma = new PrismaClient();
