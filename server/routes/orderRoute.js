import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import { 
    getAllOrders, 
    getUserOrders, 
    placeOrderCOD, 
    placeOrderStripe,
    sendOrderOtp,
    verifyOtp,
    updateSellerPaymentStatus,
    updateDeliveryStatus
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// ----------------- OTP Routes -----------------
// Send OTP before placing order
orderRouter.post('/otp/send', authUser, sendOrderOtp);

// Place order COD with OTP verification
orderRouter.post('/cod', authUser, verifyOtp, placeOrderCOD);

// Place order Stripe with OTP verification
orderRouter.post('/stripe', authUser, verifyOtp, placeOrderStripe);

// ----------------- Existing Routes -----------------
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

// ----------------- New Seller Routes -----------------
// Update seller payment status (manual)
orderRouter.put('/seller/payment/:orderId', authSeller, updateSellerPaymentStatus);

// Update delivery status (manual)
orderRouter.put('/seller/delivery/:orderId', authSeller, updateDeliveryStatus);

export default orderRouter;
