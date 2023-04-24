import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./mailList.css"
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const MailList=()=>{
  const { user }=useContext(AuthContext)
  const  navigate=useNavigate()
    const [credentials, setCredentials] = useState({
    
        email: undefined,
        ph: undefined,
        
      });
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };
      const handleinput=(e)=>{
        if(credentials.email==""){
          alert("请输入您的邮箱和手机号")
        }else{
          handleclick()
          alert("订阅成功！")
        }
      }
 
      const handleclick = async (e) => {
        try {
          const res = await axios.put(
            "http://localhost:8800/api/contact/create",
            credentials
          );
          
        } catch (error) {
          
        }
        navigate("/")
        //alert("Subscribed Successfully..")
      };

    return(
        <div className="mail">
            <h1 className="mailTitle">推荐超优惠</h1>
            <span className="mailDesc">订阅精选！</span>
            <div className="mailInputContainer">
                <form>
                     <input className="tp" type="email"   placeholder="请输入您的邮箱" required id="email"
        onChange={handleChange} />
                     <input className="tp"  type="tel"   placeholder="请输入您的手机号" required id="ph"
        onChange={handleChange} />
                <button className="headerBtn"  onClick={handleclick} required>订阅！</button>
                </form>
            </div>
        </div>
    )  
}
export default MailList
