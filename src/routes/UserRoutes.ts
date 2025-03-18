import express from "express";
import {
  getAll,
  getUserById,
  CreateUser,
  updaterUser,
  DestroyUserById,
} from "../controllers/UserController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.post("/users", authMiddleware, CreateUser);
router.put("/users/:id", authMiddleware, updaterUser);
router.delete("/users/:id", authMiddleware, DestroyUserById);

export default router;
