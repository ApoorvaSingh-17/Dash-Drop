

import express from 'express';
import { BookingController } from '../controller/BookingController.js'; // Path to your controller

const router = express.Router();

// Route to create a new order
router.post('/create', BookingController);

export default router;