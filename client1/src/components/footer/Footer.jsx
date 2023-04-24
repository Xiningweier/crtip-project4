import { faCopyright, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
// import Worldly from "./images/Worldly.jpg"
import logo from "./images/logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Link
        to="/"
        style={{
          color: "inherit",
          textDecoration: "none",
          textAlign: "center",
        }}
      >
        <img className="logo1" src={logo} alt="" />
      </Link>{" "}
      <div className="fLists">
        <Link  to="/help">帮助</Link>
        <Link  to="/about">关于</Link>
        <Link  to="/terms">条款和条件</Link>
        <Link  to="/contact">联系我们</Link>
      </div>
      <div className="fText">
        <span className="sp123"> © Copyright 2023.携程福礼</span>
      </div>
    </div>
  );
};
export default Footer;
