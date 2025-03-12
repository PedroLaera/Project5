import express from "express";
import { getAll, getCommentsById, createComments, /*updateComments*/ destroyCommentsById } from "../controllers/CommentController";

const router = express.Router();

router.get("/Order", getAll);
router.get("/Order/:id", getCommentsById);
router.post("/Order", createComments);
//router.put("/Order", updateComments)
router.delete("/Order/:id", destroyCommentsById)

export default router;