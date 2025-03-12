import express from "express";
import { getAll } from "../controllers/CategoryController";

const router = express.Router();

router.get("/Category", getAll);

export default router;
