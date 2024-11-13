const mongoose = require("mongoose");
const Product = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);
const ProductSchema = mongoose.model("Product", Product);

module.exports = ProductSchema;
