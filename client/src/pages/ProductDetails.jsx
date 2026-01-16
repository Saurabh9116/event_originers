// // import React, { useEffect, useState } from "react";
// // import { useAppContext } from "../context/AppContext";
// // import { Link, useParams } from "react-router-dom";
// // import { assets } from "../assets/assets";
// // import ProductCard from "../components/ProductCard";

// // const ProductDetails = () => {
// //   const { products, navigate, currency, addToCart } = useAppContext();
// //   const { id } = useParams();
// //   const [relatedProducts, setRelatedProducts] = useState([]);
// //   const [thumbnail, setThumbnail] = useState(null);

// //   const product = products.find((item) => item._id === id);

// //   // ✅ Create audio instance only once
// //   const buttonSound = React.useMemo(() => new Audio(assets.soundFile), []);

// //   const playSound = () => {
// //     buttonSound.currentTime = 0; // reset if clicked multiple times
// //     buttonSound.play().catch((err) => console.log("Sound play error:", err));
// //   };

// //   useEffect(() => {
// //     if (products.length > 0 && product) {
// //       const related = products.filter(
// //         (item) => item.category === product.category && item._id !== product._id
// //       );
// //       setRelatedProducts(related.slice(0, 5));
// //     }
// //   }, [products, product]);

// //   useEffect(() => {
// //     setThumbnail(product?.image[0] || null);
// //   }, [product]);

// //   if (!product) return null;

// //   const discount =
// //     product.offerPrice && product.price
// //       ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
// //       : 0;

// //   return (
// //     <div className="mt-12 px-4 md:px-12">
// //       {/* Breadcrumbs */}
// //       <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1 items-center">
// //         <Link to="/" className="hover:underline">Home</Link>
// //         <span>›</span>
// //         <Link to="/products" className="hover:underline">Products</Link>
// //         <span>›</span>
// //         <Link to={`/products/${product.category.toLowerCase()}`} className="hover:underline">
// //           {product.category}
// //         </Link>
// //         <span>›</span>
// //         <span className="text-primary font-medium">{product.name}</span>
// //       </div>

// //       {/* Main Section */}
// //       <div className="flex flex-col md:flex-row gap-12">
// //         {/* Image Gallery */}
// //         <div className="flex gap-4">
// //           {/* Thumbnails */}
// //           <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
// //             {product.image.map((img, idx) => (
// //               <div
// //                 key={idx}
// //                 onClick={() => setThumbnail(img)}
// //                 className={`border rounded overflow-hidden cursor-pointer ${
// //                   thumbnail === img
// //                     ? "border-primary scale-105"
// //                     : "border-gray-300 hover:scale-105"
// //                 }`}
// //               >
// //                 <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-20 h-20 object-cover" />
// //               </div>
// //             ))}
// //           </div>

// //           {/* Main Image */}
// //           <div className="border border-gray-300 rounded overflow-hidden w-full md:w-[500px] relative">
// //             <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
// //           </div>
// //         </div>

// //         {/* Product Info */}
// //         <div className="flex-1 md:w-1/2 text-sm md:text-base">
// //           <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

// //           {/* Ratings */}
// //           <div className="flex items-center gap-1 mt-2">
// //             {Array(5).fill("").map((_, i) => (
// //               <img
// //                 key={i}
// //                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
// //                 alt="star"
// //                 className="w-5 h-5 md:w-6 md:h-6"
// //               />
// //             ))}
// //             <p className="text-gray-500 ml-2">(4 reviews)</p>
// //           </div>

// //           {/* Price Section */}
// //           <div className="mt-6 flex items-center gap-4">
// //             <p className="text-3xl md:text-4xl font-extrabold text-green-600">
// //               {currency}{product.offerPrice || product.price}
// //             </p>
// //             {product.offerPrice && product.price && (
// //               <p className="text-gray-400 line-through text-lg md:text-xl">
// //                 {currency}{product.price}
// //               </p>
// //             )}
// //             {discount > 0 && (
// //               <span className="bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded">
// //                 {discount}% OFF
// //               </span>
// //             )}
// //             <span className="text-gray-500">(Per Kg)</span>
// //           </div>

// //           {/* Description */}
// //           <div className="mt-6">
// //             <p className="text-base font-medium mb-2">Description:</p>
// //             <ul className="list-disc ml-5 text-gray-600 space-y-1">
// //               {product.description.map((desc, idx) => (
// //                 <li key={idx}>{desc}</li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Buttons */}
// //           <div className="flex flex-col sm:flex-row gap-4 mt-8">
// //             <button
// //               onClick={() => {
// //                 addToCart(product._id);
// //                 playSound(); // ✅ Play sound
// //               }}
// //               className="w-full sm:w-auto py-3 px-6 font-medium bg-gray-100 text-gray-800 rounded-lg"
// //             >
// //               Add to Cart
// //             </button>
// //             <button
// //               onClick={() => {
// //                 addToCart(product._id);
// //                 playSound(); // ✅ Play sound
// //                 navigate("/cart");
// //               }}
// //               className="w-full sm:w-auto py-3 px-6 font-medium bg-primary text-white rounded-lg"
// //             >
// //               Buy Now
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Related Products */}
// //       {relatedProducts.length > 0 && (
// //         <div className="mt-20">
// //           <h2 className="text-3xl font-bold text-center mb-6">Related Products</h2>
// //           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
// //             {relatedProducts.filter((p) => p.inStock).map((product, index) => (
// //               <ProductCard key={index} product={product} />
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       {/* Sticky Mobile Buy Bar */}
// //       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-between p-3 gap-3 shadow-lg md:hidden">
// //         <button
// //           onClick={() => {
// //             addToCart(product._id);
// //             playSound();
// //           }}
// //           className="flex-1 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg"
// //         >
// //           Add to Cart
// //         </button>
// //         <button
// //           onClick={() => {
// //             addToCart(product._id);
// //             playSound();
// //             navigate("/cart");
// //           }}
// //           className="flex-1 py-3 bg-primary text-white font-medium rounded-lg"
// //         >
// //           Buy Now
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetails;




// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/AppContext";
// import { Link, useParams } from "react-router-dom";
// import { assets } from "../assets/assets";
// import ProductCard from "../components/ProductCard";

// const ProductDetails = () => {
//   const { products, navigate, currency, addToCart } = useAppContext();
//   const { id } = useParams();
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [thumbnail, setThumbnail] = useState(null);

//   const product = products.find((item) => item._id === id);

//   const buttonSound = React.useMemo(() => new Audio(assets.soundFile), []);
//   const playSound = () => {
//     buttonSound.currentTime = 0;
//     buttonSound.play().catch((err) => console.log("Sound play error:", err));
//   };

//   useEffect(() => {
//     if (products.length > 0 && product) {
//       const related = products.filter(
//         (item) => item.category === product.category && item._id !== product._id
//       );
//       setRelatedProducts(related.slice(0, 5));
//     }
//   }, [products, product]);

//   useEffect(() => {
//     setThumbnail(product?.image[0] || null);
//   }, [product]);

//   if (!product) return null;

//   const discount =
//     product.offerPrice && product.price
//       ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
//       : 0;

//   return (
//     <div className="mt-12 px-4 md:px-12">
//       {/* Breadcrumbs */}
//       <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1 items-center">
//         <Link to="/" className="hover:underline">Home</Link>
//         <span>›</span>
//         <Link to="/products" className="hover:underline">Products</Link>
//         <span>›</span>
//         <Link to={`/products/${product.category.toLowerCase()}`} className="hover:underline">
//           {product.category}
//         </Link>
//         <span>›</span>
//         <span className="text-primary font-medium">{product.name}</span>
//       </div>

//       {/* Main Section */}
//       <div className="flex flex-col md:flex-row gap-12">
//         {/* Image Gallery */}
//         <div className="flex gap-4">
//           {/* Thumbnails */}
//           <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
//             {product.image.map((img, idx) => (
//               <div
//                 key={idx}
//                 onClick={() => setThumbnail(img)}
//                 className={`border rounded overflow-hidden cursor-pointer transition-transform duration-300 ${
//                   thumbnail === img
//                     ? "border-primary scale-105"
//                     : "border-gray-300 hover:scale-105"
//                 }`}
//               >
//                 <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-20 h-20 object-cover" />
//               </div>
//             ))}
//           </div>

//           {/* Main Image */}
//           <div className="border border-gray-300 rounded overflow-hidden w-full md:w-[500px] relative">
//             <img
//               src={thumbnail}
//               alt="Selected product"
//               className="w-full h-full object-cover transition-transform duration-300"
//             />

//             {/* Out of Stock Ribbon */}
//             {!product.inStock && (
//               <div className="absolute top-2 right-2 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-tr-md rounded-bl-md shadow-lg animate-pulse">
//                 Out of Stock
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex-1 md:w-1/2 text-sm md:text-base">
//           <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

//           {/* Ratings */}
//           <div className="flex items-center gap-1 mt-2">
//             {Array(5).fill("").map((_, i) => (
//               <img
//                 key={i}
//                 src={i < 4 ? assets.star_icon : assets.star_dull_icon}
//                 alt="star"
//                 className="w-5 h-5 md:w-6 md:h-6"
//               />
//             ))}
//             <p className="text-gray-500 ml-2">(4 reviews)</p>
//           </div>

//           {/* Price Section */}
//           <div className="mt-6 flex items-center gap-4">
//             <p className="text-3xl md:text-4xl font-extrabold text-green-600">
//               {currency}{product.offerPrice || product.price}
//             </p>
//             {product.offerPrice && product.price && (
//               <p className="text-gray-400 line-through text-lg md:text-xl">
//                 {currency}{product.price}
//               </p>
//             )}
//             {discount > 0 && (
//               <span className="bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded">
//                 {discount}% OFF
//               </span>
//             )}
//             <span className="text-gray-500">(Per Kg)</span>
//           </div>

//           {/* Description */}
//           <div className="mt-6">
//             <p className="text-base font-medium mb-2">Description:</p>
//             <ul className="list-disc ml-5 text-gray-600 space-y-1">
//               {product.description.map((desc, idx) => (
//                 <li key={idx}>{desc}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-8">
//             {product.inStock ? (
//               <button
//                 onClick={() => { addToCart(product._id); playSound(); }}
//                 className="w-full sm:w-auto py-3 px-6 font-medium bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
//               >
//                 Add to Cart
//               </button>
//             ) : (
//               <span className="w-full sm:w-auto py-3 px-6 font-medium bg-red-100 text-red-600 rounded-lg text-center">
//                 Unavailable
//               </span>
//             )}

//             {product.inStock ? (
//               <button
//                 onClick={() => { addToCart(product._id); playSound(); navigate("/cart"); }}
//                 className="w-full sm:w-auto py-3 px-6 font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition"
//               >
//                 Buy Now
//               </button>
//             ) : (
//               <span className="w-full sm:w-auto py-3 px-6 font-medium bg-red-100 text-red-600 rounded-lg text-center">
//                 Unavailable
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <div className="mt-20">
//           <h2 className="text-3xl font-bold text-center mb-6">Related Products</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {relatedProducts.map((p, index) => (
//               <ProductCard key={index} product={p} playSound={playSound} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Sticky Mobile Buy Bar */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-between p-3 gap-3 shadow-lg md:hidden">
//         {product.inStock ? (
//           <>
//             <button
//               onClick={() => { addToCart(product._id); playSound(); }}
//               className="flex-1 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => { addToCart(product._id); playSound(); navigate("/cart"); }}
//               className="flex-1 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition"
//             >
//               Buy Now
//             </button>
//           </>
//         ) : (
//           <span className="flex-1 py-3 text-center bg-red-100 text-red-600 font-medium rounded-lg">
//             Unavailable
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  if (!product) return null;

  // ================= EVENT SAFE VALUES =================
  const totalSeats = product.totalSeats || 100;
  const bookedSeats = product.bookedSeats || 0;
  const availableSeats = totalSeats - bookedSeats;
  const seatsPercent = Math.round((bookedSeats / totalSeats) * 100);
  const isSoldOut = availableSeats <= 0 || !product.inStock;

  // ================= SOUND =================
  const buttonSound = React.useMemo(() => new Audio(assets.soundFile), []);
  const playSound = () => {
    buttonSound.currentTime = 0;
    buttonSound.play().catch(() => {});
  };

  // ================= RELATED =================
  useEffect(() => {
    const related = products.filter(
      (item) => item.category === product.category && item._id !== product._id
    );
    setRelatedProducts(related.slice(0, 5));
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product.image[0]);
  }, [product]);

  const discount =
    product.offerPrice && product.price
      ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
      : 0;

  return (
    <div className="mt-12 px-4 md:px-12">
      {/* ================= BREADCRUMB ================= */}
      <div className="text-sm text-gray-500 mb-6 flex flex-wrap gap-1">
        <Link to="/" className="hover:underline">Home</Link>
        <span>›</span>
        <Link to="/products" className="hover:underline">Products</Link>
        <span>›</span>
        <span className="text-primary font-medium">{product.name}</span>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* ================= IMAGE ================= */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
            {product.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setThumbnail(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                  thumbnail === img ? "border-primary scale-105" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="relative border rounded w-full md:w-[500px]">
            <img src={thumbnail} className="w-full h-full object-cover" />

            {isSoldOut && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <span className="text-red-600 font-bold text-lg">
                  Bookings Closed
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ================= INFO ================= */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill("").map((_, i) => (
              <img
                key={i}
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                className="w-5"
              />
            ))}
            <span className="text-gray-500 ml-2">(4 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-3xl font-bold text-green-600">
              {currency}{product.offerPrice || product.price}
            </p>
            {product.offerPrice && (
              <p className="line-through text-gray-400">
                {currency}{product.price}
              </p>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* ================= EVENT INFO ================= */}
          <div className="mt-4 space-y-1 text-gray-700">
            <p>📅 <b>Date:</b> {product.eventDate || "20 Jan 2026"}</p>
            <p>⏰ <b>Time:</b> {product.eventTime || "10 AM - 4 PM"}</p>
            <p>📍 <b>Location:</b> {product.location || "City Hospital"}</p>
            <p>🎟 <b>Available Seats:</b> {availableSeats}/{totalSeats}</p>
          </div>

          {/* ================= SEATS BAR ================= */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Seats Filled</span>
              <span>{seatsPercent}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${seatsPercent}%` }}
              />
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="mt-6">
            <p className="font-medium mb-2">Description</p>
            <ul className="list-disc ml-5 text-gray-600 space-y-1">
              {product.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex gap-4 mt-8">
            {!isSoldOut ? (
              <>
                <button
                  onClick={() => { addToCart(product._id); playSound(); }}
                  className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => {
                    addToCart(product._id);
                    playSound();
                    navigate("/cart");
                  }}
                  className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90"
                >
                  🎟 Book Now
                </button>
              </>
            ) : (
              <span className="px-6 py-3 bg-red-100 text-red-600 rounded-lg">
                Sold Out
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ================= RELATED ================= */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-6">
            Related Events
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map((p, i) => (
              <ProductCard key={i} product={p} playSound={playSound} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
