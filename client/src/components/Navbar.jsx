import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios
  } = useAppContext();

  const dropdownRef = useRef();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout');
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      navigate('/products');
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserMenu(false);
        setContactOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 border-b bg-white z-50">

      <NavLink to="/" className="text-2xl md:text-3xl font-extrabold text-primary">
        Hospital Event Organizers
      </NavLink>

      <div className="hidden sm:flex items-center gap-6">

        <NavLink to="/">Home</NavLink>

        {/* SERVICES */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setServicesOpen(p => !p)}>Services</button>
          {servicesOpen && (
            <div className="absolute top-8 left-0 bg-white border shadow-lg rounded-md w-64 text-sm">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100">Medical Camp Organization</li>
                <li className="px-4 py-2 hover:bg-gray-100">Health Awareness Programs</li>
                <li className="px-4 py-2 hover:bg-gray-100">Blood Donation Camps</li>
                <li className="px-4 py-2 hover:bg-gray-100">Hospital Inauguration Events</li>
                <li className="px-4 py-2 hover:bg-gray-100">Doctor Conference & CME Events</li>
              </ul>
            </div>
          )}
        </div>

        <button onClick={() => navigate("/products")}>Events</button>

        {/* CONTACT */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setContactOpen(p => !p)}>Contact</button>
          {contactOpen && (
            <div className="absolute top-8 right-0 bg-white border shadow-lg rounded-md w-80 p-4 text-sm space-y-2">
              <p><strong>Email:</strong> admin@swasthyachetna.com</p>
              <p><strong>Phone:</strong> +91 99242 09736</p>
              <p className="text-xs text-gray-600">
                1 Kanha Bunglows, Maneja, Vadodara, Gujarat
              </p>
            </div>
          )}
        </div>

        {/* SEARCH */}
        <div className="hidden lg:flex items-center gap-2 border px-3 rounded-full">
          <input
            type="text"
            placeholder="Search events"
            className="py-1.5 bg-transparent outline-none text-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={assets.search_icon} className="w-4 h-4" />
        </div>

        {/* BOOK EVENT */}
        <button
          onClick={() => navigate("/cart")}
          className="relative px-6 py-2 bg-primary text-white rounded-full"
        >
          Book Event
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          )}
        </button>

        {/* USER */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-primary text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <img
              src={assets.profile_icon}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowUserMenu(p => !p)}
              alt="user"
            />

            {showUserMenu && (
              <div className="absolute top-12 right-0 bg-white border rounded-xl shadow-lg w-56">
                <ul className="text-sm">

                  {/* ✅ MY PROFILE → SHOW DETAILS */}
                  <li
                    onClick={() => {
                      setShowProfileInfo(true);
                      setShowUserMenu(false);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Profile
                  </li>

                  <li
                    onClick={() => navigate("/my-orders")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Bookings
                  </li>
                </ul>

                <div className="border-t p-2">
                  <button
                    onClick={logout}
                    className="w-full py-2 bg-red-500 text-white rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PROFILE DETAILS MODAL */}
      {showProfileInfo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-96 p-6 relative">
            <button
              onClick={() => setShowProfileInfo(false)}
              className="absolute top-3 right-3 text-gray-500 text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-primary">
              My Profile
            </h2>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {user?.name || "N/A"}</p>
              <p><strong>Email:</strong> {user?.email || "N/A"}</p>
              <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
              <p><strong>Role:</strong> {user?.role || "User"}</p>
            </div>

            <button
              onClick={() => setShowProfileInfo(false)}
              className="mt-5 w-full bg-primary text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
