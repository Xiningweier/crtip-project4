import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import Worldly from "./images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img className="logol" src={Worldly} alt="" />
        <h2 className="lContainer-title">欢迎</h2>
        <input
          type="text"
          className="lInput"
          placeholder="用户名"
          id="username"
          onChange={handleChange}
        />
        <input
          type="password"
          className="lInput"
          placeholder="密码"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          登录
        </button>
        <span className="shr">
          <NavLink
            to="/register"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <span className="sh1"> 注册新用户</span>
          </NavLink>
          <NavLink
            to="/forgot"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <span className="sh1">忘记密码</span>
          </NavLink>
        </span>

        {error && <span className="message">{error.message}....</span>}
      </div>
    </div>
  );
};
export default Login;
