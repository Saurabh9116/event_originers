// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendOtpEmail } from "../configs/mailer.js"; // ✅ OTP mail sender

// // Temporary in-memory OTP store (for demo, use Redis/DB in production)
// let otpStore = {};

// // Register User (Step 1: Send OTP)
// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.json({ success: false, message: "Missing Details" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.json({ success: false, message: "User already exists" });

//     // ✅ Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     // ✅ Store OTP temporarily (5 min expiry)
//     otpStore[email] = { otp, name, password, expires: Date.now() + 5 * 60 * 1000 };

//     // ✅ Send OTP email
//     await sendOtpEmail(email, otp);

//     return res.json({
//       success: true,
//       message: "OTP sent to your Gmail. Please verify to complete registration.",
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Verify OTP (Step 2: Create User after OTP success)
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp)
//       return res.json({ success: false, message: "Email and OTP required" });

//     const otpData = otpStore[email];
//     if (!otpData) return res.json({ success: false, message: "OTP not found" });

//     if (Date.now() > otpData.expires) {
//       delete otpStore[email];
//       return res.json({ success: false, message: "OTP expired" });
//     }

//     if (parseInt(otp) !== otpData.otp) {
//       return res.json({ success: false, message: "Invalid OTP" });
//     }

//     // ✅ OTP success → Create user
//     const hashedPassword = await bcrypt.hash(otpData.password, 10);
//     const user = await User.create({
//       name: otpData.name,
//       email,
//       password: hashedPassword,
//     });

//     // ✅ Clear OTP
//     delete otpStore[email];

//     // ✅ Generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true, message: "User registered successfully", user: { email: user.email, name: user.name } });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Login User (unchanged)
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.json({ success: false, message: "Email and password are required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.json({ success: false, message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.json({ success: false, message: "Invalid email or password" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({ success: true, user: { email: user.email, name: user.name } });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Check Auth (unchanged)
// export const isAuth = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const user = await User.findById(userId).select("-password");
//     return res.json({ success: true, user });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Logout User (unchanged)
// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("token", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//     });
//     return res.json({ success: true, message: "Logged Out" });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };






import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOtpEmail } from "../configs/mailer.js"; // OTP mail sender

// Temporary in-memory OTP store (for demo; use Redis/DB in production)
let otpStore = {};

// --------------------- REGISTER ---------------------
export const register = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile)
      return res.json({ success: false, message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({ success: false, message: "User already exists" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP temporarily (expires in 5 minutes)
    otpStore[email] = { otp, name, password, mobile, expires: Date.now() + 5 * 60 * 1000 };

    // Send OTP email
    await sendOtpEmail(email, otp);

    return res.json({
      success: true,
      message: "OTP sent to your Gmail. Please verify to complete registration.",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// --------------------- VERIFY OTP ---------------------
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.json({ success: false, message: "Email and OTP required" });

    const otpData = otpStore[email];
    if (!otpData) return res.json({ success: false, message: "OTP not found" });

    if (Date.now() > otpData.expires) {
      delete otpStore[email];
      return res.json({ success: false, message: "OTP expired" });
    }

    if (parseInt(otp) !== otpData.otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // OTP success → Create user
    const hashedPassword = await bcrypt.hash(otpData.password, 10);
    const user = await User.create({
      name: otpData.name,
      email,
      password: hashedPassword,
      mobile: otpData.mobile,
    });

    // Clear OTP
    delete otpStore[email];

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "User registered successfully",
      user: { email: user.email, name: user.name, mobile: user.mobile },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// --------------------- LOGIN ---------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, user: { email: user.email, name: user.name, mobile: user.mobile } });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// --------------------- CHECK AUTH ---------------------
export const isAuth = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.json({ success: false, message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    return res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// --------------------- LOGOUT ---------------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};




// --------------------- RESET PASSWORD ---------------------
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword)
      return res.json({ success: false, message: "Email, OTP and new password are required" });

    const otpData = otpStore[email];
    if (!otpData) return res.json({ success: false, message: "OTP not found" });

    if (Date.now() > otpData.expires) {
      delete otpStore[email];
      return res.json({ success: false, message: "OTP expired" });
    }

    if (parseInt(otp) !== otpData.otp)
      return res.json({ success: false, message: "Invalid OTP" });

    // OTP is valid → update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    // Clear OTP
    delete otpStore[email];

    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


// --------------------- FORGOT PASSWORD ---------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ success: false, message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    // Generate OTP for password reset
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store OTP temporarily
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    // Send OTP email
    await sendOtpEmail(email, otp);

    return res.json({ success: true, message: "OTP sent to your email for password reset" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
