import express from "express";
import { getAll, getProdutcsById, createProdutcs, destroyProdutcsById } from "../controllers/ProductController";

const router = express.Router();

router.get("/Products", getAll);
router.get("/Products/:id", getProdutcsById);
router.post("/Products", createProdutcs);
router.delete("/Products/:id", destroyProdutcsById)

export default router;