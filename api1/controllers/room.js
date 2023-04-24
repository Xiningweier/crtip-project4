import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// 源码：正常更新添加的UTC时间
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};


// 我自己修改的：把保存的时间往前面调节了8个小时 以实现UTC+8
// export const updateRoomAvailability = async (req, res, next) => {
//   try {
//     const roomId = req.params.id;
//     const dates = req.body.dates.map((date) => {
//       const newDate = new Date(date);
//       newDate.setHours(newDate.getHours() + 8);
//       return newDate.toISOString();
//     });
//     await Room.updateOne(
//       { "roomNumbers._id": roomId },
//       {
//         $push: {
//           "roomNumbers.$.unavailableDates": dates
//         },
//       }
//     );
//     res.status(200).json("Room status has been updated.");
//   } catch (err) {
//     next(err);
//   }
// };

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

// 删除订单 并且修改room的roomnumber里面的unavailableDates数据
export const deleteRoom1=async(req,res,next)=>{
  // 路由里获取订单的id
  const roomId = req.params.id;
  
  try {
    // 1 删除这个房间在酒店里的信息
    await Hotel.findOneAndUpdate(
      { rooms: roomId },
      { $pull: { rooms: roomId } },
      { new: true }
    )
    // 2 删除这个酒店
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "服务器错误" });
  }

}

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
export const getselectedRooms = async (req, res, next) => {
  try {
    const rooms = await Room.findById(req.params.id);
    const list = await Promise.all(
      rooms.roomNumbers.map((number) => {
        return Room.findById(number);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

