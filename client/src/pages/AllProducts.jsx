// import { useEffect, useState, useMemo } from "react";
// import { useAppContext } from "../context/AppContext";
// import ProductCard from "../components/ProductCard";
// import { assets } from "../assets/assets";

// const AllProducts = () => {
//   const { products, searchQuery } = useAppContext();
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // ✅ Create audio only once
//   const buttonSound = useMemo(() => new Audio(assets.soundFile), []);

//   const playSound = () => {
//     buttonSound.currentTime = 0;
//     buttonSound.play().catch((err) => console.log("Sound play error:", err));
//   };

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       setFilteredProducts(
//         products.filter((product) =>
//           product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [products, searchQuery]);

//   return (
//     <div className="mt-16 flex flex-col">
//       {/* Header */}
//       <div className="flex flex-col items-end w-max mx-auto md:mx-0">
//         <p className="text-2xl font-bold uppercase tracking-wide text-gray-800">
//           All Products
//         </p>
//         <div className="w-20 h-1 bg-primary rounded-full mt-1"></div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:grid-cols-5 mt-8">
//         {filteredProducts
//           .filter((product) => product.inStock)
//           .map((product, index) => (
//             <div
//               key={index}
//               className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl bg-white p-2"
//             >
//               {/* ✅ Pass playSound to ProductCard */}
//               <ProductCard product={product} playSound={playSound} />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;



import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { assets } from "../assets/assets";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ Create audio only once
  const buttonSound = useMemo(() => new Audio(assets.soundFile), []);

  const playSound = () => {
    buttonSound.currentTime = 0;
    buttonSound.play().catch((err) => console.log("Sound play error:", err));
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-end w-max mx-auto md:mx-0">
        <p className="text-2xl font-bold uppercase tracking-wide text-gray-800">
          All Events
        </p>
        <div className="w-20 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 lg:grid-cols-5 mt-8">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl bg-white p-2"
          >
            {/* ✅ Pass playSound to ProductCard */}
            <ProductCard product={product} playSound={playSound} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
