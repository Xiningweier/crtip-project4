import Footer from "../footer/Footer"
import MailList from "../mailList/MailList"
import Navbar from "../navbar/Navbar"
import "./terms.css"
import Worldly from "./images/ctrip.jpg"
const Terms =()=>{
    
    return(
        <div>
            <Navbar/>
            <div className="terms">

            <img className="logo5" src={Worldly} alt="" />
            </div>
            <br />
            <br />
            <div className="ft">
            <Footer/>
            </div>
        </div>
    )
        
        
}

export default Terms