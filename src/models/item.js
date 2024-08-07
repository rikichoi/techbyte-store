import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    price: Number,
    description: Array,
    image: String,
    type: String,
    stock: Number,
    productName: String,
    brand: String,
    sale: Boolean,
    discount: Number,
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
