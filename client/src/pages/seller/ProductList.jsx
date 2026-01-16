// import React, { useState } from "react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const ProductList = () => {
//   const { products, currency, axios, fetchProducts } = useAppContext();
//   const [editingPrice, setEditingPrice] = useState({});
//   const [newPrice, setNewPrice] = useState({});

//   const toggleStock = async (id, inStock) => {
//     try {
//       const { data } = await axios.post("/api/product/stock", { id, inStock });
//       if (data.success) {
//         fetchProducts();
//         toast.success(data.message);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   // ✅ Save new price
//   const savePrice = async (id) => {
//     try {
//       const { data } = await axios.put(`/api/product/${id}`, { price: newPrice[id] });
//       if (data.success) {
//         toast.success("Price updated successfully!");
//         fetchProducts();
//         setEditingPrice((prev) => ({ ...prev, [id]: false }));
//       } else {
//         toast.error(data.message || "Failed to update price");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-gray-50">
//       <div className="w-full md:p-10 p-4">
//         <h2 className="pb-4 text-2xl font-bold text-gray-700">All Products</h2>
//         <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-xl bg-white border border-gray-300 shadow-lg">
//           <table className="md:table-auto table-fixed w-full overflow-hidden">
//             <thead className="text-gray-900 text-sm text-left bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3 font-semibold truncate">Product</th>
//                 <th className="px-4 py-3 font-semibold truncate">Category</th>
//                 <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
//                 <th className="px-4 py-3 font-semibold truncate">Stock Status</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm text-gray-600">
//               {products.map((product, idx) => (
//                 <tr
//                   key={product._id}
//                   className={`border-t border-gray-300 hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 ${
//                     idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                   }`}
//                 >
//                   {/* Product Name */}
//                   <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
//                     <div className="border border-gray-300 rounded-lg p-2 overflow-hidden hover:scale-110 transform transition duration-300">
//                       <img src={product.image[0]} alt="Product" className="w-16 h-16 object-cover rounded" />
//                     </div>
//                     <span className="truncate max-sm:hidden w-full" title={product.name}>
//                       {product.name}
//                     </span>
//                   </td>

//                   {/* Category */}
//                   <td className="px-4 py-3">{product.category}</td>

//                   {/* Price Edit */}
//                   <td className="px-4 py-3 max-sm:hidden">
//                     {editingPrice[product._id] ? (
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="number"
//                           value={newPrice[product._id] ?? product.offerPrice}
//                           onChange={(e) =>
//                             setNewPrice((prev) => ({ ...prev, [product._id]: e.target.value }))
//                           }
//                           className="border px-2 py-1 rounded w-24"
//                         />
//                         <button
//                           onClick={() => savePrice(product._id)}
//                           className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                         >
//                           Save
//                         </button>
//                       </div>
//                     ) : (
//                       <div
//                         className="flex items-center space-x-2 cursor-pointer"
//                         onClick={() =>
//                           setEditingPrice((prev) => ({ ...prev, [product._id]: true }))
//                         }
//                       >
//                         <span className="font-semibold text-gray-700">
//                           {currency}{product.offerPrice}
//                         </span>
//                         <span className="text-blue-500 underline">Edit</span>
//                       </div>
//                     )}
//                   </td>

//                   {/* Stock Button */}
//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => toggleStock(product._id, !product.inStock)}
//                       className={`px-4 py-1 rounded-lg font-medium transition-all duration-300 ${
//                         product.inStock
//                           ? "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
//                           : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
//                       }`}
//                     >
//                       {product.inStock ? "In Stock" : "Out of Stock"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;


import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();
  const [editingPrice, setEditingPrice] = useState({});
  const [newPrice, setNewPrice] = useState({});

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Save new price
  const savePrice = async (id) => {
    try {
      const { data } = await axios.put(`/api/product/${id}/price`, { price: newPrice[id] });
      if (data.success) {
        toast.success("Price updated successfully!");
        fetchProducts();
        setEditingPrice((prev) => ({ ...prev, [id]: false }));
      } else {
        toast.error(data.message || "Failed to update price");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between bg-gray-50">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700">All Products</h2>
        <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-xl bg-white border border-gray-300 shadow-lg">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left bg-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                <th className="px-4 py-3 font-semibold truncate">Stock Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {products.map((product, idx) => (
                <tr
                  key={product._id}
                  className={`border-t border-gray-300 hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } ${!product.inStock ? "opacity-50 blur-[1px]" : ""}`} // ✅ Blur out-of-stock
                >
                  {/* Product Name */}
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded-lg p-2 overflow-hidden hover:scale-110 transform transition duration-300">
                      <img src={product.image[0]} alt="Product" className="w-16 h-16 object-cover rounded" />
                    </div>
                    <span className="truncate max-sm:hidden w-full" title={product.name}>
                      {product.name}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">{product.category}</td>

                  {/* Price Edit */}
                  <td className="px-4 py-3 max-sm:hidden">
                    {editingPrice[product._id] ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={newPrice[product._id] ?? product.offerPrice}
                          onChange={(e) =>
                            setNewPrice((prev) => ({ ...prev, [product._id]: e.target.value }))
                          }
                          className="border px-2 py-1 rounded w-24"
                        />
                        <button
                          onClick={() => savePrice(product._id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() =>
                          setEditingPrice((prev) => ({ ...prev, [product._id]: true }))
                        }
                      >
                        <span className="font-semibold text-gray-700">
                          {currency}{product.offerPrice}
                        </span>
                        <span className="text-blue-500 underline">Edit</span>
                      </div>
                    )}
                  </td>

                  {/* Stock Button */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStock(product._id, !product.inStock)}
                      className={`px-4 py-1 rounded-lg font-medium transition-all duration-300 ${
                        product.inStock
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
                          : "bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
