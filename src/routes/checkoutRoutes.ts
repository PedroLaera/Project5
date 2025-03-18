import express from "express";
import { addToCart, /*removeFromCart*/ getCartItems, finalizeCheckout } from "../controllers/CheckoutController";
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router();

router.post("/cart/add", authMiddleware, addToCart);
//router.delete("/cart/remove/:productId", removeFromCart);
router.get("/cart", authMiddleware, getCartItems);
router.post("/confirm", authMiddleware, finalizeCheckout);

export default router;
