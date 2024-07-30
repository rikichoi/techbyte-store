import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    items: Array,
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
