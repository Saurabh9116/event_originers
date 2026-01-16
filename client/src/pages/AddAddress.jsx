import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <div className="relative w-full">
    <input
      className="peer w-full px-3 pt-5 pb-2 border border-gray-300 rounded-lg outline-none text-gray-700
                 bg-white/50 backdrop-blur-sm focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg
                 transition duration-300"
      type={type}
      placeholder=" "
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
    <label className="absolute left-3 top-2 text-gray-400 text-sm transition-all 
                      peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                      peer-focus:top-2 peer-focus:text-primary peer-focus:text-sm">
      {placeholder}
    </label>
  </div>
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address });
      if (data.success) {
        toast.success(data.message, { position: 'bottom-right' });
        navigate('/cart');
      } else {
        toast.error(data.message, { position: 'bottom-right' });
      }
    } catch (error) {
      toast.error(error.message, { position: 'bottom-right' });
    }
  };

  useEffect(() => {
    if (!user) navigate('/cart');
  }, []);

  return (
    <div className="relative mt-16 pb-16 px-4 md:px-12 bg-gradient-to-r from-gray-50 to-gray-100 overflow-hidden">
      {/* Page Title */}
      <p className="text-2xl md:text-3xl text-gray-500 font-medium text-center md:text-left mb-8">
        Add Shipping <span className="font-bold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">
        {/* Left Form */}
        <div className="flex-1 max-w-lg bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition transform hover:scale-[1.02]">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name"/>
              <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name"/>
            </div>

            <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address"/>
            <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street"/>

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="City"/>
              <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zip Code"/>
              <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country"/>
            </div>

            <InputField handleChange={handleChange} address={address} name="phone" type="text" placeholder="Phone"/>

            <button className="w-full mt-6 bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-xl shadow-lg
                               hover:scale-105 hover:shadow-2xl transition transform font-bold animate-pulse">
              Save Address
            </button>
          </form>
        </div>

        {/* Right Side - Hero Image + Animated Shapes */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center">
          {/* Blobs / Gradient Shapes */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-purple-400/30 rounded-full blur-3xl animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400/30 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-20 right-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-300/20 rounded-full blur-3xl animate-spin-slower -translate-x-1/2 -translate-y-1/2"></div>

          {/* Glowing halo */}
          <div className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-20 blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

          {/* Image */}
          <img
            className="relative z-10 rounded-2xl shadow-2xl transform transition-transform duration-700 hover:scale-110 animate-float-slow"
            src={assets.add_address_iamge}
            alt="Add Address"
          />

          {/* Tagline */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold px-6 py-2 rounded-full text-lg shadow-lg animate-pulse">
            Fast & Secure Delivery
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
