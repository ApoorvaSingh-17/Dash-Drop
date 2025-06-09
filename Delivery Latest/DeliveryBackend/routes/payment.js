import express from "express";
import { createOrder, updatePaymentStatus, verifyPayment } from "../controller/paymentController.js";
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.put('/update-payment/:bookingId',updatePaymentStatus);

export default router;  // ✅ Correct default export in ESM