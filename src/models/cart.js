import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    totalCost: Number,
    items: Array,
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
