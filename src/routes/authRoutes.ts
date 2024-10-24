import { Router } from "express";
import {
  register,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
} from "../controllers/authController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/request-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
