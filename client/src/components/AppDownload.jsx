import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div className="text-center mt-24 text-lg md:text-2xl font-medium">
      <p>
        For a better experience, download <br /> the Tomato App
      </p>
      <div className="flex justify-center gap-6 mt-10">
        <img
          src={assets.play_store}
          alt="Play Store"
          className="w-32 md:w-44 max-w-xs transition-transform duration-500 hover:scale-110 cursor-pointer"
        />
        <img
          src={assets.app_store}
          alt="App Store"
          className="w-32 md:w-44 max-w-xs transition-transform duration-500 hover:scale-110 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default AppDownload;
