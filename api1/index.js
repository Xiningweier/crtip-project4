import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from"./routes/auth.js"
import usersRoute from"./routes/users.js"
import hotelsRoute from"./routes/hotels.js"
import roomsRoute from"./routes/rooms.js"
import cookieParser from "cookie-parser";
import contactRoute from "./routes/contact.js"
import confirmbRoute from "./routes/confirmb.js"
import cors from "cors";

// 构建一个提供 API 接口的后端服务器，可以通过客户端请求来访问数据库中的数据
const app=express()
dotenv.config()
const connect=async() =>{
    try {

        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    } catch (error) {
        throw error;
    }

};

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected")
    
})

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})

app.get('/', (req, res) =>{
    res.send("Hello")

})

//middlewares
// 用来解决跨域资源共享问题的中间件。当前端通过AJAX请求访问其他域名下的API时，如果API所在的服务器与前端页面所在的服务器不在同一个域名下，就会出现跨域问题，这时候需要在API所在的服务器端进行跨域处理。CORS就是一种跨域解决方案，它通过在服务器端设置HTTP头来告诉浏览器，允许哪些跨域请求。app.use(cors())中的cors()是一个第三方库，用于自动设置CORS相关的HTTP头，使得API接口可以被跨域访问。
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/contact",contactRoute)
app.use("/api/confirmb",confirmbRoute)

app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500;
    const errorMessage=err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

const port = process.env.PORT || 8800;
const host = '0.0.0.0'
  
app.listen(port,host,()=>{
    connect()
    console.log("connected to backend")
})