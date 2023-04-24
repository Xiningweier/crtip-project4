import Room from "../models/Room.js";
import confirmb from "../models/confirmb.js";


export const deleteconfirmb=async(req,res,next)=>{
  const orderId = req.params.id;

  try {
    // 1. 获取订单信息
    const order = await confirmb.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "订单不存在" });
    }

    const roomId = order.bid;
    const roomNumber = order.rn;
    const startDate = new Date(order.sdate);
    const endDate = new Date(order.edate);

    // 2. 获取房间信息，并将 unavailableDates 数据清空
    const room = await Room.findOneAndUpdate(
      { _id: roomId, "roomNumbers.number": roomNumber },
      { $set: { "roomNumbers.$.unavailableDates": [] } },
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


  
