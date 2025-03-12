import express from "express";
import { getAll, getMethodById, createMethod, destroyMethodById, updateMethod } from "../controllers/ShippingMethodController";

const router = express.Router();

router.get("/ShippingMethod", getAll);
router.get("/ShippingMethod/:id", getMethodById);
router.post("/ShippingMethod", createMethod);
router.put("/ShippingMethod", updateMethod)
router.delete("/ShippingMethod/:id", destroyMethodById)

export default router;
