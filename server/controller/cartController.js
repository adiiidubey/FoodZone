import userModel from "../models/userModel.js"

const addToCart=async(req,res)=>{
    console.log(req.headers)
try{
    let userData=await userModel.findOne({_id:req.body.userId});
    
    //console.log(userData);
    
   let cartData=await userData.cartData;
    
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]=1;
    }
    else{
        cartData[req.body.itemId]+=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Added to Cart"})
    

}
catch(error){
console.log(error);
res.json({success:false,message:"error"})
}
}

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData; // cartData should be an object

        if (cartData && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            // If the item count is zero, remove it from the cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            // Update user's cart in DB
            await userModel.findByIdAndUpdate(req.body.userId, { cartData });

            return res.json({ success: true, message: "Removed From Cart" });
        } else {
            return res.json({ success: false, message: "Item not in cart or already removed" });
        }
    } catch (error) {
        console.log("Error:", error);
        return res.json({ success: false, message: "Error removing item from cart" });
    }
};


// fetch user cart data
const getCart = async (req, res) => {
    try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success: true, cartData})
    } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error" })
    }
    }

export {addToCart,getCart,removeFromCart}