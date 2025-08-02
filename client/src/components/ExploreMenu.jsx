import React from 'react';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5 px-6 py-8 md:px-16">
      {/* Title */}
      <h1 className="text-gray-900 font-medium text-2xl md:text-3xl text-center">
        Explore Our Menu
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-sm md:text-lg text-center max-w-[60%] mx-auto">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      {/* Menu List */}
      <div className="flex items-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide py-4">
        {menu_list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center cursor-pointer transition-all duration-200"
            onClick={() => setCategory(item.menu_name)} // Set category when clicked
          >
            <img
              src={item.menu_image}
              alt=""
              className={`w-[7.5vw] min-w-[80px] rounded-full transition-all duration-200 hover:scale-110 ${
                category === item.menu_name ? 'border-4 border-[#FF6347] p-1' : ''
              }`}
            />
            <p className="text-gray-600 text-sm md:text-lg mt-2">{item.menu_name}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200 w-full mt-4" />
    </div>
  );
};

export default ExploreMenu;
