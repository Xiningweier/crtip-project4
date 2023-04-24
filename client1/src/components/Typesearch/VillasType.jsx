import Footer from "../footer/Footer"
import Header from "../header/Header"
import Navbar from "../navbar/Navbar"
import "./villastype.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {faHotel,faHouseUser,faBuildingColumns,faUmbrellaBeach,faPercent, faPlane, faTicket, faTrain} from "@fortawesome/free-solid-svg-icons"
import {faPlaneDeparture} from "@fortawesome/free-solid-svg-icons"
import {faCar} from "@fortawesome/free-solid-svg-icons"
import {faMountainCity} from "@fortawesome/free-solid-svg-icons"
import {faTaxi} from "@fortawesome/free-solid-svg-icons"
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons"
import {faPerson} from "@fortawesome/free-solid-svg-icons"
import {DateRange} from "react-date-range"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css filenp
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {format} from "date-fns"
import { useContext } from "react"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import MailList from "../mailList/MailList"
import Worldly from "./image1/ctrip.jpg";

const VillasType=({type})=>{

    const { user }=useContext(AuthContext)
    const [openDate,setOpenDate]=useState(false)
    const [destination,setDestination]=useState("")
    

    const [dates,setDates]=useState([
        {
        startDate:new Date(),
        endDate:new Date(),
        key:"selection"
        },
    ]);
    const [openOptions,setOpenOptions]=useState(false)
    const [options,setoptions]=useState({
        adult:1,
        children:0,
        room:1,

    });
    const navigate=useNavigate()
    const handleOptions=(name,operation)=>{
        setoptions(prev=>{
            return{

                ...prev,
                [name]:operation === "i" ? options[name] +1 :options[name] -1,
            };
        });
    }
    const {dispatch}=useContext(SearchContext)
    const handleInput=()=>{
        if(destination==""){
            alert("Please enter destination")
        }else{
            handleSearch()
        }
    }
    const handleSearch=()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
        navigate("/typevillaslist",{state:{destination,dates,options}})

    }
    return(
        
        <div>
            <Navbar/>
            <div className="header-villa">
            <div className={type ==="list" ? "headerContainer listMode" :"headerContainer"}>

            <div className="headerList">
                    <div className="headerListItem active">
                    <FontAwesomeIcon icon={ faHouseUser} />
                    <span>
                    <NavLink
              to="/"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              主页
            </NavLink>
                    </span>

                    </div>
                    <div className="headerListItem">
                    <FontAwesomeIcon icon={ faHotel} />
                    <span>
                    <NavLink
              to="/allhotels"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              酒店
            </NavLink>
                    </span>
                    
                    </div>
                    <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane}/>
                    <span>
                    <NavLink
              to="/allapartments"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              飞机票
            </NavLink>
                    </span>
                    </div>
                    <div className="headerListItem">
                    <FontAwesomeIcon icon={ faTrain} />
                    <span>
                    <NavLink
              to="/allvillas"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              火车票
            </NavLink>
                    </span>
                    
                    </div>
                    <div className="headerListItem">
                    <FontAwesomeIcon icon={faUmbrellaBeach} />
                    <span>
                    <NavLink
              to="/allresorts"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              跟团游
            </NavLink>
            </span>
                    </div>
                    <div className="headerListItem">
                    <FontAwesomeIcon icon={faTicket} />
                    <span>
                    <NavLink
              to="/offers"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              门票
            </NavLink>
                    </span>
                    
                    </div>
                </div>
                { type !=="list" &&
                
                <>
                <h1 className="headerTitle">除了工作 旅行也是一种生活</h1>
                <p className="headerDesc">携程福礼 与您同行</p>
                {! user &&  <button  className="headerBtn">
                <NavLink
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
              Sign in/ Register
              </NavLink>
                    </button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faHotel} className="headerIcon" />
                   
                   <input type="text"  placeholder="请输入目的地" className="headerSearchInput" onChange={e=>setDestination(e.target.value)} />
                    </div>
                    <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                    <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate,"dd/MM/yyyy")} 至 ${format(dates[0].endDate,"dd/MM/yyyy")} `}</span>
                    {openDate &&<DateRange
                    editableDateInput={true}
                    onChange={(item) =>setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date" minDate={new Date()}
                    />}
                    </div>
                    <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                    <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchInput"> {`${options.adult} 成人 ${options.children} 孩子${options.room} 房间`}</span>
                    { openOptions &&<div className="options">
                        <div className="optionItem">
                            <span className="optionText">成人</span>
                            <div className="optionCounter">
                                <button  disabled={options.adult<=1} className="optionCounterButton" onClick={( )=> handleOptions("adult","d")}>-</button>
                                <button className="optionCounterNumber">{options.adult}</button>
                                <button className="optionCounterButton" onClick={( )=> handleOptions("adult","i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">孩子</span>
                            <div className="optionCounter">
                                <button  disabled={options.children<=0 }className="optionCounterButton" onClick={( )=> handleOptions("children","d")}>-</button>
                                <button className="optionCounterNumber">{options.children}</button>
                                <button className="optionCounterButton" onClick={( )=> handleOptions("children","i")}>+</button>
                            </div>
                        </div>
                        <div className="optionItem">
                            <span className="optionText">房间</span>
                            <div className="optionCounter">
                                <button disabled={options.room <=1} className="optionCounterButton" onClick={( )=> handleOptions("room","d")}>-</button>
                                <button className="optionCounterNumber">{options.room}</button>
                                <button className="optionCounterButton" onClick={( )=> handleOptions("room","i")}>+</button>
                            </div>
                        </div>
                    </div>}
                    </div>
                    <div className="headerSearchItem">
                    <button className="headerBtn" onClick={handleInput}>Search</button>
                    </div>
                </div></>}
            </div>
        </div>
            <div className="homeContainer">
            {/* <div><h1>输入城市以获得火车票...</h1></div> */}
            <h1 style={{marginLeft:"60px"}}>对不起，暂未开通火车票购买服务</h1>
            <img className="logo-train" src={Worldly} alt="" />
                <Footer/></div>
        </div>

    )
}
export default VillasType