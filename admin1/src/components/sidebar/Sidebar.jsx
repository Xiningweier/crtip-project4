import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Worldly from "./images/logo1.png"
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';

const Sidebar = () => {
  const { user }=useContext(AuthContext)
  
  const navigate = useNavigate();
  const handleclick=()=>{
    navigate("/users/test")
  }
  const handleClicK=()=>{
    navigate("/")
  }
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
        <img className="logo" src={Worldly} alt="" />
          <span className="logo">携程福礼</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">主页</p>
          <li>
            <DashboardIcon className="icon" />
            <span onClick={handleClicK}>Logo</span>
          </li>
          <p className="title">数据列表</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>用户</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>酒店</span>
            </li>
          </Link>
          
          <Link to="/rooms" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>房间</span>
          </li>
          </Link>
          <Link to="/confirmb" style={{ textDecoration: "none" }}>
          <li>
            <SwipeRightIcon className="icon" />
            <span>订单</span>
          </li>
          </Link>
          {/* <Link to="/contact" style={{ textDecoration: "none" }}>
          <li>
            <SubscriptionsIcon className="icon" />
            <span>维护人员</span>
          </li>
          </Link> */}

          <p className="title">管理员信息</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <button className="navButton" onClick={handleclick}>个人信息</button>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            { 
                 user ?( <div  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}> <span className="username"> 您好,{user.username}</span>
                  
                 <button className="navButton" onClick={handleClick}>退出</button> 
                 </div>  
                   ) :  (
                    <div className="navItems">
                    
                    <button className="navButton"><NavLink
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                登录
              </NavLink></button>
                </div>)}
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
