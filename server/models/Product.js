// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {type: String, required: true },
//     description: {type: Array, required: true},
//     price: {type: Number, required: true },
//     offerPrice: {type: Number, required: true },
//     image: {type: Array, required: true },
//     category: {type: String, required: true },
//     inStock: {type: Boolean, default: true },
// }, { timestamps: true})

// const Product = mongoose.models.product || mongoose.model('product', productSchema)

// export default Product
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // Description stays same
    description: { type: Array, required: true },

    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },

    image: { type: Array, required: true },
    category: { type: String, required: true },

    inStock: { type: Boolean, default: true },

    // ================= EVENT FIELDS (NEW) =================

    totalSeats: {
      type: Number,
      default: 100, // safe default
    },

    bookedSeats: {
      type: Number,
      default: 0,
    },

    eventDate: {
      type: String,
      default: "",
    },

    eventTime: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
