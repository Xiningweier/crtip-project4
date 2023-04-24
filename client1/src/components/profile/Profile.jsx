import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./profile.css";
import Worldly from "./images/logo.png";
import { faFolderarrowup, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Tabs } from "antd";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/confirmb"
  );
  // 加载所有的房间信息
  const { data: Room, loading: roomLoading, error: roomError } = useFetch("http://localhost:8800/api/rooms");
  // 方案二：可以切换
  const [showExpired, setShowExpired] = useState(false);

  const filteredData = data
    .filter((obj) => obj.un === user.username)
    .filter((obj) =>
      showExpired
        ? new Date(obj.edate) < new Date()
        : new Date(obj.edate) >= new Date()
    );
// 取消订单按钮的响应函数
  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8800/api/confirmb/${orderId}`);
      alert("订单已取消");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("服务器错误");
    }
  };
  // 根据房间id获得价格：前提是酒店房间和酒店的原始价格都一样
  const getRoomPrice = (roomId) => {
    const room = Room.find(r => r._id === roomId);
    if (room) {
      return room.price;
    }
    return null;
  };

// 用户目前的金额
  const totalPrice = filteredData.reduce((acc, obj) => {
    if (Room && Room.find((room) => room._id === obj.bid)) {
      const price = Room.find((room) => room._id === obj.bid).price;
      const nights = Math.ceil(
        (new Date(obj.edate) - new Date(obj.sdate)) / (24 * 60 * 60 * 1000)
      );
      return acc + price * nights;
    } else {
      return acc;
    }
  }, 0);

  return (
    <div className="mainContainer">
      {/* <div className="contentArea"> */}
      <div className="right">
        <h1>个人信息</h1>
        <img
          required
          className="img"
          src={user.img ? user.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
          alt=""
        />
        <div className="details">
          <h1 className="itemTitle">{user.username}</h1>
          <div className="detailItem">
            <span className="itemKey">邮箱：</span>
            <span className="itemValue">{user.email}</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">手机号：</span>
            <span className="itemValue">{user.phone}</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">国家：</span>
            <span className="itemValue">{user.country}</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">城市：</span>
            <span className="itemValue">{user.city}</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">总消费：</span>
            <span className="itemValue">￥{totalPrice}</span>
          </div>
          <div className="detailItem">
            <span className="itemKey">余额：</span>
            <span className="itemValue">￥{20000-totalPrice}</span>
          </div>
        </div>
        <h2>订单信息</h2>
        <div>
          <button
            onClick={() => setShowExpired(!showExpired)}
            style={{
              backgroundColor: showExpired ? "red" : "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "8px",
              cursor: "pointer",
              width: "200px",
              margin: "7px",
            }}
          >
            {showExpired ? "已过期订单" : "未过期订单"}
          </button>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : filteredData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>酒店名称</th>
                  <th>房间号</th>
                  <th>开始日期</th>
                  <th>终止日期</th>
                  <th>单价</th>
                  <th>总价</th>
                  <th>是否过期</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((obj) => (
                  <tr key={obj._id}>
                    <td>{obj.hn}</td>
                    <td>{obj.rn}</td>
                    <td>{obj.sdate}</td>
                    <td>{obj.edate}</td>
                    <td>
                        {Room && Room.find((room) => room._id === obj.bid) ? (
                          Room.find((room) => room._id === obj.bid).price // 确保 Room 不为 undefined 才继续操作
                        ) : (
                          "N/A"
                        )}
                    </td>
                    <td>
                        {Room && Room.find((room) => room._id === obj.bid) ? (
                          Room.find((room) => room._id === obj.bid).price * Math.ceil((new Date(obj.edate) - new Date(obj.sdate)) / (24*60*60*1000)) // 计算总价
                        ) : (
                          0
                        )}
                    </td>
                    <td>
                      {new Date(obj.edate) < new Date() ? (
                        <span style={{ color: "red" }}>已过期</span>
                      ) : (
                        <span style={{ color: "green" }}>未过期</span>
                      )}
                    </td>
                    <td>
                    {new Date(obj.edate) >= new Date() && (
                      <button style={{width:"100px"}} onClick={() => handleCancelOrder(obj._id)}>
                        取消订单
                      </button>
                    )}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>暂无数据.</div>
          )}
        </div>
      </div>

      <div className="left">
        <img
          className="logol"
          style={{ width: "180px" }}
          src={Worldly}
          alt=""
        />
        <h1>您好 {user.username}!</h1>
        <button>
          <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
            主页
          </NavLink>
        </button>
        <button>
          <NavLink
            to="/edituser"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            退出
          </NavLink>
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Profile;
