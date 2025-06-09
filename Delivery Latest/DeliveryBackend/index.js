import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./connectDB.js";
import authRouter from "./routes/auth.js";
import approvalRouter from "./routes/approval.js";
import bookingRouter from "./routes/booking.js"
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";

const app=express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();
connectDb();
const PORT=8080||process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

app.use("/api/auth",authRouter);
app.use("/api/approval",approvalRouter);
app.use("/api/booking",bookingRouter);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
