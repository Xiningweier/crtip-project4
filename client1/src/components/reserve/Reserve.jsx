import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch.js";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [pr, setpr] = useState("");
  // 获取这个酒店的所有房间数据
  const { data } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`);
  // 过滤掉里面null的对象 防止删除房间报错
  const filteredData = data.filter((item) => item !== null);
//  获取搜索数据 进行搜索检查
  const {dates,options}=useContext(SearchContext)

  const MILLISECONDS_PER_DAY=1000*60*60*24;
    function dayDifference(date1,date2){
        const timeDiff=Math.abs(date2.getTime()-date1.getTime());
        const diffDays=Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
        return diffDays;
    };
    var days=(dayDifference(dates[0].endDate,dates[0].startDate))
    if(days==0){
        days=days+1
    }
  // 初始代码
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  // 如果在 unavailableDates 中存在至少一个日期已经被预订，则函数返回 false，表示该房间不可预订；否则，函数返回 true，表示该房间可以预订
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
// 这个函数是处理当用户勾选或取消勾选房间时的操作。当用户点击复选框时，该函数会获取复选框的状态和值。如果复选框被选中，将值添加到selectedRooms数组中，如果复选框被取消选中，则从数组中删除该值。这里使用了三元运算符来判断当前是否需要添加或删除该值，并使用setSelectedRooms函数将修改后的数组保存到selectedRooms中
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
   
  };
 
  const navigate = useNavigate();

  // 修改 保存到服务器的时间+8
  // const selectedDate = new Date(date);
  // selectedDate.setHours(selectedDate.getHours() + 8);

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          //navigate(`/book/${selectedRooms}`)
          navigate(`/hotels/room/book/${selectedRooms}`,{state:{selectedRooms,hotelId}})
          return res.data;    
        })
      );
      console.log(pr);
      setOpen(false);
     // navigate("/")
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>请选择你心水的房间:</span>
        {filteredData.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
            <div className="rTitle">房间号:</div>
            <div className="rTitle">{item._id}</div>
            <hr />
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                人数: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">价格:{days*item.price*options.room}/{days} 天</div>
            </div>
            {/* 这段代码是在一个循环中渲染酒店房间的信息。对于每个房间，它会显示房间号并检查该房间是否可用。如果房间不可用，即已被预订，则会显示 "booked"。如果房间可用，则会显示一个复选框，表示客人可以选择该房间进行预订。复选框的值设置为房间的唯一标识符（_id）。当复选框被选中或取消选中时，会调用 handleSelect 函数，它会更新 selectedRooms 数组。 */}
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  {!isAvailable(roomNumber) ? "booked":(<input 
                    type="checkbox" 
                    value={roomNumber._id}
                    onChange={handleSelect}
                    //hidden={!isAvailable(roomNumber)} 
                  />
                  )} 
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          预订
        </button>
      </div>
    </div>
  );
};

export default Reserve;