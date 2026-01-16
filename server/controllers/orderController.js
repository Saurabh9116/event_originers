// import Order from "../models/Order.js";
// import Product from "../models/Product.js";
// import stripe from "stripe";
// import User from "../models/User.js";
// import { sendOtpEmail } from "../configs/mailer.js"; // existing mailer

// // Temporary in-memory OTP store
// const otpStore = {}; // { userId: { otp: 123456, expires: timestamp } }

// // ------------------ OTP Endpoints ------------------

// // Send OTP before placing order
// export const sendOrderOtp = async (req, res) => {
//     const { userId, email } = req.body;

//     if (!userId || !email) {
//         return res.status(400).json({ success: false, message: "User ID and email are required" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

//     // Store OTP for 5 minutes
//     otpStore[userId] = {
//         otp,
//         expires: Date.now() + 5 * 60 * 1000
//     };

//     try {
//         await sendOtpEmail(email, otp); // call your existing mailer
//         res.json({ success: true, message: "OTP sent to your email" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Failed to send OTP" });
//     }
// };

// // OTP verification middleware
// export const verifyOtp = (req, res, next) => {
//     const { userId, otp } = req.body;

//     const storedOtp = otpStore[userId];
//     if (!storedOtp || storedOtp.otp != otp || storedOtp.expires < Date.now()) {
//         return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
//     }

//     // OTP valid → remove it
//     delete otpStore[userId];

//     // Continue to place order
//     next();
// };

// // ------------------ Place Orders ------------------

// // COD Order
// export const placeOrderCOD = async (req, res) => {
//     try {
//         const { userId, items, address } = req.body;
//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" });
//         }

//         let amount = 0;
//         const orderItems = [];

//         for (let item of items) {
//             const product = await Product.findById(item.product);
//             if (!product) {
//                 return res.json({ success: false, message: "Product not found" });
//             }

//             const itemPrice = product.offerPrice; // ✅ snapshot price
//             amount += itemPrice * item.quantity;

//             orderItems.push({
//                 product: product._id,
//                 quantity: item.quantity,
//                 price: itemPrice // ✅ save price at order time
//             });
//         }

//         // Add Tax Charge (2%)
//         amount += Math.floor(amount * 0.02);

//         await Order.create({
//             userId,
//             items: orderItems,
//             amount,
//             address,
//             paymentType: "COD",
//         });

//         return res.json({ success: true, message: "Order Placed Successfully" });
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// };

// // Stripe Order
// export const placeOrderStripe = async (req, res) => {
//     try {
//         const { userId, items, address } = req.body;
//         if (!address || items.length === 0) {
//             return res.json({ success: false, message: "Invalid data" });
//         }

//         let amount = 0;
//         const orderItems = [];

//         for (let item of items) {
//             const product = await Product.findById(item.product);
//             if (!product) {
//                 return res.json({ success: false, message: "Product not found" });
//             }

//             const itemPrice = product.offerPrice; // ✅ snapshot price
//             amount += itemPrice * item.quantity;

//             orderItems.push({
//                 product: product._id,
//                 quantity: item.quantity,
//                 price: itemPrice // ✅ save price at order time
//             });
//         }

//         // Add Tax Charge (2%)
//         amount += Math.floor(amount * 0.02);

//         await Order.create({
//             userId,
//             items: orderItems,
//             amount,
//             address,
//             paymentType: "Online",
//         });

//         return res.json({ success: true, message: "Order Placed Successfully" });
//     } catch (error) {
//         return res.json({ success: false, message: error.message });
//     }
// };

// // ------------------ Get Orders ------------------

// // User Orders
// export const getUserOrders = async (req, res) => {
//     try {
//         const { userId } = req.body;
//         let orders = await Order.find({ userId })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         // ✅ overwrite product.offerPrice with snapshot price
//         orders = orders.map(order => {
//             order = order.toObject();
//             order.items = order.items.map(item => ({
//                 ...item,
//                 product: item.product ? {
//                     ...item.product,
//                     offerPrice: item.price   // snapshot fix
//                 } : null
//             }));
//             return order;
//         });

//         res.json({ success: true, orders });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // All Orders (seller/admin)
// export const getAllOrders = async (req, res) => {
//     try {
//         let orders = await Order.find({
//             $or: [{ paymentType: "COD" }, { paymentType: "Online" }, { isPaid: true }]
//         })
//             .populate("items.product address")
//             .sort({ createdAt: -1 });

//         // ✅ overwrite product.offerPrice with snapshot price
//         orders = orders.map(order => {
//             order = order.toObject();
//             order.items = order.items.map(item => ({
//                 ...item,
//                 product: item.product ? {
//                     ...item.product,
//                     offerPrice: item.price   // snapshot fix
//                 } : null
//             }));
//             return order;
//         });

//         res.json({ success: true, orders });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // ------------------ Seller Update Endpoints ------------------

// // Update seller payment status
// export const updateSellerPaymentStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { sellerPaymentStatus } = req.body;

//         if (!["Pending", "Paid", "Unpaid"].includes(sellerPaymentStatus)) {
//             return res.status(400).json({ success: false, message: "Invalid seller payment status" });
//         }

//         await Order.findByIdAndUpdate(orderId, { sellerPaymentStatus }, { new: true });
//         res.json({ success: true, message: "Seller payment status updated" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update delivery status
// export const updateDeliveryStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { deliveryStatus } = req.body;

//         if (!["Processing", "Shipped", "Out for Delivery", "Delivered"].includes(deliveryStatus)) {
//             return res.status(400).json({ success: false, message: "Invalid delivery status" });
//         }

//         await Order.findByIdAndUpdate(orderId, { deliveryStatus }, { new: true });
//         res.json({ success: true, message: "Delivery status updated" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };



import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";
import { sendOtpEmail } from "../configs/mailer.js";

// ================= OTP STORE =================
const otpStore = {}; // { userId: { otp, expires } }

// ================= OTP FUNCTIONS =================

// Send OTP before placing order
export const sendOrderOtp = async (req, res) => {
  const { userId, email } = req.body;

  if (!userId || !email) {
    return res.status(400).json({
      success: false,
      message: "User ID and email are required",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[userId] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000,
  };

  try {
    await sendOtpEmail(email, otp);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// Verify OTP middleware
export const verifyOtp = (req, res, next) => {
  const { userId, otp } = req.body;

  const storedOtp = otpStore[userId];
  if (
    !storedOtp ||
    storedOtp.otp != otp ||
    storedOtp.expires < Date.now()
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired OTP",
    });
  }

  delete otpStore[userId];
  next();
};

// ================= SEAT RESERVATION =================

const reserveSeats = async (product, quantity) => {
  const totalSeats = product.totalSeats || 0;
  const bookedSeats = product.bookedSeats || 0;

  if (bookedSeats + quantity > totalSeats) {
    throw new Error(`Not enough seats available for ${product.name}`);
  }

  product.bookedSeats += quantity;

  // Auto close booking
  if (product.bookedSeats >= product.totalSeats) {
    product.inStock = false;
  }

  await product.save();
};

// ================= PLACE ORDER (COD) =================

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    const orderItems = [];

    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }

      // ✅ SEAT CHECK & RESERVE
      await reserveSeats(product, item.quantity);

      const itemPrice = product.offerPrice;
      amount += itemPrice * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    // 2% Tax
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items: orderItems,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================= PLACE ORDER (STRIPE) =================

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    const orderItems = [];

    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }

      // ✅ SEAT CHECK & RESERVE
      await reserveSeats(product, item.quantity);

      const itemPrice = product.offerPrice;
      amount += itemPrice * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    // 2% Tax
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items: orderItems,
      amount,
      address,
      paymentType: "Online",
    });

    return res.json({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET USER ORDERS =================

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    let orders = await Order.find({ userId })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    // Snapshot price fix
    orders = orders.map((order) => {
      order = order.toObject();
      order.items = order.items.map((item) => ({
        ...item,
        product: item.product
          ? { ...item.product, offerPrice: item.price }
          : null,
      }));
      return order;
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= GET ALL ORDERS =================

export const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find({
      $or: [
        { paymentType: "COD" },
        { paymentType: "Online" },
        { isPaid: true },
      ],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    orders = orders.map((order) => {
      order = order.toObject();
      order.items = order.items.map((item) => ({
        ...item,
        product: item.product
          ? { ...item.product, offerPrice: item.price }
          : null,
      }));
      return order;
    });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= SELLER UPDATES =================

export const updateSellerPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { sellerPaymentStatus } = req.body;

    if (!["Pending", "Paid", "Unpaid"].includes(sellerPaymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid seller payment status",
      });
    }

    await Order.findByIdAndUpdate(orderId, { sellerPaymentStatus });
    res.json({ success: true, message: "Seller payment status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;

    if (
      !["Booking Received", "Booking Approved", "Event Live", "Event Closed"].includes(
        deliveryStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery status",
      });
    }

    await Order.findByIdAndUpdate(orderId, { deliveryStatus });
    res.json({ success: true, message: "Delivery status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
