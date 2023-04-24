import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// register和login，这些函数都是用来处理来自客户端的HTTP请求的

// 是用来处理用户注册请求的。生成一个加密的密码哈希值。
export const register=async(req,res,next)=>{
    try{
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const newUser=new User({
            ...req.body,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been created.")
    }catch(err){
        next(err);
    }
}

// 是用来处理用户登录请求的。如果密码匹配，它使用jsonwebtoken库中的sign方法创建一个JSON Web Token（JWT），其中包含用户的ID和isAdmin属性。
export const login=async(req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"用户不存在！"))
        const isPasswordCorrect= await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect)
            return next(createError(400,"密码错误！"))
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
        const {password,isAdmin,...otherDetails}=user._doc;
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({details:{...otherDetails},isAdmin})
    }catch(err){
        next(err);
    }
}