import React from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login"); // login, register, forgot
  const [step, setStep] = React.useState("form"); // form, otp, reset
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(0);

  // Resend timer
  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // ✅ Seller Login redirect (ADDED)
  const goToSellerLogin = () => {
    setShowUserLogin(false);
    navigate("/seller");
  };

  // Submit handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      // ----- Registration Flow -----
      if (state === "register") {
        if (step === "form") {
          const { data } = await axios.post("/api/user/register", {
            name,
            email,
            password,
            mobile,
          });
          if (data.success) {
            toast.success(data.message);
            setStep("otp");
            setResendTimer(30);
          } else {
            toast.error(data.message);
          }
        } else if (step === "otp") {
          const { data } = await axios.post("/api/user/verify-otp", { email, otp });
          if (data.success) {
            toast.success(data.message);
            setUser(data.user);
            setShowUserLogin(false);
            navigate("/");
            setStep("form");
          } else {
            toast.error(data.message);
          }
        }
        setLoading(false);
        return;
      }

      // ----- Forgot Password Flow -----
      if (state === "forgot") {
        if (step === "form") {
          const { data } = await axios.post("/api/user/forgot-password", { email });
          if (data.success) {
            toast.success(data.message);
            setStep("reset");
          } else {
            toast.error(data.message);
          }
        } else if (step === "reset") {
          const { data } = await axios.post("/api/user/reset-password", {
            email,
            otp,
            newPassword,
          });
          if (data.success) {
            toast.success(data.message);
            setState("login");
            setStep("form");
            setPassword("");
            setNewPassword("");
            setOtp("");
          } else {
            toast.error(data.message);
          }
        }
        setLoading(false);
        return;
      }

      // ----- Login Flow -----
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.success) {
        setUser(data.user);
        setShowUserLogin(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  // Resend OTP
  const resendOtpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
        mobile,
      });
      if (data.success) {
        toast.success("OTP resent successfully!");
        setResendTimer(60);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 bg-gradient-to-br from-white via-gray-50 to-gray-100 w-80 sm:w-[380px] p-8 rounded-2xl shadow-2xl border border-gray-200 relative"
      >
        {/* Title */}
        <p className="text-2xl font-bold text-center text-gray-800">
          {state === "login"
            ? "Welcome Back 👋"
            : state === "register"
            ? "Create Account ✨"
            : "Forgot Password 🔑"}
        </p>

        <p className="text-sm text-gray-500 text-center -mt-3">
          {state === "login"
            ? "Login to continue your journey"
            : state === "register" && step === "form"
            ? "Sign up to get started"
            : state === "register" && step === "otp"
            ? "Enter the OTP sent to your Gmail/Mobile"
            : step === "form"
            ? "Enter your email to reset password"
            : "Enter OTP and new password"}
        </p>

        {/* Registration Form */}
        {state === "register" && step === "form" && (
          <div className="flex flex-col gap-3">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Full Name"
              className="border p-2 rounded-md"
              required
            />
            <input
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              placeholder="Mobile Number"
              className="border p-2 rounded-md"
              required
            />
          </div>
        )}

        {/* OTP */}
        {state === "register" && step === "otp" && (
          <>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              placeholder="Enter OTP"
              className="border p-2 rounded-md"
              required
            />
            <button
              type="button"
              disabled={resendTimer > 0}
              onClick={resendOtpHandler}
              className="text-green-600 text-sm underline"
            >
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
            </button>
          </>
        )}

        {/* Forgot */}
        {state === "forgot" && step === "form" && (
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="border p-2 rounded-md"
            required
          />
        )}

        {/* Reset */}
        {state === "forgot" && step === "reset" && (
          <>
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              placeholder="OTP"
              className="border p-2 rounded-md"
              required
            />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              placeholder="New Password"
              className="border p-2 rounded-md"
              type="password"
              required
            />
          </>
        )}

        {/* Login/Common */}
        {(state === "login" || (state === "register" && step === "form")) && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="border p-2 rounded-md"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="border p-2 rounded-md"
              type={showPassword ? "text" : "password"}
              required
            />

            {state === "login" && (
              <p
                onClick={() => {
                  setState("forgot");
                  setStep("form");
                }}
                className="text-green-600 text-sm cursor-pointer"
              >
                Forgot Password?
              </p>
            )}
          </>
        )}

        {/* Switch Links (NEW USER / EXISTING USER) */}
        {state === "register" && step === "form" ? (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("login");
                setStep("form");
              }}
              className="text-green-600 cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : state === "login" ? (
          <p className="text-sm text-center">
            New user?{" "}
            <span
              onClick={() => setState("register")}
              className="text-green-600 cursor-pointer"
            >
              Sign up here
            </span>
          </p>
        ) : state === "forgot" ? (
          <p className="text-sm text-center">
            Back to{" "}
            <span
              onClick={() => {
                setState("login");
                setStep("form");
              }}
              className="text-green-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : null}

        {/* Submit */}
        <button
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded-lg"
        >
          {loading
            ? "Processing..."
            : state === "register"
            ? step === "form"
              ? "Create Account"
              : "Verify OTP"
            : state === "forgot"
            ? step === "form"
              ? "Send Reset OTP"
              : "Reset Password"
            : "Login"}
        </button>

        {/* ✅ Seller Login (ONLY ADDITION) */}
        <div className="flex items-center gap-2">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-xs">OR</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        <button
          type="button"
          onClick={goToSellerLogin}
          className="border-2 border-green-600 text-green-700 py-2 rounded-lg"
        >
          🏪 Login as Admin
        </button>
      </form>
    </div>
  );
};

export default Login;
