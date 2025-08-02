import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url} = useContext(StoreContext);

  // Ensure the item count is displayed correctly
  

  return (
    <div className="w-full max-w-sm mx-auto rounded-lg shadow-md transition duration-300 hover:shadow-lg bg-white">
      <div className="relative">
        <img className="w-full rounded-t-lg" src={url+"/images/"+image} alt={name} />
        
        {!cartItems[id]? ( 
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
            className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-full bg-gray-100 p-1 hover:bg-gray-200"
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-2 py-1 rounded-full bg-white shadow">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
              className="w-6 cursor-pointer"
            />
            <p className="text-lg font-medium">{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add"
              className="w-6 cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold">{name}</p>
          <img src={assets.rating_starts} alt="Rating" className="w-16" />  
        </div>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="text-red-500 text-xl font-semibold">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
