import express from "express";
import {
  getAll,
  getCommentsById,
  createComments,
  updateComments,
  destroyCommentsById,
} from "../controllers/CommentController";
const router = express.Router();

router.get("/comment", getAll);
router.get("/comment/:id", getCommentsById);
router.post("/comment", createComments);
router.put("/comment/:id", updateComments);
router.delete("/comment/:id", destroyCommentsById);

export default router;
