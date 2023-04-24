import "./booking.css";
import { format } from "date-fns";
import Worldly from "./images/logo.png";
import React, { useContext, useRef } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Booking() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let componentRef = useRef();
  const Print = (e) => {
    e.preventDefault();

    //console.log('print');
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(selectedRooms)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const location = useLocation();
  const [selectedRooms, setSelectedRooms] = useState(
    location.state.selectedRooms
  );

  //const [dates, setDates] = useState(location.state.dates);

  // const { data2 } = useFetch(`/hotels/${hotelId}`);

  // const [data, setData] = useState(location.state.data);
  // const { dates } = useContext(SearchContext);

  //const { data } = useFetch(`/book/${hotelId},${selectedRooms}`);
  //const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const [bids, setBids] = useState({
    bid: undefined,
    sdate: undefined,
    edate: undefined,
    un: undefined,
    ue: undefined,
    rn: undefined,
    hn: undefined,
  });
  const handleChange = (e) => {
    setBids((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleclick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8800/api/confirmb/create",
        bids
      );
    } catch (error) {}
    alert("支付成功..");
  };
  
  return (
    <div className="book-mainContainer">
      {/* <div className="contentArea"> */}
        <div className="right">
          {/* <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> */}
          {/* <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br /> */}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 style={{ whiteSpace: "nowrap" }}>请确认订单...</h1>
          <div className="details" id="printablediv">
            <hr className="hr2" />
            <span>
              <span className="itemKey">订单编号</span>
              <span value={selectedRooms}>
                {" "}
                <span onClick={handleCopyClick}>
                  {selectedRooms}{" "}
                  {isCopied ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faCopy} />
                  )}
                </span>
              </span>
            </span>
          </div>

           {/*  <div className="detailItem">
              <span className="itemKey">起始日期：</span>
              <span className="itemValue">{`  ${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )}`}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">终止日期：</span>
              <span className="itemValue">{`  ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">订单状态:</span>
              <span className="itemValue">已锁定</span>
            </div>
            <div className="detailItem"></div>
            <div className="detailItem">
              <span className="itemKey">用户名：</span>
              <span className="itemValue">{user.username}</span>
            </div>
            <div className="detailItem">
              <span className="itemKey">邮箱：</span>
              <span className="itemValue">{user.email}</span>
            </div>
            <div className="detailItem"> */}
              {/* <button onClick={Print}>确认支付</button> */}
              {/* <button  onClick={handleclick} >确认支付</button> */}
            {/* </div>
          </div> */}
          <div>
            <hr className="hr2" />
            <span className="itemKey1">请填写您的信息，并确认支付</span>
                  <form >
                  <span className="itemKey">房间id:</span>
                  <input className="tp1"  onChange={handleChange}  type="text" id="bid" required="true" />
                  <span className="itemKey">开始日期 :</span>
                  <input className="tp1"  onChange={handleChange} type="date" id="sdate" required="true" />
                  <span className="itemKey">终止日期 :</span>                
                  <input className="tp1" onChange={handleChange}  type="date" id="edate" required="true" />
                  <span className="itemKey">姓名 :</span>                  
                  <input className="tp1" onChange={handleChange} type="text" id="un" required="true" />
                  <span className="itemKey">邮箱 :</span>
                  <input className="tp1" onChange={handleChange} type="text" id="ue" required="true" />
                  <span className="itemKey"> 房间号码:</span>
                  <input className="tp1" onChange={handleChange} type="text" id="rn" required="true" />
                  <span className="itemKey"> 酒店名称</span>
                  <input className="tp1" onChange={handleChange} type="text" id="hn" required="true" />
              <button onClick={handleclick}>支付</button>
            </form>
          </div>
        </div>
        <div className="left">
          <img
            className="logol"
            style={{ width: "180px" }}
            src={Worldly}
            alt=""
          />
          <h1>您好!</h1>
          <button>
            <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              主页
            </NavLink>
          </button>
        </div>
      {/* </div> */}
    </div>
  );
}
export default Booking;
