// // // import React from "react";
// // // import { assets } from "../assets/assets";
// // // import { useAppContext } from "../context/AppContext";

// // // const ProductCard = ({ product, playSound }) => {
// // //   const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

// // //   return (
// // //     product && (
// // //       <div
// // //         onClick={() => {
// // //           navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
// // //           scrollTo(0, 0);
// // //         }}
// // //         className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-40 sm:min-w-44 md:min-w-56 max-w-56 w-full"
// // //       >
// // //         {/* ✅ Image */}
// // //         <div className="group cursor-pointer flex items-center justify-center px-2">
// // //           <img
// // //             className="group-hover:scale-105 transition max-w-20 sm:max-w-24 md:max-w-36"
// // //             src={product.image[0]}
// // //             alt={product.name}
// // //           />
// // //         </div>

// // //         {/* ✅ Info */}
// // //         <div className="text-gray-500/60 text-sm">
// // //           <p>{product.category}</p>
// // //           <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">
// // //             {product.name}
// // //           </p>

// // //           {/* Stars */}
// // //           <div className="flex items-center gap-0.5">
// // //             {Array(5)
// // //               .fill("")
// // //               .map((_, i) => (
// // //                 <img
// // //                   key={i}
// // //                   className="w-3 sm:w-3.5"
// // //                   src={i < 4 ? assets.star_icon : assets.star_dull_icon}
// // //                   alt=""
// // //                 />
// // //               ))}
// // //             <p className="text-xs sm:text-sm">(4)</p>
// // //           </div>

// // //           {/* ✅ Price + Cart Actions */}
// // //           <div className="flex items-end justify-between mt-3">
// // //             <p className="text-sm sm:text-base md:text-xl font-medium text-primary">
// // //               {currency}
// // //               {product.offerPrice}{" "}
// // //               <span className="text-gray-500/60 text-xs sm:text-sm md:text-base line-through">
// // //                 {currency}
// // //                 {product.price}
// // //               </span>
// // //             </p>

// // //             <div
// // //               onClick={(e) => {
// // //                 e.stopPropagation();
// // //               }}
// // //               className="text-primary"
// // //             >
// // //               {!cartItems[product._id] ? (
// // //                 // ✅ Mobile smaller, desktop normal
// // //                 <button
// // //                   className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[58px] sm:w-[64px] md:w-[80px] h-[30px] sm:h-[34px] rounded cursor-pointer text-xs sm:text-sm"
// // //                   onClick={() => {
// // //                     addToCart(product._id);
// // //                     playSound && playSound(); // 🔊 Play sound
// // //                   }}
// // //                 >
// // //                   <img src={assets.cart_icon} alt="cart_icon" className="w-3.5 sm:w-4" />
// // //                   Add
// // //                 </button>
// // //               ) : (
// // //                 <div className="flex items-center justify-center gap-2 w-[58px] sm:w-[64px] md:w-20 h-[30px] sm:h-[34px] bg-primary/25 rounded select-none text-xs sm:text-sm">
// // //                   <button
// // //                     onClick={() => {
// // //                       removeFromCart(product._id);
// // //                       playSound && playSound(); // 🔊 Play sound
// // //                     }}
// // //                     className="cursor-pointer text-md px-2 h-full"
// // //                   >
// // //                     -
// // //                   </button>
// // //                   <span className="w-4 sm:w-5 text-center">{cartItems[product._id]}</span>
// // //                   <button
// // //                     onClick={() => {
// // //                       addToCart(product._id);
// // //                       playSound && playSound(); // 🔊 Play sound
// // //                     }}
// // //                     className="cursor-pointer text-md px-2 h-full"
// // //                   >
// // //                     +
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   );
// // // };

// // // export default ProductCard;


// // import React from "react";
// // import { assets } from "../assets/assets";
// // import { useAppContext } from "../context/AppContext";

// // const ProductCard = ({ product, playSound }) => {
// //   const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

// //   if (!product) return null;

// //   return (
// //     <div
// //       onClick={() => {
// //         navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
// //         scrollTo(0, 0);
// //       }}
// //       className="relative border border-gray-300 rounded-md md:px-4 px-3 py-2 bg-white min-w-40 sm:min-w-44 md:min-w-56 max-w-56 w-full cursor-pointer"
// //     >
// //       {/* Product Image */}
// //       <div className="flex items-center justify-center px-2 relative">
// //         <img
// //           className="max-w-20 sm:max-w-24 md:max-w-36 rounded"
// //           src={product.image[0]}
// //           alt={product.name}
// //         />

// //         {/* Out of Stock Overlay */}
// //         {!product.inStock && (
// //           <div className="absolute inset-0 bg-white/40 flex items-center justify-center rounded">
// //             <span className="text-red-600 font-bold uppercase text-sm sm:text-base">
// //             Bookings Closed
// //             </span>
// //           </div>
// //         )}
// //       </div>

// //       {/* Product Info */}
// //       <div className="text-gray-500/60 text-sm mt-2">
// //         <p>{product.category}</p>
// //         <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">
// //           {product.name}
// //         </p>

// //         {/* Star Rating */}
// //         <div className="flex items-center gap-0.5 mt-1">
// //           {Array(5)
// //             .fill("")
// //             .map((_, i) => (
// //               <img
// //                 key={i}
// //                 className="w-3 sm:w-3.5"
// //                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
// //                 alt=""
// //               />
// //             ))}
// //           <p className="text-xs sm:text-sm">(4)</p>
// //         </div>

// //         {/* Price & Cart */}
// //         <div className="flex items-end justify-between mt-3">
// //           <p className="text-sm sm:text-base md:text-xl font-medium text-primary">
// //             {currency}
// //             {product.offerPrice}{" "}
// //             <span className="text-gray-500/60 text-xs sm:text-sm md:text-base line-through">
// //               {currency}
// //               {product.price}
// //             </span>
// //           </p>

// //           <div onClick={(e) => e.stopPropagation()} className="text-primary">
// //             {!product.inStock ? (
// //               <span className="px-2 py-1 bg-red-100 text-red-600 font-semibold rounded text-xs sm:text-sm select-none">
// //                 Unavailable
// //               </span>
// //             ) : !cartItems[product._id] ? (
// //               <button
// //                 className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-[58px] sm:w-[64px] md:w-[80px] h-[30px] sm:h-[34px] rounded text-xs sm:text-sm cursor-pointer"
// //                 onClick={() => {
// //                   addToCart(product._id);
// //                   playSound && playSound();
// //                 }}
// //               >
// //                 <img src={assets.cart_icon} alt="cart_icon" className="w-3.5 sm:w-4" />
// //                 Book Now
// //               </button>
// //             ) : (
// //               <div className="flex items-center justify-center gap-2 w-[58px] sm:w-[64px] md:w-20 h-[30px] sm:h-[34px] bg-primary/25 rounded select-none text-xs sm:text-sm">
// //                 <button
// //                   onClick={() => removeFromCart(product._id)}
// //                   className="cursor-pointer text-md px-2 h-full"
// //                 >
// //                   -
// //                 </button>
// //                 <span className="w-4 sm:w-5 text-center">{cartItems[product._id]}</span>
// //                 <button
// //                   onClick={() => addToCart(product._id)}
// //                   className="cursor-pointer text-md px-2 h-full"
// //                 >
// //                   +
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;




















// // import React from "react";
// // import { assets } from "../assets/assets";
// // import { useAppContext } from "../context/AppContext";

// // const ProductCard = ({ product, playSound }) => {
// //   const { currency, addToCart, removeFromCart, cartItems, navigate } =
// //     useAppContext();

// //   if (!product) return null;

// //   // ✅ Safe event-related values (NO backend break)
// //   const totalSeats = product.totalSeats || 100;
// //   const bookedSeats = product.bookedSeats || 0;
// //   const availableSeats = totalSeats - bookedSeats;
// //   const seatsPercent = Math.round((bookedSeats / totalSeats) * 100);

// //   return (
// //     <div
// //       onClick={() => {
// //         navigate(
// //           `/products/${product.category.toLowerCase()}/${product._id}`
// //         );
// //         scrollTo(0, 0);
// //       }}
// //       className="relative border border-gray-300 rounded-md md:px-4 px-3 py-2 bg-white min-w-40 sm:min-w-44 md:min-w-56 max-w-56 w-full cursor-pointer hover:shadow-lg transition"
// //     >
// //       {/* ================= IMAGE SECTION ================= */}
// //       <div className="flex items-center justify-center px-2 relative group">
// //         <img
// //           className="max-w-20 sm:max-w-24 md:max-w-36 rounded transition-transform duration-300 group-hover:scale-105"
// //           src={product.image[0]}
// //           alt={product.name}
// //         />

// //         {/* Seats Badge */}
// //         <div className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
// //           🎟 {availableSeats}/{totalSeats}
// //         </div>

// //         {/* Hover Overlay */}
// //         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded">
// //           <span className="text-white text-xs font-semibold">
// //             View Details →
// //           </span>
// //         </div>

// //         {/* Bookings Closed */}
// //         {!product.inStock && (
// //           <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded">
// //             <span className="text-red-600 font-bold uppercase text-sm">
// //               Bookings Closed
// //             </span>
// //           </div>
// //         )}
// //       </div>

// //       {/* ================= INFO SECTION ================= */}
// //       <div className="text-gray-500/60 text-sm mt-2">
// //         <p>{product.category}</p>

// //         <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">
// //           {product.name}
// //         </p>

// //         {/* Event Date & Time */}
// //         <p className="text-xs sm:text-sm text-gray-600 mt-1">
// //           📅 {product.eventDate || "20 Jan 2026"} | ⏰{" "}
// //           {product.eventTime || "10 AM - 4 PM"}
// //         </p>

// //         {/* Location */}
// //         <p className="text-xs sm:text-sm text-gray-600 truncate">
// //           📍 {product.location || "City Hospital"}
// //         </p>

// //         {/* Star Rating */}
// //         <div className="flex items-center gap-0.5 mt-1">
// //           {Array(5)
// //             .fill("")
// //             .map((_, i) => (
// //               <img
// //                 key={i}
// //                 className="w-3 sm:w-3.5"
// //                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
// //                 alt=""
// //               />
// //             ))}
// //           <p className="text-xs sm:text-sm">(4)</p>
// //         </div>

// //         {/* Seats Progress */}
// //         <div className="mt-2">
// //           <div className="flex justify-between text-[11px] text-gray-600 mb-1">
// //             <span>Seats Filled</span>
// //             <span>{seatsPercent}%</span>
// //           </div>

// //           <div className="w-full h-2 bg-gray-200 rounded-full">
// //             <div
// //               className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
// //               style={{ width: `${seatsPercent}%` }}
// //             ></div>
// //           </div>
// //         </div>

// //         {/* ================= PRICE & BOOKING ================= */}
// //         <div className="flex items-end justify-between mt-3">
// //           <p className="text-sm sm:text-base md:text-xl font-medium text-primary">
// //             {currency}
// //             {product.offerPrice}{" "}
// //             <span className="text-gray-500/60 text-xs sm:text-sm md:text-base line-through">
// //               {currency}
// //               {product.price}
// //             </span>
// //           </p>

// //           <div onClick={(e) => e.stopPropagation()}>
// //             {!product.inStock ? (
// //               <span className="px-3 py-1 bg-red-100 text-red-600 font-semibold rounded-full text-xs">
// //                 Sold Out
// //               </span>
// //             ) : !cartItems[product._id] ? (
// //               <button
// //                 className="flex items-center justify-center gap-1
// //                 bg-gradient-to-r from-blue-600 to-indigo-600
// //                 hover:from-indigo-700 hover:to-blue-700
// //                 text-white font-semibold
// //                 w-[90px] sm:w-[100px] md:w-[120px]
// //                 h-[32px] sm:h-[36px]
// //                 rounded-full text-xs sm:text-sm
// //                 shadow-md transition-all duration-300"
// //                 onClick={() => {
// //                   addToCart(product._id);
// //                   playSound && playSound();
// //                 }}
// //               >
// //                 🎟 Book Now
// //               </button>
// //             ) : (
// //               <div className="flex items-center justify-center gap-2 w-[90px] sm:w-[100px] md:w-[120px] h-[32px] sm:h-[36px] bg-primary/25 rounded-full select-none text-xs sm:text-sm">
// //                 <button
// //                   onClick={() => removeFromCart(product._id)}
// //                   className="cursor-pointer px-2"
// //                 >
// //                   −
// //                 </button>
// //                 <span>{cartItems[product._id]}</span>
// //                 <button
// //                   onClick={() => addToCart(product._id)}
// //                   className="cursor-pointer px-2"
// //                 >
// //                   +
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;


// import React from "react";
// // import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const ProductCard = ({ product, playSound }) => {
//   const { currency, addToCart, removeFromCart, cartItems, navigate } =
//     useAppContext();

//   if (!product) return null;

//   // ✅ Safe event-related values (NO backend break)
//   const totalSeats = product.totalSeats || 100;
//   const bookedSeats = product.bookedSeats || 0;
//   const availableSeats = totalSeats - bookedSeats;
//   const seatsPercent = Math.round((bookedSeats / totalSeats) * 100);

//   return (
//     <div
//       onClick={() => {
//         navigate(
//           `/products/${product.category.toLowerCase()}/${product._id}`
//         );
//         scrollTo(0, 0);
//       }}
//       className="relative border border-gray-300 rounded-md md:px-4 px-3 py-2 bg-white min-w-40 sm:min-w-44 md:min-w-56 max-w-56 w-full cursor-pointer hover:shadow-lg transition"
//     >
//       {/* ================= IMAGE SECTION ================= */}
//       <div className="flex items-center justify-center px-2 relative group">
//         <img
//           className="max-w-20 sm:max-w-24 md:max-w-36 rounded transition-transform duration-300 group-hover:scale-105"
//           src={product.image[0]}
//           alt={product.name}
//         />

//         {/* Seats Badge */}
//         <div className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
//           🎟 {availableSeats}/{totalSeats}
//         </div>

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded">
//           <span className="text-white text-xs font-semibold">
//             View Details →
//           </span>
//         </div>

//         {/* Bookings Closed */}
//         {!product.inStock && (
//           <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded">
//             <span className="text-red-600 font-bold uppercase text-sm">
//               Bookings Closed
//             </span>
//           </div>
//         )}
//       </div>

//       {/* ================= INFO SECTION ================= */}
//       <div className="text-gray-500/60 text-sm mt-2">
//         <p>{product.category}</p>

//         <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">
//           {product.name}
//         </p>

//         {/* Event Date & Time */}
//         <p className="text-xs sm:text-sm text-gray-600 mt-1">
//           📅 {product.eventDate || "20 Jan 2026"} | ⏰{" "}
//           {product.eventTime || "10 AM - 4 PM"}
//         </p>

//         {/* Location */}
//         <p className="text-xs sm:text-sm text-gray-600 truncate">
//           📍 {product.location || "City Hospital"}
//         </p>

//         {/* ⭐ Star Rating REMOVED (Best removed) */}

//         {/* Seats Progress */}
//         <div className="mt-2">
//           <div className="flex justify-between text-[11px] text-gray-600 mb-1">
//             <span>Seats Filled</span>
//             <span>{seatsPercent}%</span>
//           </div>

//           <div className="w-full h-2 bg-gray-200 rounded-full">
//             <div
//               className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
//               style={{ width: `${seatsPercent}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* ================= PRICE & BOOKING ================= */}
//         <div className="flex items-end justify-between mt-3">
//           <p className="text-sm sm:text-base md:text-xl font-medium text-primary">
//             {currency}
//             {product.offerPrice}{" "}
//             <span className="text-gray-500/60 text-xs sm:text-sm md:text-base line-through">
//               {currency}
//               {product.price}
//             </span>
//           </p>

//           <div onClick={(e) => e.stopPropagation()}>
//             {!product.inStock ? (
//               <span className="px-3 py-1 bg-red-100 text-red-600 font-semibold rounded-full text-xs">
//                 Sold Out
//               </span>
//             ) : !cartItems[product._id] ? (
//               <button
//                 className="flex items-center justify-center gap-1
//                 bg-gradient-to-r from-blue-600 to-indigo-600
//                 hover:from-indigo-700 hover:to-blue-700
//                 text-white font-semibold
//                 w-[90px] sm:w-[100px] md:w-[120px]
//                 h-[32px] sm:h-[36px]
//                 rounded-full text-xs sm:text-sm
//                 shadow-md transition-all duration-300"
//                 onClick={() => {
//                   addToCart(product._id);
//                   playSound && playSound();
//                 }}
//               >
//                 🎟 Book Now
//               </button>
//             ) : (
//               <div className="flex items-center justify-center gap-2 w-[90px] sm:w-[100px] md:w-[120px] h-[32px] sm:h-[36px] bg-primary/25 rounded-full select-none text-xs sm:text-sm">
//                 <button
//                   onClick={() => removeFromCart(product._id)}
//                   className="cursor-pointer px-2"
//                 >
//                   −
//                 </button>
//                 <span>{cartItems[product._id]}</span>
//                 <button
//                   onClick={() => addToCart(product._id)}
//                   className="cursor-pointer px-2"
//                 >
//                   +
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product, playSound }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  if (!product) return null;

  // ✅ Safe event-related values (NO backend break)
  const totalSeats = product.totalSeats || 100;
  const bookedSeats = product.bookedSeats || 0;
  const availableSeats = totalSeats - bookedSeats;
  const seatsPercent = Math.round((bookedSeats / totalSeats) * 100);

  return (
    <div
      onClick={() => {
        navigate(
          `/products/${product.category.toLowerCase()}/${product._id}`
        );
        scrollTo(0, 0);
      }}
      className="relative border border-gray-300 rounded-md md:px-4 px-3 py-2 bg-white min-w-40 sm:min-w-44 md:min-w-56 max-w-56 w-full cursor-pointer hover:shadow-lg transition"
    >
      {/* ================= IMAGE SECTION ================= */}
      <div className="flex items-center justify-center px-2 relative group">
        <img
          className="max-w-20 sm:max-w-24 md:max-w-36 rounded transition-transform duration-300 group-hover:scale-105"
          src={product.image[0]}
          alt={product.name}
        />

        {/* Seats Badge (GREEN) */}
        <div className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
          🎟 {availableSeats}/{totalSeats}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded">
          <span className="text-white text-xs font-semibold">
            View Details →
          </span>
        </div>

        {/* Bookings Closed */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded">
            <span className="text-red-600 font-bold uppercase text-sm">
              Bookings Closed
            </span>
          </div>
        )}
      </div>

      {/* ================= INFO SECTION ================= */}
      <div className="text-gray-500/60 text-sm mt-2">
        <p>{product.category}</p>

        <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg truncate w-full">
          {product.name}
        </p>

        {/* Event Date & Time */}
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
          📅 {product.eventDate || "20 Jan 2026"} | ⏰{" "}
          {product.eventTime || "10 AM - 4 PM"}
        </p>

        {/* Location */}
        <p className="text-xs sm:text-sm text-gray-600 truncate">
          📍 {product.location || "City Hospital"}
        </p>

        {/* Seats Progress (GREEN) */}
        <div className="mt-2">
          <div className="flex justify-between text-[11px] text-gray-600 mb-1">
            <span>Seats Filled</span>
            <span>{seatsPercent}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
              style={{ width: `${seatsPercent}%` }}
            ></div>
          </div>
        </div>

        {/* ================= PRICE & BOOKING ================= */}
        <div className="flex items-end justify-between mt-3">
          <p className="text-sm sm:text-base md:text-xl font-medium text-primary">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-gray-500/60 text-xs sm:text-sm md:text-base line-through">
              {currency}
              {product.price}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()}>
            {!product.inStock ? (
              <span className="px-3 py-1 bg-red-100 text-red-600 font-semibold rounded-full text-xs">
                Sold Out
              </span>
            ) : !cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1
                bg-gradient-to-r from-emerald-600 to-green-600
                hover:from-green-700 hover:to-emerald-700
                text-white font-semibold
                w-[90px] sm:w-[100px] md:w-[120px]
                h-[32px] sm:h-[36px]
                rounded-full text-xs sm:text-sm
                shadow-md transition-all duration-300"
                onClick={() => {
                  addToCart(product._id);
                  playSound && playSound();
                }}
              >
                🎟 Book Now
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-[90px] sm:w-[100px] md:w-[120px] h-[32px] sm:h-[36px] bg-emerald-100 rounded-full select-none text-xs sm:text-sm">
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="cursor-pointer px-2 text-emerald-700"
                >
                  −
                </button>
                <span className="text-emerald-800">
                  {cartItems[product._id]}
                </span>
                <button
                  onClick={() => addToCart(product._id)}
                  className="cursor-pointer px-2 text-emerald-700"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
