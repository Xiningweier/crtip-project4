import express from "express";
import {login, register} from "../controllers/auth.js";
const router=express.Router();

// 登录注册有两个路由 定义了两个路由路径 /register 和 /login
router.post("/register",register);
router.post("/login",login);

export default router