import express from "express";
import { updateOrderStatus, trackOrder, getOrderById } from "../controller/orderController.js";


const router = express.Router();

// For delivery person to update status
router.patch("/update-status/:orderId", updateOrderStatus);

// For users to track courier
router.get("/track/:orderId", trackOrder);

// Define the route that uses the controller
router.get("/order/:orderId", getOrderById);

export default router;
