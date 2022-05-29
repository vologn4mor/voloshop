import mongoose from "mongoose";

const Order = new mongoose.Schema({
  city: { type: String, required: true },
  street: { type: String, required: true },
  email: { type: String },
  number: { type: String, required: true },
  totalItems: { type: Object, required: true },
});

export default mongoose.model("Order", Order);
