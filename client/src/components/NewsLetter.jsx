// // const NewsLetter = () => {
// //   return (
// //     <div className="relative flex flex-col items-center justify-center text-center space-y-6 mt-24 pb-20 px-6 rounded-3xl shadow-2xl overflow-hidden group">
// //       {/* Background with gradient overlay */}
// //       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606788075761-7e94a3dbfc8c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
// //       <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-50/90"></div>

// //       {/* Content */}
// //       <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-3xl">
// //         {/* Heading */}
// //         <h1 className="md:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-lime-500 drop-shadow-xl animate-pulse">
// //           Stay Fresh, Stay Updated!
// //         </h1>

// //         {/* Subheading */}
// //         <p className="md:text-lg text-sm text-gray-700 max-w-2xl leading-relaxed">
// //           Freshness you trust, health you love — call{" "}
// //           <strong className="text-green-700">9116232014</strong> for updates on
// //           exclusive offers, fresh arrivals, and more.  
// //           <br />
// //           Bringing healthy goodness straight to your doorstep!
// //         </p>

// //         {/* Newsletter Form */}
// //         <form className="flex items-center max-w-2xl w-full h-12 md:h-14 bg-white shadow-xl rounded-full overflow-hidden border border-green-200">
// //           <input
// //             className="h-full outline-none w-full px-4 text-gray-600 text-sm md:text-base"
// //             type="email"
// //             placeholder="Enter your email address"
// //             required
// //           />
// //           <button
// //             type="submit"
// //             className="md:px-12 px-6 h-full text-white font-semibold bg-gradient-to-r from-green-600 to-lime-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-300/50"
// //           >
// //             Subscribe
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NewsLetter;




// import { useState } from "react";

// const NewsLetter = () => {
//   const [showManual, setShowManual] = useState(false);

//   return (
//     <div className="relative flex flex-col items-center justify-center text-center space-y-8 mt-24 pb-24 px-6 rounded-3xl shadow-2xl overflow-hidden group">
//       {/* Background with subtle animation */}
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606788075761-7e94a3dbfc8c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center filter blur-sm scale-105 animate-pulse-slow"></div>
//       <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-50/90"></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-3xl">
//         {/* Heading */}
//         <h1 className="md:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-lime-500 drop-shadow-xl animate-gradient-x">
//           Stay Fresh, Stay Updated!
//         </h1>

//         {/* Subheading */}
//         <p className="md:text-lg text-sm text-gray-700 max-w-2xl leading-relaxed">
//           Freshness you trust, health you love — call{" "}
//           <strong className="text-green-700">9116232014</strong> for updates on
//           exclusive offers, fresh arrivals, and more.  
//           <br />
//           Bringing healthy goodness straight to your doorstep!
//         </p>

//         {/* Newsletter Form */}
//         <form className="flex items-center max-w-2xl w-full h-12 md:h-14 bg-white shadow-xl rounded-full overflow-hidden border border-green-200 transition-transform transform hover:scale-105">
//           <input
//             className="h-full outline-none w-full px-4 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-green-400 rounded-l-full"
//             type="email"
//             placeholder="Enter your email address"
//             required
//           />
//           <button
//             type="submit"
//             className="md:px-12 px-6 h-full text-white font-semibold bg-gradient-to-r from-green-600 to-lime-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-300/50 rounded-r-full"
//           >
//             Subscribe
//           </button>
//         </form>

//         {/* Collapsible User Manual Section */}
//         <div className="w-full max-w-2xl text-left mt-4">
//           <button
//             onClick={() => setShowManual(!showManual)}
//             className="flex items-center justify-between w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//           >
//             <span>📖 Easy guidance to use Prakash Freshness.</span>
//             <span className={`transform transition-transform duration-300 ${showManual ? "rotate-180" : ""}`}>▼</span>
//           </button>

//           {showManual && (
//             <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 space-y-2 shadow-inner animate-fade-in">
//               <ol className="list-decimal list-inside text-gray-700 space-y-1">
//                 <li>Click the “Open User Manual” button below.</li>
//                 <li>The PDF will open in a new tab.</li>
//                 <li>Follow the steps inside to learn how to order, check offers, and track deliveries.</li>
//                 <li>Keep the manual handy for future reference.</li>
//               </ol>
//               <a
//                 href="https://drive.google.com/file/d/1pEM1NPDVcGarpQxjJvVRruEdJuYtxtoX/view?usp=sharing"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-3 inline-block w-full text-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//               >
//                 📖 Open User Manual
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;



// import { useState } from "react";

// const NewsLetter = () => {
//   const [showManual, setShowManual] = useState(false);

//   return (
//     <div className="relative flex flex-col items-center justify-center text-center space-y-8 mt-24 pb-24 px-6 rounded-3xl shadow-2xl overflow-hidden group">
//       {/* Background with subtle animation */}
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606788075761-7e94a3dbfc8c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center filter blur-sm scale-105 animate-pulse-slow"></div>
//       <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-50/90"></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-3xl">
//         {/* Heading */}
//         <h1 className="md:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-lime-500 drop-shadow-xl animate-gradient-x">
//           Stay Fresh, Stay Updated!
//         </h1>

//         {/* Subheading */}
//         <p className="md:text-lg text-sm text-gray-700 max-w-2xl leading-relaxed">
//           Freshness you trust, health you love — call{" "}
//           <strong className="text-green-700">9116232014</strong> for updates on
//           exclusive offers, fresh arrivals, and more.  
//           <br />
//           Bringing healthy goodness straight to your doorstep!
//         </p>

//         {/* Newsletter Form */}
//         <form className="flex items-center max-w-2xl w-full h-12 md:h-14 bg-white shadow-xl rounded-full overflow-hidden border border-green-200 transition-transform transform hover:scale-105">
//           <input
//             className="h-full outline-none w-full px-4 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-green-400 rounded-l-full"
//             type="email"
//             placeholder="Enter your email address"
//             required
//           />
//           <button
//             type="submit"
//             className="md:px-12 px-6 h-full text-white font-semibold bg-gradient-to-r from-green-600 to-lime-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-300/50 rounded-r-full"
//           >
//             Subscribe
//           </button>
//         </form>

//         {/* 🔥 Android App Download Button (Always Visible) */}
//         <a
//           // href="https://drive.google.com/file/d/1oOD9FSWE-_KhCtZp8ZdB5RilsdZYFhA2/view?usp=sharing"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="w-full max-w-2xl text-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//         >
//           📱 Download Prakash Freshness IOS App From Apple Store 
//         </a>

//         {/* 📍 Note under the Android App button */}
//         <p className="text-xs text-gray-600 max-w-2xl">
//           {/* <strong>Note:</strong> As per the updated Google Play policies, a publishing fee is required for hosting the app on the Play Store. */}
//         </p>

//          {/* 🔥 Android App Download Button (Always Visible) */}
//         <a
//           // href="https://drive.google.com/file/d/1oOD9FSWE-_KhCtZp8ZdB5RilsdZYFhA2/view?usp=sharing"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="w-full max-w-2xl text-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//         >
//           📱 Download Prakash Freshness Android App From Playstore
//         </a>

//         {/* 📍 Note under the Android App button */}
//         <p className="text-xs text-gray-600 max-w-2xl">
//           <strong>Note:</strong> As per the updated Google Play policies, a publishing fee is required for hosting the app on the Play Store.
//         </p>

//         {/* Collapsible User Manual Section */}
//         <div className="w-full max-w-2xl text-left mt-4">
//           <button
//             onClick={() => setShowManual(!showManual)}
//             className="flex items-center justify-between w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//           >
//             <span>📖 Easy guidance to use Prakash Freshness.</span>
//             <span
//               className={`transform transition-transform duration-300 ${showManual ? "rotate-180" : ""}`}
//             >
//               ▼
//             </span>
//           </button>

//           {showManual && (
//             <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 space-y-3 shadow-inner animate-fade-in">
//               <ol className="list-decimal list-inside text-gray-700 space-y-1">
//                 <li>Click the “Open User Manual” button below.</li>
//                 <li>The PDF will open in a new tab.</li>
//                 <li>Follow the steps inside to learn how to order, check offers, and track deliveries.</li>
//                 <li>Keep the manual handy for future reference.</li>
//               </ol>

//               <a
//                 href="https://drive.google.com/file/d/1pEM1NPDVcGarpQxjJvVRruEdJuYtxtoX/view?usp=sharing"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block w-full text-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//               >
//                 📖 Open User Manual
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;


























// import { useState } from "react";

// const NewsLetter = () => {
//   const [showManual, setShowManual] = useState(false);

//   return (
//     <div className="relative flex flex-col items-center justify-center text-center space-y-8 mt-24 pb-24 px-6 rounded-3xl shadow-2xl overflow-hidden group">
//       {/* Background with subtle animation */}
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606788075761-7e94a3dbfc8c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center filter blur-sm scale-105 animate-pulse-slow"></div>
//       <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-green-50/90"></div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center space-y-6 w-full max-w-3xl">
//         {/* Heading */}
//         <h1 className="md:text-5xl text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-lime-500 drop-shadow-xl animate-gradient-x">
//           Stay Fresh, Stay Updated!
//         </h1>

//         {/* Subheading */}
//         <p className="md:text-lg text-sm text-gray-700 max-w-2xl leading-relaxed">
//           Freshness you trust, health you love — call{" "}
//           <strong className="text-green-700">9116232014</strong> for updates on
//           exclusive offers, fresh arrivals, and more.  
//           <br />
//           Bringing healthy goodness straight to your doorstep!
//         </p>

//         {/* Newsletter Form */}
//         <form className="flex items-center max-w-2xl w-full h-12 md:h-14 bg-white shadow-xl rounded-full overflow-hidden border border-green-200 transition-transform transform hover:scale-105">
//           <input
//             className="h-full outline-none w-full px-4 text-gray-600 text-sm md:text-base focus:ring-2 focus:ring-green-400 rounded-l-full"
//             type="email"
//             placeholder="Enter your email address"
//             required
//           />
//           <button
//             type="submit"
//             className="md:px-12 px-6 h-full text-white font-semibold bg-gradient-to-r from-green-600 to-lime-500 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-300/50 rounded-r-full"
//           >
//             Subscribe
//           </button>
//         </form>

//         {/* 🔥 iOS Download Button — Coming Soon */}
//         <button
//           onClick={() => alert("📢 The iOS app is coming soon!")}
//           className="w-full max-w-2xl text-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//         >
//           📱 Download Prakash Freshness IOS App From Apple Store
//         </button>

//         <p className="text-xs text-gray-600 max-w-2xl"></p>

//         {/* 🔥 Android Download Button — Coming Soon */}
//         <button
//           onClick={() => alert("📢 The Android app is coming soon!")}
//           className="w-full max-w-2xl text-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//         >
//           📱 Download Prakash Freshness Android App From Playstore
//         </button>

//         {/* Note under Android Button */}
//         <p className="text-xs text-gray-600 max-w-2xl">
//           <strong>Note:</strong> As per the updated Google Play policies, a publishing fee is required for hosting the app on the Play Store.
//         </p>

//         {/* Collapsible User Manual Section */}
//         <div className="w-full max-w-2xl text-left mt-4">
//           <button
//             onClick={() => setShowManual(!showManual)}
//             className="flex items-center justify-between w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//           >
//             <span>📖 Easy guidance to use Prakash Freshness.</span>
//             <span
//               className={`transform transition-transform duration-300 ${showManual ? "rotate-180" : ""}`}
//             >
//               ▼
//             </span>
//           </button>

//           {showManual && (
//             <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200 space-y-3 shadow-inner animate-fade-in">
//               <ol className="list-decimal list-inside text-gray-700 space-y-1">
//                 <li>Click the “Open User Manual” button below.</li>
//                 <li>The PDF will open in a new tab.</li>
//                 <li>Follow the steps inside to learn how to order, check offers, and track deliveries.</li>
//                 <li>Keep the manual handy for future reference.</li>
//               </ol>

//               <a
//                 href="https://drive.google.com/file/d/1pEM1NPDVcGarpQxjJvVRruEdJuYtxtoX/view?usp=sharing"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block w-full text-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
//               >
//                 📖 Open User Manual
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;




import { useState } from "react";

const NewsLetter = () => {
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 mt-24 pb-24 px-6">

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
        Hospital Event Organizers
      </h1>

      {/* Subheading */}
      <p className="max-w-3xl text-gray-600 md:text-lg text-sm leading-relaxed">
        We specialize in planning and managing professional hospital and healthcare events
        including medical camps, blood donation drives, doctor conferences, and health
        awareness programs.
      </p>

      {/* Newsletter */}
      <form className="flex items-center max-w-xl w-full h-12 md:h-14 bg-white border border-gray-300 rounded-full overflow-hidden">
        <input
          className="h-full outline-none w-full px-4 text-gray-700 text-sm md:text-base"
          type="email"
          placeholder="Enter your email for updates"
          required
        />
        <button
          type="submit"
          className="px-8 h-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Subscribe
        </button>
      </form>

      {/* Contact Info */}
      <div className="text-gray-700 text-sm md:text-base space-y-1">
        <p>
          <strong>Email:</strong>{" "}
          <span className="text-green-600">admin@swasthyachetna.com</span>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <span className="text-green-600">+91 99242 09736</span>
        </p>
        <p className="text-gray-500 text-sm">
          1 Kanha Bunglows, Maneja, Vadodara, Gujarat
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => alert("📅 Event planning request coming soon")}
        // className="px-10 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
      >
        {/* Request Event Planning */}
      </button>

      {/* Process Section */}
      <div className="w-full max-w-xl text-left mt-6">
        <button
          onClick={() => setShowManual(!showManual)}
          className="flex items-center justify-between w-full px-6 py-3 border border-green-600 text-green-700 font-semibold rounded-full hover:bg-green-50 transition"
        >
          <span>How We Organize Hospital Events</span>
          <span className={`transform transition ${showManual ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>

        {showManual && (
          <div className="mt-4 p-5 border border-gray-200 rounded-xl space-y-3 text-sm text-gray-700">
            <ol className="list-decimal list-inside space-y-1">
              <li>Requirement discussion with hospital management</li>
              <li>Planning doctors, staff, logistics & permissions</li>
              <li>On-site execution with safety protocols</li>
              <li>Post-event reporting & feedback</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
