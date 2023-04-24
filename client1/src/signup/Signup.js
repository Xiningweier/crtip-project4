import axios from "axios";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Signup.css";
import Worldly from "./images/Worldly.jpg"
import logo1 from "./images/海豚.png"
import {faFolderarrowup, faUpload} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    phone: undefined,
    city: undefined,
    address:undefined,
    country: undefined,
    password: undefined,
    // 管理员信息？
    isAdmin: false,
  });
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  

  //   Handle Change Function
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleclick=()=>{
    if(file==""){
      
      alert("Please Insert Your Image...")
    }else{
      handleClick()
    }
  }

  //   Handle Click Function
  const handleClick = async (e) => {
    dispatch({ type: "REGISTER_START" });
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
    
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/duwvvwmdg/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newUser = {
        ...credentials,
        
        img: url,
      };
      const res = await axios.post(
        "http://localhost:8800/api/auth/register",newUser
      );
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error.response.data });
    }
    navigate("/login");
      
  };
  
  return (
    <div className="mainContainer-page">
      <div className="contentArea">
        <div className="right-my">
          <h3>注册</h3>
          <img required className="img"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://i.ibb.co/MBtjqXQ/no-avatar.gif" 
              }
              alt="avatar"
            />
            <label htmlFor="file">
                  头像: <FontAwesomeIcon icon={ faUpload} />
                </label>
                <form>
                <input
                  type="file"
                  id="file"
                  
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                  required
                />
                </form>
          
          <form>
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="用户名"
              id="username"
              onChange={handleChange}
              required
            />
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="email"
              placeholder="邮箱"
              id="email"
              onChange={handleChange}
              required
            />

            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="手机号"
              id="phone"
              onChange={handleChange}
              required
            />

            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="城市"
              id="city"
              onChange={handleChange}
              required
            />
            
            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="text"
              placeholder="国籍"
              id="country"
              onChange={handleChange}
              required
            />

            <input
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                outline: "none",
                backgroundColor: "#ddd",
                borderRadius: "5px",
              }}
              type="password"
              placeholder="密码"
              id="password"
              onChange={handleChange}
              required
            />
            {/* 自己改的：注册为管理员？ */}
            <label>
            <input
              type="checkbox"
              checked={credentials.isAdmin}
              onChange={(e) =>
                setCredentials({ ...credentials, isAdmin: e.target.checked })
              }
            />
            注册为管理员
            </label>

            <button disabled={loading} onClick={handleclick}>
              注册
            </button>
            {error && <span>{error.message}</span>}
          </form>
        </div>
        <div className="left-my">
        <img className="logol" src={logo1} alt="" />
          <h1>欢迎!</h1>
          <span style={{ padding: "20px 0" }}>携程福礼 伴你同行！</span>
          <button>
            <NavLink
              to="/login"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              登录
            </NavLink>       
          </button>
          <button>
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              主页
            </NavLink>    
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;