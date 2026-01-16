import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams, Link } from "react-router-dom";
import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16 px-4">
      {/* Category Header */}
      {searchCategory && (
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide">
            {searchCategory.text.toUpperCase()}{" "}
            <span className="ml-2">🌟</span>
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
          <p className="text-gray-500 mt-3 text-lg">
           Explore upcoming {searchCategory.text.toLowerCase()} carefully organized just for you.

          </p>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="transform transition duration-300 hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Products"
            className="w-40 mb-6 opacity-80"
          />
          <p className="text-2xl font-semibold text-gray-600 mb-4">
          No events found in this category.
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow hover:bg-primary/90 transition"
          >
            Browse All Events
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;

