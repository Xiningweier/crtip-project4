import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Forgotid.css";
import Worldly from "./images/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Forgotid = () => {
  const location = useLocation();
  const [userid, setUserid] = useState(location.state.userid);
  const [username, setUsername] = useState(location.state.username);

  const [credentials, setCredentials] = useState({
    password: undefined,
    password2: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  //   Handle Change Function
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //   Handle Click Function
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (credentials.password == credentials.password2) {
        const res = await axios.put(
          `http://localhost:8800/api/users/update/${userid}`,
          credentials
        );
        navigate("/");
      } else {
        alert("密码不匹配!");
      }
    } catch (err) {}
  };

  return (
    <div className="login-page">
      <div className="login-lContainer">
        <img className="logol" src={Worldly} alt="" />
        <h1>欢迎!</h1>
        <span className="sp">您好,{username}</span>
        <input
          type="password"
          className="login-lInput"
          placeholder="请输入新密码"
          id="password"
          onChange={handleChange}
        />
        <input
          type="password"
          className="login-lInput"
          placeholder="再次输入新密码"
          id="password2"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          提交
        </button>
      </div>
    </div>
  );
};
export default Forgotid;
