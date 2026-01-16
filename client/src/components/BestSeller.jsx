// import React, { useMemo } from 'react';
// import ProductCard from './ProductCard';
// import { useAppContext } from '../context/AppContext';
// import { Link } from 'react-router-dom';
// import { assets } from '../assets/assets';

// const BestSeller = () => {
//   const { products } = useAppContext();

//   // Get in-stock products and limit to exactly 5
//   const bestSellers = products.filter((product) => product.inStock).slice(0, 5);

//   // Create audio only once
//   const buttonSound = useMemo(() => new Audio(assets.soundFile), []);
//   const playSound = () => {
//     buttonSound.currentTime = 0;
//     buttonSound.play().catch((err) => console.log("Sound play error:", err));
//   };

//   return (
//     <div className="mt-20 relative">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <p className="text-2xl md:text-3xl font-bold text-emerald-500 relative inline-block">
//             👥 Most Booked Events.
//             <span className="absolute -bottom-1 left-0 w-2/3 h-[3px] bg-emerald-500 rounded-full"></span>
//           </p>

//           <p className="text-sm md:text-base text-gray-500 mt-2">
//             Most trusted and trending health events this week
//           </p>
//         </div>

//         <Link
//           to="/products"
//           className="hidden md:inline-block px-5 py-2 text-sm bg-primary text-white rounded-lg shadow hover:scale-105 hover:bg-primary/90 transition transform"
//         >
//           View All
//         </Link>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
//         {bestSellers.map((product, index) => (
//           <div
//             key={index}
//             className="relative rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-600/40"
//           >
//             {/* Badge */}
//             <span className="absolute top-2 left-2 bg-emerald-500 text-xs font-bold text-white px-2 py-1 rounded-full z-10 animate-pulse">
//               Best
//             </span>

//             <ProductCard product={product} playSound={playSound} />
//           </div>
//         ))}
//       </div>

//       {/* Mobile View All Button */}
//       <div className="flex justify-center mt-10 md:hidden">
//         <Link
//           to="/products"
//           className="px-5 py-2 text-sm bg-primary text-white rounded-lg shadow hover:scale-105 hover:bg-primary/90 transition transform"
//         >
//           View All
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BestSeller;




import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const BestSeller = () => {
  const { products } = useAppContext();

  // Get in-stock products and limit to exactly 5
  const bestSellers = products.filter((product) => product.inStock).slice(0, 5);

  // Create audio only once
  const buttonSound = useMemo(() => new Audio(assets.soundFile), []);
  const playSound = () => {
    buttonSound.currentTime = 0;
    buttonSound.play().catch((err) => console.log("Sound play error:", err));
  };

  return (
    <div className="mt-20 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-2xl md:text-3xl font-bold text-emerald-500 relative inline-block">
            👥 Most Booked Events
            <span className="absolute -bottom-1 left-0 w-2/3 h-[3px] bg-emerald-500 rounded-full"></span>
          </p>

          <p className="text-sm md:text-base text-gray-500 mt-2">
            Most trusted and trending health events this week
          </p>
        </div>

        <Link
          to="/products"
          className="hidden md:inline-block px-5 py-2 text-sm bg-primary text-white rounded-lg shadow hover:scale-105 hover:bg-primary/90 transition transform"
        >
          View All
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {bestSellers.map((product, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-600/40"
          >
            {/* ❌ Best badge removed */}

            <ProductCard product={product} playSound={playSound} />
          </div>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="flex justify-center mt-10 md:hidden">
        <Link
          to="/products"
          className="px-5 py-2 text-sm bg-primary text-white rounded-lg shadow hover:scale-105 hover:bg-primary/90 transition transform"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default BestSeller;
