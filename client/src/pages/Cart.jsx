import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import buySound from "../assets/buy_1.mp3";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const buyAudio = new Audio(buySound);



//option Razorpay alert
  useEffect(() => {
    if (paymentOption === "Razorpay") {
      alert(
        "✨ Almost ready! We’re finalizing a few quick verifications. Your payment option will appear shortly – thanks for your patience!"
      );
      setPaymentOption("Online"); // optional
    }
  }, [paymentOption]);

  // ---------- Cart Functions ----------
  const getCart = useCallback(() => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  }, [cartItems, products]);

  const getUserAddress = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) setSelectedAddress(data.addresses[0]);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios]);

  // ---------- OTP Functions ----------
  const handleSendOtp = async () => {
    if (!selectedAddress) return toast.error("Please select an address first");

    try {
      const { data } = await axios.post("/api/order/otp/send", {
        userId: user._id,
        email: user.email,
      });

      if (data.success) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
        setShowConfirmModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePlaceOrderWithOtp = async () => {
    if (!selectedAddress) return toast.error("Please select an address");
    if (!otp) return toast.error("Please enter the OTP");

    try {
      const orderPayload = {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
        otp,
      };

      const { data } = await axios.post(
        paymentOption === "COD" ? "/api/order/cod" : "/api/order/stripe",
        orderPayload
      );

      if (data.success) {
        buyAudio.play();
        toast.success(data.message);
        setCartItems({});
        navigate("/my-orders");
        setOtp("");
        setOtpSent(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ---------- useEffect ----------
  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [getCart]);

  useEffect(() => {
    if (user) getUserAddress();
  }, [user, getUserAddress]);

  // ---------- JSX ----------
  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row gap-8 mt-16 px-4 md:px-8 lg:px-16">
      {/* Left Section - Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
       🎟️ Event Bookings
          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full shadow-sm">
            {getCartCount()} Items
          </span>
        </h1>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center py-4 border-b hover:bg-gray-50 transition rounded-lg"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <img
                  className="w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-sm text-gray-500">
                  {/* Weight: {product.weight || "N/A"} */}
                </p>
                <div className="flex items-center mt-1 text-sm">
                  <span className="mr-2">No Of Tickets:</span>
                  <select
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                    value={cartItems[product._id]}
                    className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-green-400"
                  >
                    {Array(
                      cartItems[product._id] > 9 ? cartItems[product._id] : 9
                    )
                      .fill("")
                      .map((_, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center font-medium text-gray-800">
              {currency}
              {product.offerPrice * product.quantity}
            </p>

            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto bg-red-100 p-2 rounded-full hover:bg-red-200 transition"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Right Section - Order Summary */}
      <div className="max-w-[360px] w-full bg-white shadow-xl rounded-lg p-6 border sticky top-20 self-start">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          Registration Summary
        </h2>
        <hr className="border-gray-200 my-4" />

        {/* Delivery Address */}
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase text-gray-700">
            Your Address
          </p>
          <div className="relative mt-2 bg-gray-50 p-3 rounded-lg border">
            <p className="text-gray-600 text-sm leading-relaxed">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="absolute top-2 right-2 text-primary text-sm hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 left-0 py-2 bg-white border border-gray-300 rounded shadow-md text-sm w-full z-10">
                {addresses.map((address, idx) => (
                  <p
                    key={idx}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                >
                  ➕ Add address
                </p>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <p className="text-sm font-semibold uppercase text-gray-700 mt-6">
            Payment Method
          </p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded focus:ring-2 focus:ring-green-400"
            value={paymentOption}
          >
            <option value="PAT">Pay at Venue</option>
            <option value="Online">Online Payment(QR)</option>
             <option value="Razorpay">Pay via Razorpay</option> 
          </select>

          {/* QR Code */}
          {paymentOption === "Online" && (
            <div className="mt-4 flex justify-center">
              <img
                src={assets.QR}
                alt="QR Code for Online Payment"
                className="w-40 h-40 object-contain border p-2 rounded shadow"
              />
            </div>
          )}
        </div>

        <hr className="border-gray-200" />

        {/* Pricing */}
        <div className="text-gray-700 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span> Fee</span>
            <span className="text-green-600 font-medium">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-lg font-bold mt-3">
            <span>Total</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        {/* Confirm Order / OTP */}
        {!showConfirmModal && !otpSent ? (
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full py-3 mt-6 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
          >
            ✅ Confirm Details
          </button>
        ) : !otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full py-3 mt-6 cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
          >
            Send OTP
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handlePlaceOrderWithOtp}
              className="w-full py-3 mt-2 cursor-pointer bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
            >
              Confirm OTP & Event Booked 
            </button>
          </div>
        )}

        {/* ---------- Confirm Modal ---------- */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-lg font-bold mb-4">Confirm Order Details</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedAddress
                    ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                    : "No address selected"}
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {paymentOption}
                </p>
                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  {currency}
                  {getCartAmount() + (getCartAmount() * 2) / 100}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendOtp}
                  className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Confirm & Send OTP
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default Cart;
