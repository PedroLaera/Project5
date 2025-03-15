import express from "express";
import {
  getAll,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  destroyPaymentMethodById,
} from "../controllers/PaymenteMethodController";

const router = express.Router();

router.get("/PaymentMethod", getAll);
router.get("/PaymentMethod/:id", getPaymentMethodById);
router.post("/PaymentMethod", createPaymentMethod);
router.put("/PaymentMethod/:id", updatePaymentMethod);
router.delete("/PaymentMethod/:id", destroyPaymentMethodById);

export default router;
