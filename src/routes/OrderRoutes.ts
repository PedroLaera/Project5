import express from "express";
import { getAll, GetOrderById, CreateOrder, /*updatePayment*/ destroyOrderById } from "../controllers/OrderController";

const router = express.Router();

router.get("/Order", getAll);
router.get("/Order/:id", GetOrderById);
router.post("/Order", CreateOrder);
//router.put("/Order", updateOrder)
router.delete("/Order/:id", destroyOrderById)

export default router;