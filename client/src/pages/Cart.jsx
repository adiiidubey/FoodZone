import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Navigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, url,food_list, removeFromCart,getTotalCartAmount,navigate } = useContext(StoreContext);
  const handler=(item)=>{
    
    navigate(`/${item}`)
    

  }
  // // Calculate Subtotal
  // const subtotal = food_list.reduce((acc, item) => {
  //   return acc + (cartItems[item._id] > 0 ? item.price * cartItems[item._id] : 0);
  // }, 0);

  // const deliveryFee = 2; // Assuming fixed delivery fee
  // const total = subtotal + deliveryFee;

  return (
    <div className="mt-24 px-4">
      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* Cart Header */}
        <div className="hidden md:grid grid-cols-6 items-center text-gray-600 text-sm md:text-base border-b border-gray-300 pb-2">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {/* Cart Items */}
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className="border-b border-gray-300 py-4">
                <div className="grid grid-cols-2 md:grid-cols-6 items-center text-black text-sm md:text-base gap-4">
                  <img src={url+"/images/"+item.image} alt="" className="w-12 h-12 object-cover rounded-md" />
                  <p>{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="font-medium">{cartItems[item._id]}</p>
                  <p className="font-semibold">$ {item.price * cartItems[item._id]}</p>
                  <p 
                    onClick={() => removeFromCart(item._id)} 
                    className="cursor-pointer text-red-500 font-bold text-lg md:text-xl"
                  >
                    ×
                  </p>
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* Cart Summary Section */}
      <div className="mt-16 flex flex-col lg:flex-row justify-between gap-8">
        {/* Cart Total */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <p>Total</p>
              <p>${getTotalCartAmount()+(getTotalCartAmount()===0?0:2)}</p>
            </div>
          </div>
          <button onClick={()=>handler("order")} className="mt-6 w-full bg-[#FF6347] text-white py-3 rounded-md text-lg font-medium hover:bg-red-600 transition">
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-3">If you have a promo code, enter it here:</p>
          <div className="flex items-center bg-gray-200 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Promo Code"
              className="w-full bg-transparent px-4 py-2 outline-none"
            />
            <button className="bg-black text-white px-6 py-2 text-lg font-medium hover:bg-gray-900 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
