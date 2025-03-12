import express from "express";
import { getAll, getUserById, createUser, /*updateUser*/ DestroyUserById } from "../controllers/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
//router.put("/users", updateUser);
router.delete("/users/:id", DestroyUserById)

export default router;
