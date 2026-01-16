import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) fetchMyOrders();
  }, [user]);

  // Background color for order card based on payment status
  const getCardBackground = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-50 border-green-300";
      case "Pending":
        return "bg-yellow-50 border-yellow-300";
      case "Unpaid":
        return "bg-red-50 border-red-300";
      default:
        return "bg-white border-gray-200";
    }
  };

  // Badge color for seller payment
  const getPaymentBadge = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-200 text-green-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Unpaid":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Badge color for delivery status
  const getDeliveryBadge = (status) => {
  switch (status) {
    case "Booking Received":
      return "bg-yellow-200 text-yellow-800";

    case "Booking Approved":
      return "bg-blue-200 text-blue-800";

    case "Event Live":
      return "bg-green-200 text-green-800";

    case "Event Closed":
      return "bg-gray-300 text-gray-800";

    default:
      return "bg-gray-200 text-gray-800";
  }
};


  return (
    <div className="mt-16 pb-16 px-4">
      {/* Title */}
      <div className="flex flex-col items-center mb-12">
        <p className="text-3xl font-bold uppercase tracking-wide text-gray-800">
          My Event 
        </p>
        <div className="w-20 h-1 bg-primary rounded-full mt-2"></div>
      </div>

      {myOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No orders found. Start shopping now!
        </p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={order._id || index}
            className={`border ${getCardBackground(
              order.sellerPaymentStatus
            )} rounded-2xl mb-10 p-6 shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 max-w-5xl mx-auto`}
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-600 text-sm font-medium border-b border-gray-200 pb-4 mb-4">
              <span>🆔 Ticket ID: {order._id}</span>
              <span>💳 Payment Mode : {order.paymentType}</span>
              <span>
                💰 Total:{" "}
                <span className="text-primary font-semibold">
                  {currency}
                  {order.amount}
                </span>
              </span>
            </div>

            {/* Items */}
            {order.items.map((item, idx) => (
              <div
                key={item.product?._id || idx}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-6 py-5 ${
                  order.items.length !== idx + 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <img
                      src={item.product?.image?.[0]}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Category: {item.product?.category}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex flex-col text-sm text-gray-600 gap-2">
                  <p>🎟️ Ticket :-  {item.quantity || "1"}</p>
                  <p>
                    📌 Status:{" "}
                    <span
                      className={`px-2 py-1 rounded-full font-semibold ${getDeliveryBadge(
                        order.deliveryStatus || order.status
                      )}`}
                    >
                      {order.deliveryStatus || order.status}
                    </span>
                  </p>
                  <p>
                    📅 Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date(order.createdAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                  {/* <p>
                    💲 Payment:{" "}
                    {order.isPaid ? (
                      <span className="text-green-600 font-medium">Paid</span>
                    ) : (
                      <span className="text-red-600 font-medium">Unpaid</span>
                    )}
                  </p> */}
                  <p>
                    💲Payment:{" "}
                    <span
                      className={`px-2 py-1 rounded-full font-semibold ${getPaymentBadge(
                        order.sellerPaymentStatus
                      )}`}
                    >
                      {order.sellerPaymentStatus || "Pending"}
                    </span>
                  </p>
                </div>

                {/* Amount */}
                <p className="text-primary text-lg font-bold min-w-[120px] text-right">
                  {currency}
                  {item.product?.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
