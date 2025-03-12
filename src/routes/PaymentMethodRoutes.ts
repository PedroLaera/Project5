import express from "express";
import { getAll, getPaymentMethodById, createPaymentMethod, /*updatePayment*/ destroyPaymentMethodById } from "../controllers/PaymenteMethodController";

const router = express.Router();

router.get("/PaymentMethod", getAll);
router.get("/PaymentMethod/:id", getPaymentMethodById);
router.post("/PaymentMethod", createPaymentMethod);
//router.put("/PaymentMethod", updatePaymentMethod)
router.delete("/PaymentMethod/:id", destroyPaymentMethodById)

export default router;
