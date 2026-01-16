import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Event ", path: "/seller", icon: assets.add_icon },
    { name: "Event List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Booking", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-md">
     <Link to="/" className="cursor-pointer">
  <h1 className="text-xl md:text-2xl font-bold text-primary hover:scale-105 transition-transform">
    Hospital Event Organizer
  </h1>
</Link>


        <div className="flex items-center gap-3 md:gap-5">
          {/* Quick Action Buttons */}
          <div className="flex gap-2 md:gap-3">
            {/* Add Product (always visible) */}
            <Link
              to="/seller"
              className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm md:text-base font-medium hover:scale-105 hover:shadow-lg transition-transform"
            >
              Add Event 
            </Link>

            {/* View Orders (always visible) */}
            <Link
              to="/seller/orders"
              className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm md:text-base font-medium hover:scale-105 hover:shadow-lg transition-transform"
            >
              View Event 
            </Link>

            {/* Extra Buttons (desktop only) */}
            <button className="hidden md:block px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium hover:scale-105 hover:shadow-lg transition-transform">
              Analytics
            </button>
            <button className="hidden md:block px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:scale-105 hover:shadow-lg transition-transform">
              Settings
            </button>
          </div>

          {/* Admin Info */}
          <div className="flex items-center gap-2 md:gap-3 text-gray-500">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold animate-pulse">
              A
            </div>
            <p className="text-sm md:text-base font-medium">Hi! Admin</p>
          </div>

          <button
            onClick={logout}
            className="border rounded-full text-xs md:text-sm px-3 md:px-4 py-1 hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex h-[95vh]">
        {/* Sidebar */}
        <div className="md:w-64 w-20 bg-gradient-to-b from-gray-50 to-white border-r border-gray-300 flex flex-col items-center md:items-start pt-6 relative">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center w-full py-3 px-4 gap-3 rounded-lg mb-2 transition-all duration-300 transform
                 ${isActive
                    ? "bg-primary/20 text-primary shadow-lg scale-105 border-l-4 border-primary"
                    : "hover:bg-gray-100 hover:scale-105 hover:shadow-md"
                  }`
              }
            >
              <img
                src={item.icon}
                alt=""
                className="w-7 h-7 transition-transform duration-300 hover:scale-110"
              />
              <p className="md:block hidden font-medium">{item.name}</p>
            </NavLink>
          ))}

          {/* Sidebar Footer */}
          <div className="absolute bottom-6 md:bottom-4 left-0 md:left-4 w-full md:w-auto flex justify-center md:justify-start">
            <p className="text-gray-400 text-sm md:block hidden">Seller Panel v1.0</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {/* Optional Top Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg animate-gradient-x">
            <p className="text-lg md:text-xl font-semibold">Welcome Back, Admin!</p>
            <p className="text-sm md:text-base mt-1">  Manage your events, bookings, and everything easily.</p>
          </div>

          {/* Optional Quick Action Buttons inside main content */}
          <div className="flex gap-4 mb-6 flex-wrap">
            <Link
              to="/seller"
              className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
            >
              + Add New Event 
            </Link>
            <Link
              to="/seller/product-list"
              className="px-5 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
            >
              View Event List
            </Link>

            {/* Extra Dummy Buttons */}
            <button className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform">
              Analytics
            </button>
            <button className="px-5 py-2 bg-gradient-to-r from-teal-400 to-green-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform">
              Settings
            </button>
            {/* <button className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform">
              Support
            </button> */}
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;