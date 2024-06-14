// import { Request, Response, NextFunction } from "express";
// import { getRepository } from "typeorm";
// import { User } from "../entities/User";

// const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // Example: Implement your actual authentication logic here
//     // For demonstration, we're assigning a mock user object
//     const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token

//     if (!token) {
//       return res.status(401).json({ message: "Authorization token missing" });
//     }

//     // Example: Validate token and fetch user from database
//     const userRepository = getRepository(User);
//     const user = await userRepository.findOne({ where: { token } });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // Assign the authenticated user to the 'user' property of 'Request'
//     req.user = user;

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     console.error("Authentication error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export default authenticate;
// src/middlewares/authenticate.ts

import { Request, Response, NextFunction } from "express";

declare module "express" {
  interface Request {
    user?: any; // Adjust the type of 'user' as per your application's user object
  }
}

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Your authentication logic here
  // Assuming 'user' is set somewhere in your authentication logic
  const user = req.user;
  req.user = user;
  next();
}
