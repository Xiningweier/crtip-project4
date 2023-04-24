import Room from "../models/Room.js";
import confirmb from "../models/confirmb.js";


export const createconfirmb = async(req,res,next)=>{
    const newConfirmb=new confirmb(req.body)
    try{
        const savedConfirmb=await newConfirmb.save()
        res.status(200).json(savedConfirmb);
    }catch(err){
        next("err")
    }

}


export const getconfirmb = async(req,res,next)=>{
    try{
        const a=await confirmb.find()
        res.status(200).json(a);
    }catch(err){
        next(err)
    }

}

// 只能删除订单 但不能增加库存
export const deleteconfirmb1=async(req,res,next)=>{
    const roomId = req.params.roomid;
    // const start = req.params.sdate;
    // const end = req.params.edate;
    try{
        await confirmb.findByIdAndDelete(req.params.id);
        try {
            await Room.findByIdAndUpdate(roomId, {
            $set: { 'roomNumbers.$[].unavailableDates': [] }
            }, { new: true });
          } catch (err) {
            next(err);
          }
        res.status(200).json("confirmb has been deleted.");
    }catch(err){
        next(err);
    }
}

// 删除订单 并且修改room的roomnumber里面的unavailableDates数据
export const deleteconfirmb=async(req,res,next)=>{
    // 路由里获取订单的id
    const orderId = req.params.id;

    try {
        // 1. 获取订单信息
        const order = await confirmb.findById(orderId);
        if (!order) {
        return res.status(404).json({ error: "订单不存在" });
        }
    //   从订单信息中获取房间信息：房间id 房间号码 日期
        const roomId = order.bid;
        const roomNumber = order.rn;
        const startDate = new Date(order.sdate);
        const endDate = new Date(order.edate);
        console.log(startDate)
        console.log(endDate)

        // 2. 获取房间信息，并将 unavailableDates 数据清空
        const room = await Room.findOneAndUpdate(
        { _id: roomId, "roomNumbers.number": roomNumber },
        // 清空所有时间日期
        { $set: { "roomNumbers.$.unavailableDates": [] } },
        // 清空起始日期到终止日期的所有日期
        // {
        //     $pull: {
        //       "roomNumbers.$.unavailableDates": {
        //         $gte: startDate,
        //         $lte: endDate,
        //       },
        //     },
        // },
        { new: true }
        );
        if (!room) {
        return res.status(404).json({ error: "房间不存在" });
        }

        // 3. 从订单数据库中删除订单
        await confirmb.findByIdAndDelete(orderId);
        res.json({ message: "订单已取消" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "服务器错误" });
    }
}





