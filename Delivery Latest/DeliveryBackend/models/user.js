import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        // name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["User", "Staff", "DeliveryPerson", "Admin"],
            default: "User",
        },
        staffRequest: { type: Boolean, required: true },
        isStaff: { type: Boolean, default: false },
        // img: { type:String },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
