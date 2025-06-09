import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Order from "../models/order.js";

dotenv.config();

// Initialize Razorpay instance with your key
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variable for security
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST route to create Razorpay order  router.post('/create-order', router.post('/verify-payment', 
export const createOrder = async (req, res) => {
    try {
  const { amount, currency } = req.body; // You can also send these as query params or body params

  const options = {
    amount: amount, // Convert to paise
    currency: currency || 'INR', // Default to INR if currency is not provided
    receipt: `order_receipt_${Math.floor(Math.random() * 1000000)}`, // Unique receipt for this order
    notes: {
      description: 'Courier Booking Payment',
    },
  };

  
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Error creating Razorpay order', error });
  }
};


export const verifyPayment = async (req, res) => {
    try {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;

  // Create the signature string
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected_signature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  // Compare the Razorpay signature with our expected signature
  if (expected_signature === razorpay_signature) {
    res.status(200).json({ message: 'Payment verified successfully!' });
  } else {
    res.status(400).json({ message: 'Payment verification failed. Invalid signature.' });
  }
} catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Payment verification failed" });
}
};


// PUT route to update the payment status-router.put('/update-payment/:bookingId',
 export const updatePaymentStatus = async (req, res) => {
    try {
  const { paymentStatus, paymentMethod, paymentId } = req.body;
  const { bookingId } = req.params; // Get booking ID from the URL params

  
    // Find the booking by ID
    const booking = await Order.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the payment details in the booking npm install razorpay crypto 

    // booking.paymentDetails = {
    //   paymentStatus,
    //   paymentMethod,
    //   paymentId,  
    // };

    if (!booking.paymentDetails) {
      booking.paymentDetails = {}; // initialize if undefined
    }

    if (paymentStatus) booking.paymentDetails.paymentStatus = paymentStatus;
    if (paymentMethod) booking.paymentDetails.paymentMethod = paymentMethod;
    if (paymentId) booking.paymentDetails.paymentId = paymentId;

    // Save the updated booking
    await booking.save();

    res.status(200).json({ message: 'Payment status updated successfully!' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Error updating payment status', error });
  }
};



