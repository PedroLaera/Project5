import express from "express";
import { getAll, getProdutcsById, createProdutcs, /*updateProduct*/ destroyProdutcsById } from "../controllers/ProductController";

const router = express.Router();

router.get("/Products", getAll);
router.get("/Products/:id", getProdutcsById);
router.post("/Products", createProdutcs);
//router.put("/Product", updateProduct);
router.delete("/Products/:id", destroyProdutcsById)

export default router;