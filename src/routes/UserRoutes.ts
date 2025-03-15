import express from "express";
import {
  getAll,
  getUserById,
  CreateUser,
  updaterUser,
  DestroyUserById,
} from "../controllers/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", CreateUser);
router.put("/users/:id", updaterUser);
router.delete("/users/:id", DestroyUserById);

export default router;
