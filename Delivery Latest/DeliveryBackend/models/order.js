// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
//     {
//         userId: { type: String, required: true },
//         products: [
//             {
//              productId: { type: String },
//              quantity: { type: Number, default: 1 },
//             },
//         ],
//         amount: { type: Number, required: true },
//         address: { type: Object, required: true },
//         status: { type: String, default: "pending" },  
//     },
//     { timestamps: true }
// );

// const Order = mongoose.model("Order", OrderSchema);
// export default Order;

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
      required: true,
    },
    senderDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      contactNumber: { type: String, required: true },
      address: {
        senderAddress: { type: String, required: true },
        streetAddress: { type: String, required: true },
        landmark: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
      },
    },
    receiverDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      contactNumber: { type: String, required: true },
      address: {
        receiverAddress: { type: String, required: true },
        streetAddress: { type: String, required: true },
        landmark: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
      },
    },
    packageDetails: {
      weight: { type: Number, required: true },
      description: { type: String, required: true },
      courierType: { type: String, enum: ["standard", "express", "same-day"], required: true },
      pickupDate: { type: Date, required: true },
      estimatedDeliveryDate: { type: Date, required: true },
      baseFee: { type: Number, required: true},
      distanceFee: { type: Number, required: true},
      weightFee: { type: Number, required: true},
      taxAmount: {type: Number, required: true},
     
    },
    paymentDetails: {
      paymentMethod: {
        type: String,
        enum: ["Razorpay", "Cash On Delivery"],
        required: true,
      },
      paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
      paymentId: { type: String },
      amount: { type: Number, required: true},
    },
    // orderLocation: {
    //     type: String, // Stores the current location or status of the order
    //     required: true,
    //     default: "Pickup location",
    //   },
    // orderStatus: { 
    //   type: String, 
    //   enum: ["placed", "in-transit", "delivered", "cancelled"], 
    //   default: "placed" 
    // },
    trackingHistory: [
      {
        status: {
          type: String,
          enum: ["Placed", "Assigned", "Processing", "In-transit", "Delivered", "Cancelled", "Out for delivery"],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        event: {
          type: String,
          required: true
        }, // event description
        location: {
          type: String,
        },
        lat: { type: Number },      // <== NEW
        lng: { type: Number },      // <== NEW
      },
    ],

  },
  // { timestamps: true }
);

// const Order = mongoose.model("Order", OrderSchema);
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
