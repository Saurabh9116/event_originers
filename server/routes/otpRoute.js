import express from "express";
import { sendRegisterOtp, verifyRegisterOtp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup-send-otp", sendRegisterOtp);
router.post("/signup-verify-otp", verifyRegisterOtp);

export default router;
