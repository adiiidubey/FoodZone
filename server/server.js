import express from "express"
import cors from "cors"
import  {ConnectDB}  from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import path from "path";
import { fileURLToPath } from "url"; 
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//app config
const app=express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors());
  
  
app.use(express.urlencoded({ extended: true }));


//db connection
ConnectDB();


//api endpoints
app.use("/api/food",foodRouter)
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("Api working")
})


app.listen(port,()=>{
    console.log(`server started at ${port} sucessfully `)
})

