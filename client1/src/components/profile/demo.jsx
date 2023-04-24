import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Tabs } from "antd";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/confirmb"
  );
  const { Room, loading1, error1 } = useFetch("http://localhost:8800/api/rooms");
  // 方案二：可以切换
  const [showExpired, setShowExpired] = useState(false);
  const filteredData = data
    .filter((obj) => obj.un === user.username)
    .filter((obj) =>
      showExpired
        ? new Date(obj.edate) < new Date()
        : new Date(obj.edate) >= new Date()
    );
  
    // 根据roomid查找酒店的价格
  const getRoomPrice = (roomId) => {
    const room = Room.find(r => r._id === roomId);
    if (room) {
      return room.price;
    }
    return null;
  };

  return (
    <div className="mainContainer">
        <h2>订单信息</h2>
        <div>
          {/* 设置过期与否的按钮 */}
          <button
            onClick={() => setShowExpired(!showExpired)}
            style={{ backgroundColor: showExpired ? "red" : "green", color: "white", border: "none", borderRadius: "4px",
              padding: "8px", cursor: "pointer", width: "200px",margin: "7px",}}>
            {showExpired ? "已过期订单" : "未过期订单"}
          </button>
          {/* 加载并判断数据 */}
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
                  <th>价格</th>
                  <th>是否过期</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((obj) => (
                  <tr key={obj._id}>
                    <td>{obj.hn}</td>
                    <td>{obj.rn}</td>
                    <td>{obj.sdate}</td>
                    <td>{obj.edate}</td>
                    <td>{getRoomPrice(obj.bid)}</td>
                    <td>
                      {new Date(obj.edate) < new Date() ? (
                        <span style={{ color: "red" }}>已过期</span>
                      ) : (
                        <span style={{ color: "green" }}>未过期</span>
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
  );
};

export default Profile;
