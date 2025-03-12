import express from "express";
import { createCategory, destroyCategoryById, getAll,  /*UpdateCategory*/ getCategoryById } from "../controllers/CategoryController";

const router = express.Router();

router.get("/Category", getAll);
router.get("/Category/:id", getCategoryById);
router.post("/Category", createCategory);
//router.put("/Category", UpdateCategory);
router.delete("/Category/:id", destroyCategoryById)

export default router;
