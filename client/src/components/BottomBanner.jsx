import React from "react";
import { features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24 overflow-hidden bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">

      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Heading */}
        <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            Hospital Event Management System
          </span>
        </h1>

        {/* Sub Heading */}
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10 text-sm md:text-base">
          A smart, secure, and efficient platform to manage hospital events,
          medical conferences, workshops, and staff programs with ease.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition"
            >
              <div className="w-12 h-12 mb-3 rounded-full bg-gradient-to-tr from-blue-500 to-green-500 flex items-center justify-center">
                <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BottomBanner;
