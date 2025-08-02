import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();




const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
  
  try {
    const { userId, items, amount, address } = req.body;

    const order = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await order.save();
  

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const payment = async (req, res) => {
  
  
  try {
    const { amount, orderId } = req.body;
    

    const options = {
      amount: amount , // Razorpay expects amount in paise
      currency: "INR",
      receipt: orderId,
      
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order:order,orderId:orderId });
  } catch (error) {
   
    res.status(500).json({ success: false, message: error.message });
  }
  console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

};

const verify = async (req, res) => {
  console.log("Verifying payment...");

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId ,userId} = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // Step 1: Generate HMAC Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Step 2: Compare Signatures
    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Step 3: Fetch Payment Details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    console.log("Payment Details:", paymentDetails);

    // Step 4: Ensure the payment is successful
    if (paymentDetails.status !== "captured") {
      await orderModel.findByIdAndUpdate(orderId, { payment: false, status: "Failed" });
      return res.status(400).json({ success: false, message: "Payment was not successful" });
    }

    // Step 5: Update Order as Paid
    await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Confirmed" });
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    return res.json({ success: true, message: "Payment verified successfully" });

  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export { placeOrder, payment, verify };
