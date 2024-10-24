import { Request } from "express";
import { Express } from "express-serve-static-core";
import { User } from "../../constants";

// Extend the Request interface to include the user property
// declare module "express-serve-static-core" {
//   interface Request {
//     user?: User;
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
