import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Forgot.css";
import Worldly from "./images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Forgot = () => {
  const { data, loading, error } = useFetch(`http://localhost:8800/api/users/`);
  const [credentials, setCredentials] = useState("");
  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    data.forEach((element) => {
      if (credentials == element.email) {
        setUserid(element._id);
        setUsername(element.username);
      }
    });
    alert("验证成功！");
  };

  const handleclick = async (e) => {
    e.preventDefault();
    // if(userid==""){
    //     alert("电子邮件无效！")
    // }else{
    //     alert("验证通过！")
    //     navigate("/forgotid",{state:{userid,username}}) ;
    // }
    alert("验证通过！");
    navigate("/forgotid", { state: { userid, username } });
  };

  return (
    <div className="login-page">
      <div className="login-lContainer">
        <img className="logol" src={Worldly} alt="" />
        <h1>欢迎！</h1>
        <p className="login-sp"> 请输入您的邮箱，来完成密码重置 </p>
        <input
          type="text"
          className="login-lInput"
          placeholder="Email"
          id="email"
          onChange={(e) => setCredentials(e.target.value)}
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          {" "}
          验证您的电子邮件
        </button>
        <button disabled={loading} onClick={handleclick} className="lButton">
          重置密码
        </button>
      </div>
    </div>
  );
};
export default Forgot;
