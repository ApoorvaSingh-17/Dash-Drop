import Order from "../models/order.js"; // Path to the Order schema
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { generateInvoiceBuffer } from "../utils/generateInvoiceBuffer.js";
// import Orders from "../models/order.js";


// Controller function to handle the creation of an order
export const BookingController = async (req, res) => {
  try {
    const orderData = req.body;

    // Validate orderData if necessary
    if (!orderData.userId || !orderData.senderDetails || !orderData.receiverDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ✅ Add initial tracking history entry: "Courier placed"
    const initialTrackingEntry = {
      status: "Placed",
      event: "Courier placed",
      timestamp: new Date(),
      location: orderData.senderDetails?.address?.city || "Pickup location",
    };

    // Create new Order object
    const newOrder = new Order({
      user: orderData.userId, // Ensure userId is a valid ObjectId
      senderDetails: orderData.senderDetails,
      receiverDetails: orderData.receiverDetails,
      packageDetails: orderData.packageDetails,
      paymentDetails: orderData.paymentDetails,
      trackingHistory: [initialTrackingEntry], // 🟢 Init tracking here
      // orderLocation: orderData.orderLocation || 'Pickup location',
      // orderStatus: orderData.orderStatus || 'placed',
    });

    // Save order to the database
    const savedOrder = await newOrder.save();


    //For sending confirmation mail and the courier Id

    // const order = await Order.findOne({ user: orderData.userId }, '_id').lean();
    // if (order) {
    //   var orderId = order._id.toString(); // Converts the ObjectId to a string
    //   console.log('Order ID:', orderId);
    // } else {
    //   console.log('No order found for the given user.');
    // }

     // 🔐 Fetch new order ID (just use savedOrder._id)
     const orderId = savedOrder._id.toString();

     // ✅ STEP 1: Generate invoice buffer from saved order
    const invoiceBuffer = await generateInvoiceBuffer(savedOrder);

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or your preferred email service
      auth: {
        user: 'dashanddropdeliveryservices@gmail.com',
        pass: 'jazp thnw xjsr tsss', // Use environment variables to store sensitive information
      },
    });

    // Function to send email
    const sendConfirmationEmail = async () => {
      try {
        const mailOptions = {
          from: '"Courier Service" <dashanddropdeliveryservices@gmail.com>', // Sender address
          to: orderData.senderDetails.email, // Recipient's email
          subject: 'Order Confirmation', // Subject line
          text: `Dear ${orderData.senderDetails.firstName},\n\nYour courier with Courier ID ${orderId} has been confirmed. Thank you for choosing our service.\n\nBest Regards,\nDash and Drop Team`,
          attachments: [
        {
          filename: 'invoice.pdf',
          content: invoiceBuffer,
          contentType: 'application/pdf',
        },
      ],
        };

        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully');
      } catch (error) {
        console.log('Error sending email:', error);
      }
    };
    await sendConfirmationEmail();
    res.status(201).json({ message: 'Order created successfully', order: savedOrder });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export default BookingController;