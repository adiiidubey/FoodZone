import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const placeOrder = async (event) => {
    event.preventDefault();
  
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() * 100 + 200, // Convert to paise (₹ -> paise)
    };
  
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
  
      console.log("Order API Response:", response.data); // Debugging log
  
      if (response.data.success && response.data.order) {
        const orderId = response.data.order._id; // Ensure correct order ID field
        const amount = response.data.order.amount;
        
        try {
          console.log("Calling payment API...");
          let paymentResponse = await axios.post(`${url}/api/order/paymentpage`, { amount, orderId },{headers:{token}});
          console.log("Response:", paymentResponse.data);
          
         
  
          console.log("Payment API Response:",paymentResponse.data.success); // Debug response
  
          if (paymentResponse.data.success) {
            const order = paymentResponse.data.order;
            console.log(order.id)
            const options = {
              key: razorpayKey,// Ensure correct key
              amount: order.amount, 
              currency: "INR",
              name: "Your Store",
              description: "Order Payment",
              order_id: order.id, // Ensure ID is correct
              handler: async function (response) {
                console.log("Razorpay Response:", response);
                console.log(order.id);
                let verifyRes = await axios.post(`${url}/api/order/payment-verify`, {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  orderId: paymentResponse.data.orderId,
                  userId:token._id,
                },{headers:{token}});
                console.log(verifyRes)
                if (verifyRes.data.success) {
                  alert("Payment Successful!");
                } else {
                  alert("Payment verification failed!");
                }
              },
              theme: { color: "#FF6347" },
            };
           
            const razorpay = new window.Razorpay(options);
            razorpay.open();
          } else {
            console.error("Payment API Error:", paymentResponse.data);
            alert("Error initiating payment: " + paymentResponse.data.message);
          }
        } catch (error) {
          console.error("Payment Request Error:", error.response?.data || error.message);
          alert("Error initiating payment: " + (error.response?.data?.message || error.message));
        }
      } else {
        alert("Order placement failed!");
      }
    } catch (error) {
      console.error("Order Request Error:", error.response?.data || error.message);
      alert("Error placing order: " + (error.response?.data?.message || error.message));
    }
  };
  
  
  
  // const placeOrder = async (event) => {
  //   console.log()
  //   event.preventDefault();
    
  //   let orderItems = [];
  //   food_list.map((item) => {
  //     if (cartItems[item._id] > 0) {
  //       let itemInfo = item;
  //       itemInfo["quantity"] = cartItems[item._id];
  //       orderItems.push(itemInfo);
  //     }
  //   });
    
  //   let orderData = {
  //     address: data,
  //     items: orderItems,
  //     amount: getTotalCartAmount() + 2,
  //   };
  
  //   try {
  //     let response = await axios.post(`${url}/api/order/place`, orderData, {
  //       headers: {
  //         token,
  //       },
  //     });
  
  //     if (response.data.success) {
  //       alert("Success");
  //     } else {
  //       alert("Error: " + response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error placing the order:", error);
  //     alert("Error placing the order: " + error.message);
  //   }
  // };
  
  // const placeOrder=async(event)=>{
  //   event.preventDefault();
  //   let orderItems=[];
  //   food_list.map((item)=>{
  //     if(cartItems[item._id]>0){
  //       let itemInfo=item;
  //       itemInfo["quantity"]=cartItems[item._id];
  //       orderItems.push(itemInfo)
  //     }
  //   })
  //   let orderData={
  //     address:data,
  //     items:orderItems,
  //     amount:getTotalCartAmount()+2,
  //   }
  //   let response =await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
  //   if(response.data.success){
  //     alert("sucesa")
  //   }
  //   else[
  //     alert("error")
  //   ]
  // }

  return (
    <form className="place-order flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 mt-10 px-4 md:px-10">
      <div className="place-order-left w-full md:max-w-[35%] lg:max-w-[500px] bg-white p-6 rounded-lg shadow-md">
        <p className="text-2xl font-semibold mb-6 text-gray-800">Delivery Information</p>
        <div className="multi-fields flex gap-3 mb-4">
          <input  required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First name" className="input-field border border-gray-300 rounded-md p-3 w-full" />
          <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" className="input-field border border-gray-300 rounded-md p-3 w-full" />
        </div>
        <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" className="input-field border border-gray-300 rounded-md p-3 w-full mb-4" />
        <input  required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" className="input-field border border-gray-300 rounded-md p-3 w-full mb-4" />
        <div className="multi-fields flex gap-3 mb-4">
          <input required type="text"  name="city" onChange={onChangeHandler} value={data.city} placeholder="City" className="input-field border border-gray-300 rounded-md p-3 w-full" />
          <input required type="text"  name="state" onChange={onChangeHandler} value={data.state} placeholder="State" className="input-field border border-gray-300 rounded-md p-3 w-full" />
        </div>
        <div className="multi-fields flex gap-3 mb-4">
          <input required type="text"  name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" className="input-field border border-gray-300 rounded-md p-3 w-full" />
          <input  required type="text"  name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" className="input-field border border-gray-300 rounded-md p-3 w-full" />
        </div>
        <input required type="text"  name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" className="input-field border border-gray-300 rounded-md p-3 w-full" />
      </div>
      
      <div className="place-order-right w-full md:max-w-[45%] lg:max-w-[500px]">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <p>Total</p>
              <p>${getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)}</p>
            </div>
          </div>
          <button type="submit" onClick={placeOrder} className="mt-6 w-full bg-[#FF6347] text-white py-3 rounded-md text-lg font-medium hover:bg-red-600 transition">
            PROCEED TO PAYMENT  
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;