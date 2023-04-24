import express, { application } from "express";
import { createconfirmb, deleteconfirmb, getconfirmb } from "../controllers/confirmb.js";

const router=express.Router();

// HTTP PUT 请求路径为 /create，调用 createconfirmb 控制器函数处理
router.put("/create",createconfirmb)

// HTTP GET 请求路径为 /，调用 getconfirmb 控制器函数处理。
router.get("/",getconfirmb);

//delete ，调用 deleteconfirmb 控制器函数处理，:id 表示该路由需要一个参数，可以通过 req.params.id 获取。
router.delete("/:id",deleteconfirmb);

export default router