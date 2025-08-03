import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, payment, verify } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/paymentpage", authMiddleware, payment);
orderRouter.post("/payment-verify", authMiddleware, verify);

export default orderRouter;
