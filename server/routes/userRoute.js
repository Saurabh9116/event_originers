// import express from "express";
// import { isAuth, login, logout, register, verifyOtp } from "../controllers/userController.js";
// import authUser from "../middlewares/authUser.js";

// const userRouter = express.Router();

// userRouter.post("/register", register);       // send OTP
// userRouter.post("/verify-otp", verifyOtp);    // ✅ new route for OTP verification
// userRouter.post("/login", login);
// userRouter.get("/is-auth", authUser, isAuth);
// userRouter.get("/logout", authUser, logout);

// export default userRouter;
import express from "express";
import {
  register,
  login,
  logout,
  verifyOtp,
  isAuth,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

// Registration & login
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/is-auth", isAuth);

// Forgot & reset password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

