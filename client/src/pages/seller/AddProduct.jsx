// import React, { useState, useRef } from 'react';
// import { assets, categories } from '../../assets/assets';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const AddProduct = () => {
//   const [files, setFiles] = useState([null, null, null, null]);
//   const filePreviews = useRef([null, null, null, null]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [offerPrice, setOfferPrice] = useState('');

//   const { axios } = useAppContext();

//   const onFileChange = (index, file) => {
//     if (!file) return;
//     const updatedFiles = [...files];
//     updatedFiles[index] = file;
//     setFiles(updatedFiles);
//     filePreviews.current[index] = URL.createObjectURL(file);
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const productData = {
//         name,
//         description: description.split('\n'),
//         category,
//         price,
//         offerPrice,
//       };

//       const formData = new FormData();
//       formData.append('productData', JSON.stringify(productData));
//       for (let i = 0; i < files.length; i++) {
//         formData.append('images', files[i]);
//       }

//       const { data } = await axios.post('/api/product/add', formData);

//       if (data.success) {
//         toast.success(data.message);
//         setName('');
//         setDescription('');
//         setCategory('');
//         setPrice('');
//         setOfferPrice('');
//         setFiles([null, null, null, null]);
//         filePreviews.current = [null, null, null, null];
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="relative flex-1 h-[95vh] overflow-y-scroll flex justify-center items-start py-10 bg-gradient-to-r from-gray-50 to-gray-100 no-scrollbar">
//       {/* Animated Background Blobs */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl animate-spin-slow"></div>
//       <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-300/30 rounded-full blur-3xl animate-pulse-slow"></div>

//       <form 
//         onSubmit={onSubmitHandler} 
//         className="relative md:p-10 p-6 space-y-6 max-w-xl w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl hover:shadow-3xl transition transform hover:scale-[1.02] z-10"
//       >
//         {/* Product Images */}
//         <div className="flex flex-wrap gap-3">
//           {files.map((file, index) => (
//             <label key={index} className="relative cursor-pointer group">
//               <input
//                 type="file"
//                 hidden
//                 onChange={(e) => onFileChange(index, e.target.files[0])}
//               />
//               <img
//                 src={filePreviews.current[index] || assets.upload_area}
//                 className={`w-24 h-24 object-cover rounded-xl border-2 transition-transform duration-300
//                             ${filePreviews.current[index] ? 'border-green-400 scale-105 shadow-lg animate-pulse' : 
//                             'border-gray-300 group-hover:scale-110 group-hover:shadow-lg'}`}
//                 alt="upload"
//               />
//               {filePreviews.current[index] && (
//                 <div className="absolute top-1 right-1 bg-green-500 w-4 h-4 rounded-full border border-white animate-ping"></div>
//               )}
//             </label>
//           ))}
//         </div>

//         {/* Product Name */}
//         <div className="relative">
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Product Name"
//             className="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm
//                        outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg
//                        transition duration-300 transform focus:scale-[1.01]"
//             required
//           />
//         </div>

//         {/* Product Description */}
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Product Description"
//           rows={4}
//           className="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm
//                      outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg
//                      transition duration-300 transform focus:scale-[1.01] resize-none"
//         />

//         {/* Category */}
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm
//                      outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg
//                      transition duration-300 hover:bg-green-50 hover:border-green-300 cursor-pointer"
//         >
//           <option value="">Select Category</option>
//           {categories.map((item, idx) => (
//             <option
//               key={idx}
//               value={item.path}
//               className="hover:bg-green-100 hover:text-green-700 transition duration-300"
//             >
//               {item.path}
//             </option>
//           ))}
//         </select>

//         {/* Price & Offer */}
//         <div className="flex gap-4 flex-wrap">
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             placeholder="Product Price"
//             className="w-full md:w-1/2 py-2.5 px-4 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm
//                        outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg
//                        transition duration-300 transform focus:scale-[1.01]"
//             required
//           />
//           <input
//             type="number"
//             value={offerPrice}
//             onChange={(e) => setOfferPrice(e.target.value)}
//             placeholder="Offer Price"
//             className="w-full md:w-1/2 py-2.5 px-4 rounded-xl border border-gray-300 bg-white/50 backdrop-blur-sm
//                        outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-lg
//                        transition duration-300 transform focus:scale-[1.01]"
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button 
//           type="submit" 
//           className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-xl shadow-lg
//                      hover:scale-105 hover:shadow-2xl transition transform animate-pulse"
//         >
//           ADD PRODUCT
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState, useRef } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([null, null, null, null]);
  const filePreviews = useRef([null, null, null, null]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  // 🆕 EVENT STATES
  const [totalSeats, setTotalSeats] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [location, setLocation] = useState("");

  const { axios } = useAppContext();

  const onFileChange = (index, file) => {
    if (!file) return;
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);
    filePreviews.current[index] = URL.createObjectURL(file);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,

        // 🆕 EVENT DATA
        totalSeats,
        eventDate,
        eventTime,
        location,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);

        // RESET FORM
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setTotalSeats("");
        setEventDate("");
        setEventTime("");
        setLocation("");
        setFiles([null, null, null, null]);
        filePreviews.current = [null, null, null, null];
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex-1 h-[95vh] overflow-y-scroll flex justify-center items-start py-10 bg-gradient-to-r from-gray-50 to-gray-100 no-scrollbar">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-6 space-y-5 max-w-xl w-full bg-white rounded-3xl shadow-xl"
      >
        {/* IMAGES */}
        <div className="flex flex-wrap gap-3">
          {files.map((_, index) => (
            <label key={index} className="cursor-pointer">
              <input
                type="file"
                hidden
                onChange={(e) => onFileChange(index, e.target.files[0])}
              />
              <img
                src={filePreviews.current[index] || assets.upload_area}
                className="w-24 h-24 object-cover rounded-xl border"
                alt="upload"
              />
            </label>
          ))}
        </div>

        {/* NAME */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event / Product Name"
          className="w-full input"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (one point per line)"
          rows={4}
          className="w-full input"
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full input"
          required
        >
          <option value="">Select Category</option>
          {categories.map((item, idx) => (
            <option key={idx} value={item.path}>
              {item.path}
            </option>
          ))}
        </select>

        {/* PRICE */}
        <div className="flex gap-4">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full input"
            required
          />
          <input
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            placeholder="Offer Price"
            className="w-full input"
            required
          />
        </div>

        {/* 🆕 EVENT FIELDS */}
        <input
          type="number"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          placeholder="Total Seats"
          className="w-full input"
          required
        />

        <input
          type="text"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          placeholder="Event Date (e.g. 20 Jan 2026)"
          className="w-full input"
          required
        />

        <input
          type="text"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
          placeholder="Event Time (e.g. 10 AM - 4 PM)"
          className="w-full input"
          required
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Event Location"
          className="w-full input"
          required
        />

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90"
        >
          ADD EVENT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
