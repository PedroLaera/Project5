import express from "express";
import { getAll, getUserById, CreateUser, /*updateUser*/ DestroyUserById } from "../controllers/UserController";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getUserById);
router.post("/users", CreateUser);
//router.put("/users", updateUser);
router.delete("/users/:id", DestroyUserById)

export default router;
