// src/types/express.d.ts

import { User } from "../entities/User"; // Adjust the path as per your project structure

declare module "express-serve-static-core" {
  interface Request {
    user?: User; // Define 'user' as an optional property of type 'User'
  }
}
