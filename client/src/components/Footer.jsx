import React, { useMemo } from "react";

const Footer = () => {
  const quickLinks = [
    "Home",
    "Upcoming Events",
    "Medical Conferences",
    "Health Camps",
    "Contact Us"
  ];

  const helpLinks = [
    "Event Registration Help",
    "CME Guidelines",
    "Privacy Policy",
    "Terms & Conditions",
    "Contact Support"
  ];

  const socialLinks = ["LinkedIn", "Twitter", "Facebook", "YouTube"];

  // Floating elements (memoized)
  const floatingElementsDesktop = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        size: Math.random() * 6 + 3,
        top: Math.random() * 90 + 5,
        left: Math.random() * 90 + 5,
        opacity: Math.random() * 0.15 + 0.1,
        color: ["#4CBF8A", "#14b8a6", "#22c55e"][Math.floor(Math.random() * 3)],
        animation: ["animate-bounce", "animate-pulse", "animate-spin"][
          Math.floor(Math.random() * 3)
        ]
      })),
    []
  );

  const floatingElementsMobile = useMemo(
    () =>
      Array.from({ length: 25 }).map(() => ({
        size: Math.random() * 6 + 3,
        top: Math.random() * 80 + 5,
        left: Math.random() * 80 + 5,
        opacity: Math.random() * 0.15 + 0.1,
        color: ["#4CBF8A", "#14b8a6", "#22c55e"][Math.floor(Math.random() * 3)],
        animation: ["animate-bounce", "animate-pulse", "animate-spin"][
          Math.floor(Math.random() * 3)
        ]
      })),
    []
  );

  return (
    <div className="relative mt-24">
      {/* Main Footer */}
      <div className="relative px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-10 py-16 border-t border-gray-300/40 relative z-20">
          
          {/* Branding & Description */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h2
              className="text-2xl md:text-3xl font-bold tracking-wide"
              style={{ color: "#4CBF8A" }}
            >
              🏥 Hospital Event Organizers
            </h2>

            <p className="max-w-[300px] text-gray-700 text-sm md:text-base leading-relaxed">
              We specialize in planning and managing medical conferences, health camps,
              CME programs, and hospital events with precision, security, and care.
            </p>

            <div
              className="mt-4 w-28 h-1 rounded-full animate-pulse"
              style={{ backgroundColor: "#4CBF8A" }}
            ></div>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col md:flex-row gap-10 justify-center items-center w-full">
            
            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {quickLinks.map((link) => (
                  <li
                    key={link}
                    className="px-3 py-1 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition transform cursor-pointer hover:scale-105 text-gray-700 text-sm md:text-base"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                Support
              </h3>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {helpLinks.map((link) => (
                  <li
                    key={link}
                    className="px-3 py-1 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition transform cursor-pointer hover:scale-105 text-gray-700 text-sm md:text-base"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">
                Connect With Us
              </h3>
              <ul className="flex flex-col gap-2 items-center md:items-start">
                {socialLinks.map((social) => (
                  <li
                    key={social}
                    className="px-3 py-1 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition transform cursor-pointer hover:scale-105 text-gray-700 text-sm md:text-base"
                  >
                    {social}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Floating Elements */}
        {floatingElementsDesktop.map((dot, i) => (
          <div
            key={`d-${i}`}
            className={`hidden md:block absolute rounded-full ${dot.animation} z-10`}
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              backgroundColor: dot.color,
              opacity: dot.opacity
            }}
          ></div>
        ))}

        {floatingElementsMobile.map((dot, i) => (
          <div
            key={`m-${i}`}
            className={`md:hidden absolute rounded-full ${dot.animation} z-10`}
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              backgroundColor: dot.color,
              opacity: dot.opacity
            }}
          ></div>
        ))}

        {/* Footer Bottom */}
        <p className="py-6 text-center text-sm md:text-base text-gray-700/80 hover:text-emerald-700 transition-colors relative z-20">
          © {new Date().getFullYear()} Hospital Event Organizers. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
