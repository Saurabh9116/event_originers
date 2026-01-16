import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // ✅ snapshot price (order time)
      },
    ],

    amount: { type: Number, required: true }, // total order amount (snapshot)
    address: { type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },

    // ✅ Order Status
    status: { type: String, default: "Order Placed" },

    // ✅ Payment Info
    paymentType: { type: String, required: true }, // "COD" | "Online"
    isPaid: { type: Boolean, default: false },

    // ✅ Manual management fields (seller/admin)
    sellerPaymentStatus: { type: String, default: "Pending" }, // "Pending" | "Paid" | "Unpaid"
    deliveryStatus: { type: String, default: "Processing" },   // "Processing" | "Shipped" | "Delivered"
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
