import Footer from "../footer/Footer";
import MailList from "../mailList/MailList";
import Navbar from "../navbar/Navbar";
import "./contact.css";
import Worldly from "./images/ctrip.jpg";


const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="terms">
      <img className="logo5" src={Worldly} alt="" />

      </div>
      <br />
      <br />

      <div className="ft">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
