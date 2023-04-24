import "./login.scss"

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import Worldly from "./images/logo.png"


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
// 阻止默认事件，以便自行处理表单的提交事件。
// 使用 useContext 钩子从 AuthContext 中获取 dispatch 函数和 loading、error 属性。
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "抱歉，您没有权限！" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">        
            <div className="lContainer">
            <h1> 管理员</h1>              
                <img className="logol" src={Worldly} alt="" />               
                <input type="text" className="lInput" placeholder="用户名" id="username" onChange={handleChange} />
                <input type="password" className="lInput" placeholder="密码" id="password" onChange={handleChange} />
                <button disabled={loading} onClick={handleClick} className="lButton">登录</button>
                {error && <span className="message">{error.message}....</span>}
            </div>
        </div>
  );
};

export default Login;