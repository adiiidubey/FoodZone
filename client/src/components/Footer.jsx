import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 flex flex-col items-center gap-6 mt-18 px-8 py-10 md:py-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="flex flex-col items-start gap-5">
          <img src={assets.logo} alt="Logo" className="w-28" />
          <p>Some text for usual footer components.</p>
          <div className="flex space-x-4">
            <img
              src={assets.facebook_icon}
              alt="Facebook"
              className="w-10 cursor-pointer hover:opacity-80"
            />
            <img
              src={assets.twitter_icon}
              alt="Twitter"
              className="w-10 cursor-pointer hover:opacity-80"
            />
            <img
              src={assets.linkedin_icon}
              alt="LinkedIn"
              className="w-10 cursor-pointer hover:opacity-80"
            />
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-lg font-semibold">COMPANY</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-400">Home</li>
            <li className="cursor-pointer hover:text-gray-400">About Us</li>
            <li className="cursor-pointer hover:text-gray-400">Delivery</li>
            <li className="cursor-pointer hover:text-gray-400">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-lg font-semibold">GET IN TOUCH</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-400">+1-212-456-7890</li>
            <li className="cursor-pointer hover:text-gray-400">contact@tomato.com</li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <hr className="w-full border-gray-600" />

      {/* Copyright */}
      <p className="text-center text-sm">Copyright 2024 @ Tomato.com - All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
