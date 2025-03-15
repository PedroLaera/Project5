import express from "express";
import {
  createCategory,
  destroyCategoryById,
  getAll,
  updateCategory,
  getCategoryById,
} from "../controllers/CategoryController";

const router = express.Router();

router.get("/Category", getAll);
router.get("/Category/:id", getCategoryById);
router.post("/Category", createCategory);
router.put("/Category/:id", updateCategory);
router.delete("/Category/:id", destroyCategoryById);

export default router;
