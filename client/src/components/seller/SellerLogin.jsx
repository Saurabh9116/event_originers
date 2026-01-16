import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const { data } = await axios.post('/api/seller/login', { email, password });
      setLoading(false);

      if (data.success) {
        setIsSeller(true);
        navigate('/seller');
        toast.success("Login Successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSeller) navigate("/seller");
  }, [isSeller]);

  return !isSeller && (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-primary/20 via-primary/40 to-primary/10">
      
      {/* Floating theme-colored shapes */}
      <div className="absolute w-72 h-72 bg-primary/30 rounded-full -top-20 -left-20 animate-pulse-slow"></div>
      <div className="absolute w-60 h-60 bg-primary/25 rounded-full -bottom-16 -right-16 animate-pulse-slow"></div>
      <div className="absolute w-40 h-40 bg-primary/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>

      {/* Login Form */}
      <form
        onSubmit={onSubmitHandler}
        className="relative flex flex-col gap-6 p-10 rounded-2xl shadow-2xl bg-white w-80 sm:w-96 transition-all duration-500 hover:shadow-3xl z-10"
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-4">Admin Login</h2>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium text-primary">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full relative">
          <label className="mb-1 font-medium text-primary">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition-all duration-300 bg-gradient-to-r from-white to-gray-50 w-full"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer select-none text-primary font-semibold text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-2">
          Not a Admin? <span className="text-primary cursor-pointer hover:underline">Sign Up</span>
        </p>
      </form>

      {/* Tailwind Custom Animation */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SellerLogin;
