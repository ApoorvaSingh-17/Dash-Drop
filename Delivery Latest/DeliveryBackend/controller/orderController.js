import Order from "../models/order.js";
import mongoose from "mongoose";

// PATCH /api/orders/update-status/:orderId
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status, location, lat, lng, event } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     if (status) order.orderStatus = status;
//     if (location) order.orderLocation = location || order.orderLocation;

//     // Add new status to tracking history
//     // order.trackingHistory.push({
//     //   status,
//     //   location,
//     //   event: event || "No event description", // 👈 default fallback
//     //   timestamp: new Date(), // current time
//     // });

//     // Add new status to tracking history
//     const trackingEntry = {
//       status,
//       location,
//       event: event || "No event description",
//       timestamp: new Date(), // current time
//       // date: date || new Date().toLocaleDateString(),
//       // time: time || new Date().toLocaleTimeString(),
//     };

//     // Add lat/lng if provided
//     if (lat !== undefined && lng !== undefined) {
//       trackingEntry.lat = lat;
//       trackingEntry.lng = lng;
//     }

//     order.trackingHistory.push(trackingEntry);


//     await order.save();

//     res.status(200).json({ message: "Order status updated successfully", order });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update order status", error });
//   }
// };
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, location, lat, lng, event } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (typeof status === "string" && status.trim() !== "") {
      order.orderStatus = status;
    }

    if (typeof location === "string" && location.trim() !== "") {
      order.orderLocation = location;
    }

    const trackingEntry = {
      status,
      location,
      event: event || "No event description",
      timestamp: new Date(),
    };

    if (lat !== undefined && lng !== undefined) {
      trackingEntry.lat = lat;
      trackingEntry.lng = lng;
    }

    order.trackingHistory.push(trackingEntry);

    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Update Order Error:", error);
    res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};

// GET /api/orders/track/:orderId
export const trackOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
  
      const order = await Order.findById(orderId).populate("user", "username email");
  
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      res.status(200).json({
        orderStatus: order.orderStatus,
        orderLocation: order.orderLocation,
        trackingHistory: order.trackingHistory,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to track order", error });
    }
  };

  // Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
  
