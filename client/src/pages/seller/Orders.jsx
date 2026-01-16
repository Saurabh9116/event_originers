import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import buySound from '../../assets/buy_1.mp3';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const audioRef = useRef(new Audio(buySound));
  const previousOrderIds = useRef(new Set()); // track old orders
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  const paymentOptions = ["Pending", "Paid", "Unpaid"];
 const deliveryOptions = [
  "Booking Received",
  "Booking Approved",
  "Event Live",
  "Event Closed"
];


  // 🔊 Unlock audio on first click
  useEffect(() => {
    const unlockAudio = () => {
      audioRef.current.play().catch(() => {});
      audioRef.current.pause();
      setAudioUnlocked(true);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  // 📦 Fetch orders + play sound only for new ones
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        const newOrders = data.orders.filter(
          order => !previousOrderIds.current.has(order._id)
        );

        if (audioUnlocked && newOrders.length > 0) {
          newOrders.forEach(() => {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(console.log);
          });
        }

        previousOrderIds.current = new Set(data.orders.map(order => order._id));
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🔄 Poll every 2s
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 2000);
    return () => clearInterval(interval);
  }, [audioUnlocked]);

  // ✅ Update seller payment
  const handlePaymentUpdate = async (orderId, status) => {
    try {
      const { data } = await axios.put(`/api/order/seller/payment/${orderId}`, {
        sellerPaymentStatus: status,
      });
      if (data.success) {
        toast.success("Seller payment status updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Update delivery status
  const handleDeliveryUpdate = async (orderId, status) => {
    try {
      const { data } = await axios.put(`/api/order/seller/delivery/${orderId}`, {
        deliveryStatus: status,
      });
      if (data.success) {
        toast.success("Delivery status updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🎨 Styling helpers
  const getPaymentColor = (status) => {
    switch(status){
      case 'Paid': return 'bg-gradient-to-r from-green-200 to-green-400 text-green-800 font-semibold';
      case 'Pending': return 'bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 font-semibold';
      case 'Unpaid': return 'bg-gradient-to-r from-red-200 to-red-400 text-red-800 font-semibold';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDeliveryColor = (status) => {
  switch (status) {
    case "Booking Received":
      return "bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 font-semibold";

    case "Booking Approved":
      return "bg-gradient-to-r from-blue-200 to-blue-400 text-blue-800 font-semibold";

    case "Event Live":
      return "bg-gradient-to-r from-green-200 to-green-400 text-green-800 font-semibold";

    case "Event Closed":
      return "bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 font-semibold";

    default:
      return "bg-gray-100 text-gray-700";
  }
};


  const getCardBackground = (status) => {
    switch(status){
      case 'Paid': return 'bg-green-100 hover:bg-green-200';
      case 'Pending': return 'bg-yellow-100 hover:bg-yellow-200';
      case 'Unpaid': return 'bg-red-100 hover:bg-red-200';
      default: return 'bg-white hover:bg-gray-50';
    }
  };

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-10'>
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Orders List</h2>
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-gray-200 shadow-lg transform hover:scale-[1.03] transition-all duration-300 gap-6 animate-fadeIn ${getCardBackground(order.sellerPaymentStatus)}`}
          >
            {/* Products */}
            <div className="flex gap-4 max-w-[250px] md:max-w-[300px]">
              <img
                className="w-16 h-16 object-cover rounded-md border border-gray-200 hover:scale-110 transform transition duration-300"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div className="flex flex-col gap-1">
                {order.items.map((item) => (
                  <p key={item.product._id} className="font-medium text-gray-700">
                    {item.product.name}{" "}
                    <span className="text-primary font-semibold">x {item.quantity}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div className="text-sm md:text-base text-gray-600 flex-1">
              <p className='text-gray-800 font-semibold'>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p className="mt-1">{order.address.phone}</p>
            </div>

            {/* Amount */}
            <div className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 my-auto animate-pulse">
              {currency}{order.amount}
            </div>

            {/* Payment & Delivery */}
            <div className="flex flex-col text-sm md:text-base gap-3 text-gray-600">
              {/* Payment Method */}
              <span className="flex items-center gap-2 px-3 py-1 rounded-full shadow-md text-white font-semibold bg-gradient-to-r from-indigo-400 to-purple-500">
                <span>💳</span> Method: {order.paymentType}
              </span>

              {/* Order Date */}
              <span className="flex items-center gap-2 px-3 py-1 rounded-full shadow-md text-white font-semibold bg-gradient-to-r from-green-400 to-blue-500">
                <span>📅</span> {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })} at {new Date(order.createdAt).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>

              {/* Seller Payment */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-semibold"> Payment:</label>
                <select
                  value={order.sellerPaymentStatus}
                  onChange={(e) => handlePaymentUpdate(order._id, e.target.value)}
                  className={`px-3 py-1 border rounded-full ${getPaymentColor(order.sellerPaymentStatus)} transition-all duration-300 cursor-pointer`}
                >
                  {paymentOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Delivery Status */}
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 font-semibold"> Status:</label>
                <select
                  value={order.deliveryStatus}
                  onChange={(e) => handleDeliveryUpdate(order._id, e.target.value)}
                  className={`px-3 py-1 border rounded-full ${getDeliveryColor(order.deliveryStatus)} transition-all duration-300 cursor-pointer`}
                >
                  {deliveryOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm mt-6 text-gray-500 italic text-center">
        Click anywhere once on the page to enable <span className="text-primary font-semibold">order sound notifications</span>.
      </p>
    </div>
  );
};

export default Orders;

