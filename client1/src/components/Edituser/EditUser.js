import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./Edituser.css"
import Worldly from "./images/Worldly.jpg"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

const EditUser=()=>{
    const { user }=useContext(AuthContext)

const [credentials1, setCredentials1] = useState({
    username:undefined,
    email:undefined,
    phone:undefined,
    country:undefined,
    city:undefined,
    password:undefined,
});

const { loading, error, dispatch } = useContext(AuthContext);
const navigate = useNavigate();
//   Handle Change Function
const handleChange = (e) => {
e.preventDefault()
setCredentials1((prev) => ({ ...prev, [e.target.id]: e.target.value }));

};

//   Handle Click Function
const handleClick = async (e) => {
e.preventDefault()
try{
    const res = await axios.put(
        `http://localhost:8800/api/users/update/${user._id}`,
        credentials1
        );     
}catch(err){
    
}
navigate("/login")

};
console.log(credentials1);
    return(
        <div className="login2">
            <div className="lContainer2">
            <h1  className="sp">您好</h1>
                {/* <img className="logol" src={Worldly} alt="" /> */}
                <span className="sp">您好,{user.username}请完成您的个人资料</span>           
                 <input type="text" className="lInput" placeholder="新用户名" id="username" onChange={handleChange} />
                <input type="email" className="lInput" placeholder="新邮箱" id="email" onChange={handleChange} />
                <input type="tel" className="lInput" placeholder="新手机号" id="phone" onChange={handleChange} />
                <input type="text" className="lInput" placeholder="新国家" id="country" onChange={handleChange} />
                <input type="text" className="lInput" placeholder="新城市" id="city" onChange={handleChange} />
                <input type="password" className="lInput" placeholder="新密码" id="password" onChange={handleChange} />
                <button disabled={loading} onClick={handleClick} className="lButton">提交</button>
                <button className="lButton">
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}>
              主页
            </NavLink>             
          </button>
            </div>
        </div>
    )
}
export default EditUser