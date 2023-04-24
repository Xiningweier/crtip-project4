import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../footer/Footer"
import MailList from "../mailList/MailList"
import Navbar from "../navbar/Navbar"
import "./help.css"
import Worldly from "./images/Worldly.jpg"
const Help =()=>{
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
        alert("我们将很快与您联系并解决您的疑问...")  
      };
    return(
        <div>
            <Navbar/>
            <div className="terms1">
            {/* <img className="logo5" src={Worldly} alt="" /> */}
            <h1  style={{textAlign:"center", fontSize:"40px", margin:"20px"}} className="mailTitle">需要帮助吗？</h1>
            <div style={{margin:"20px"}}className="mail">
            <form>
            <input className="tp" type="email"   placeholder="请输入您的邮箱" required id="email"
        onChange={handleChange} />
            <input className="tp"  type="tel"   placeholder="请输入您的手机号" required id="ph"
        onChange={handleChange} />
            <input className="tp"  type="tel"   placeholder="请输入您的问题." required id="ph"
        onChange={handleChange} />
            <button className="headerBtn"  onClick={handleclick} required>提交</button>
            </form>
            </div>
            </div>
            {/* <MailList/> */}
            <br />
        <br />
            <div className="ft">
            <Footer/>
            </div>
        </div>
    )
}

export default Help