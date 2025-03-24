import express from "express";
import {
  getAll,
  getUserById,
  CreateUser,
  updaterUser,
  DestroyUserById,
  listUsers,
} from "../controllers/UserController";
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router();

router.get("/users", authMiddleware, getAll);
router.get("/users/:id", authMiddleware, getUserById);
router.get("/users", listUsers)
router.post("/users", CreateUser);
router.put("/users/:id", authMiddleware, updaterUser);
router.delete("/users/:id", authMiddleware, DestroyUserById);

export default router;
