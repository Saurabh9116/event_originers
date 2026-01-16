// // import React, { useRef } from "react";
// // import { assets } from "../assets/assets";
// // import { useAppContext } from "../context/AppContext";

// // const MainBanner = () => {
// //   const { setInput, input } = useAppContext();
// //   const inputRef = useRef();

// //   const onSubmitHandler = (e) => {
// //     e.preventDefault();
// //     setInput(inputRef.current.value);
// //   };

// //   const onClear = () => {
// //     setInput("");
// //     inputRef.current.value = "";
// //   };

// //   return (
// //     <div className="relative mx-8 sm:mx-16 xl:mx-24 mt-20">

// //       <div className="text-center">

// //         {/* Badge */}
// //         <div className="inline-flex items-center gap-3 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
// //           <p>New: Smart Event Management</p>
// //           <img src={assets.star_icon} className="w-2.5" alt="" />
// //         </div>

// //         {/* Title */}
// //         <h1 className="text-3xl sm:text-6xl font-semibold text-gray-700 sm:leading-16">
// //           Manage & Discover{" "}
// //           <span className="text-primary">Hospital Events</span>
// //           <br /> with Ease
// //         </h1>

// //         {/* Description */}
// //         <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">
// //           Organize medical camps, health seminars, workshops, and conferences
// //           in one place. Discover upcoming hospital events and stay informed effortlessly.
// //         </p>

// //         {/* Search */}
// //         <form
// //           onSubmit={onSubmitHandler}
// //           className="flex justify-between max-w-lg max-sm:scale-90 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
// //         >
// //           <input
// //             ref={inputRef}
// //             type="text"
// //             placeholder="Search for events, camps, or seminars"
// //             required
// //             className="w-full pl-4 outline-none"
// //           />
// //           <button
// //             type="submit"
// //             className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all"
// //           >
// //             Search
// //           </button>
// //         </form>

// //         {/* Clear Search */}
// //         {input && (
// //           <div className="mt-4">
// //             <button
// //               onClick={onClear}
// //               className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm"
// //             >
// //               Clear Search
// //             </button>
// //           </div>
// //         )}
// //       </div>

// //       {/* Background gradient */}
// //       <img
// //         src={assets.gradientBackground}
// //         alt=""
// //         className="absolute -top-50 -z-10 opacity-50"
// //       />
// //     </div>
// //   );
// // };

// // export default MainBanner;

// import React, { useRef } from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const MainBanner = () => {
//   const { setInput, input } = useAppContext();
//   const inputRef = useRef();

//   const onChangeHandler = (e) => {
//     setInput(e.target.value);
//   };

//   const onClear = () => {
//     setInput("");
//     inputRef.current.value = "";
//   };

//   return (
//     <div className="relative mx-8 sm:mx-16 xl:mx-24 mt-20">

//       <div className="text-center">

//         {/* Badge */}
//         <div className="inline-flex items-center gap-3 px-6 py-1.5 mb-5 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary shadow-sm">
//           <p>New: Smart Hospital Event Management</p>
//           <img src={assets.star_icon} className="w-3" alt="" />
//         </div>

//         {/* Title */}
//         <h1 className="text-3xl sm:text-6xl font-semibold text-gray-700 sm:leading-tight">
//           Discover & Manage{" "}
//           <span className="text-primary">Hospital Events</span>
//           <br /> Seamlessly
//         </h1>

//         {/* Description */}
//         <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-500">
//           Plan medical camps, blood donation drives, health seminars, workshops,
//           and conferences — all from one powerful platform.
//         </p>

//         {/* SEARCH INPUT (NO BUTTON) */}
//         <div className="relative max-w-xl mx-auto mt-6">
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search medical camps, seminars, conferences..."
//             onChange={onChangeHandler}
//             className="
//               w-full pl-12 pr-4 py-4
//               rounded-full
//               border border-gray-300
//               shadow-lg
//               outline-none
//               focus:border-primary
//               focus:ring-2 focus:ring-primary/30
//               transition
//               text-sm sm:text-base
//             "
//           />

//           {/* Search Icon */}
//           <img
//             src={assets.search_icon}
//             alt="search"
//             className="absolute left-4 top-1/2 -translate-y-1/2 w-5 opacity-60"
//           />
//         </div>

//         {/* Clear Search */}
//         {input && (
//           <div className="mt-4">
//             <button
//               onClick={onClear}
//               className="
//                 text-xs
//                 text-gray-500
//                 hover:text-primary
//                 underline
//                 transition
//               "
//             >
//               Clear search
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Background Gradient */}
//       <img
//         src={assets.gradientBackground}
//         alt=""
//         className="absolute -top-52 -z-10 opacity-50"
//       />
//     </div>
//   );
// };

// export default MainBanner;

import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const MainBanner = () => {
  const { navigate } = useAppContext();

  return (
    <div className="relative mx-8 sm:mx-16 xl:mx-24 mt-20">

      <div className="text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-1.5 mb-5 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary shadow-sm">
          <p>Smart Hospital Event Management</p>
          <img src={assets.star_icon} className="w-3" alt="" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-6xl font-semibold text-gray-700 sm:leading-tight">
          Organize & Discover{" "}
          <span className="text-primary">Hospital Events</span>
          <br /> Effortlessly
        </h1>

        {/* Description */}
        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-500">
          From medical camps to national conferences, manage every healthcare
          event with clarity, professionalism, and ease.
        </p>

        {/* HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <img src={assets.medical_icon} alt="" className="w-10 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700">Medical Camps</h3>
            <p className="text-xs text-gray-500 mt-2">
              Organize health check-ups and outreach medical camps seamlessly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <img src={assets.seminar_icon} alt="" className="w-10 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700">Health Seminars</h3>
            <p className="text-xs text-gray-500 mt-2">
              Host awareness programs and expert-led medical seminars.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
            <img src={assets.blood_icon} alt="" className="w-10 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700">Blood Donation</h3>
            <p className="text-xs text-gray-500 mt-2">
              Plan and manage blood donation drives with ease and safety.
            </p>
          </div>

        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-primary text-white rounded-full shadow-lg hover:scale-105 transition"
          >
            Explore Events
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition"
          >
            Book an Event
          </button>

        </div>
      </div>

      {/* Background Gradient */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-52 -z-10 opacity-50"
      />
    </div>
  );
};

export default MainBanner;
