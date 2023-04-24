import Footer from "../footer/Footer"
import Header from "../header/Header"
import Navbar from "../navbar/Navbar"
import "./offerstype.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {faHotel,faHouseUser,faBuildingColumns,faUmbrellaBeach,faPercent, faPlane, faTrain, faTicket} from "@fortawesome/free-solid-svg-icons"
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

const OffersType=({type})=>{
    const { user }=useContext(AuthContext)
    const [openDate,setOpenDate]=useState(false)
    const [destination,setDestination]=useState("")
    const [featured,setFeatured]=useState("")
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
            alert("请输入目的地")
        }else{
            handleSearch()
        }
    }
    const handleSearch=()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,dates,options}})
        navigate("/offerslist",{state:{destination,dates,featured,options}})
    }
    return(
        
        <div>
            <Navbar/>
            <div className="header-offer">
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
              登录/ 注册
              </NavLink>
                    </button>}
                <div className="headerSearch">
                    <div className="headerSearchItem">
                    <FontAwesomeIcon icon={faHotel} className="headerIcon" />           
                   <input type="text"  placeholder="请输入目的地" className="headerSearchInput" onChange={e=>setDestination(e.target.value)} />
                   <label className="headerSearchInput" >门票</label>
                   <input type="checkbox"   value={true} className="headerSearchInput" onChange={e=>setFeatured(e.target.value)} />
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
                    <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchInput"> {`${options.adult} 成人${options.children} 孩子${options.room} 房间`}</span>
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
                    <button className="headerBtn" onClick={handleInput}>搜索</button>
                    </div>
                </div></>}
            </div>
        </div>
            <div className="homeContainer">
            <div style={{width:"980px"}} className="searchItem-res">
          <img src="https://p1-q.mafengwo.net/s11/M00/54/C2/wKgBEFtRWgOAL6CtAAhBG3gnnaM20.jpeg?imageMogr2%2Fthumbnail%2F%21690x450r%2Fgravity%2FCenter%2Fcrop%2F%21690x450%2Fquality%2F90%7Cwatermark%2F1%2Fimage%2FaHR0cDovL21mdy1mYXN0ZGZzLTEyNTgyOTUzNjUuY29zLmFwLWJlaWppbmcubXlxY2xvdWQuY29tL3MxMS9NMDAvNDQvOUIvd0tnQkVGc1A1UnlBRHY3cEFBQUhaWlVQUmxROTkwLnBuZw%3D%3D%2Fgravity%2FSouthEast%2Fdx%2F10%2Fdy%2F11" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">上海迪士尼度假区</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>中国内地首座迪士尼主题乐园·欢迎来到一个前所未见的神奇世界</h3></span>
            </div>
            <span className="siDistance">上海市浦东新区川沙镇黄赵路310号</span>
            <div className="flex-line">
              <span className="siTaxiOp">米奇大街</span><span className="siTaxiOp">奇想花园</span><span className="siTaxiOp">梦幻世界</span>
            </div>
            <span className="siFeatures">★ 【七大乐园】米奇大街、奇想花园、梦幻世界、探险岛、宝藏湾、明日世界和迪士尼·皮克斯玩具总动员七大主题园区。</span>
            <span className="siFeatures">★ 【梦幻城堡】拥有世界上最大的迪士尼城堡“奇幻童话城堡”，可以在乐园内与众多迪士尼朋友互动，感受独特体验。</span>
            <span className="siFeatures">★ 【温馨建议】建议提前下载上海迪士尼度假区官方APP，查看乐园地图、等候时间、项目及演出时间、领取FP等。</span>
            <span className="siCancelOpSubtitle">开放时间：08:30-21:30</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">598/人起</span><button className="siCheckButton">选择</button></div>
          </div>
        </div>
        <div style={{width:"980px"}}className="searchItem-res">
          <img src="https://dimg04.c-ctrip.com/images/0302112000att7vv3E9E8_D_769_510_Q100.jpg" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">上海东方明珠塔</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>矗立与上海浦东陆家嘴·与外滩隔江相望·上海标志性建筑</h3></span>
            </div>
            <span className="siDistance">上海市浦东新区世纪大道1号/近二号线陆家嘴站</span>
            <div className="flex-line">
              <span className="siTaxiOp">观光电梯</span><span className="siTaxiOp">旋转餐厅</span>
            </div>
            <span className="siFeatures">★ 【超凡体验】由11个大小不一的球体串联一体，此设计来源于“大珠小珠落玉盘”的美妙意境。登上三个主球体，可站在不同的高度品赏浦江两岸的城市风光，尤其站在259米高度的全透明观光廊上，以“空中漫步”的独特方式欣赏申城全景。而夜晚登临观光层感受“不夜城”夜幕下的绚彩，更是难忘的享受。</span>
            <span className="siFeatures">★ 【选择多样】东方明珠还是娱乐、美食、博览以及购物的小世界。在塔座的上海城市历史发展陈列馆可以了解到上海近代历史的变迁。</span>
            <span className="siCancelOpSubtitle">开放时间：09:00-21:00</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">198/人起</span><button className="siCheckButton">选择</button></div>
          </div>
        </div>
        <div style={{width:"980px"}}className="searchItem-res">
          <img src="https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_D_769_510_Q100.jpg" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">上海海昌海洋公园</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>国家4A级旅游景区·公园紧密围绕海洋文化特色·5大主题区·1个海洋主题度假酒店</h3></span>
            </div>
            <span className="siDistance">上海市浦东新区银飞路166号</span>
            <div className="flex-line">
              <span className="siTaxiOp">4A景区</span><span className="siTaxiOp">萌萌动物</span><span className="siTaxiOp">深海奇航</span>
            </div>
            <span className="siFeatures">★ 【互动表演】为游客提供设备娱乐、电影、动物科普展示和水上巡游等娱乐活动，并提供独特的风貌，奇幻的深海秘境，震撼的熔岩奇景，非凡的探险体验及纷呈的互动表演。</span>
            <span className="siFeatures">★ 【酒店住宿】精心打造的"国内邮轮概念海洋主题度假酒店"也将同步亮相，包含5大海洋动物主题客房，360度全景天台，乐享非凡住宿体验。</span>
            <span className="siCancelOpSubtitle">开放时间：08:30-21:00</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">249/人起</span><button className="siCheckButton">选择</button></div>
          </div>
        </div>
        <div style={{width:"980px"}}className="searchItem-res">
          <img src="https://dimg03.c-ctrip.com/images/100g10000000oe8ej7579_D_769_510_Q100.jpg" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">上海野生动物园</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>大自然的美好向往与满满好奇·人与动物和谐共处</h3></span>
            </div>
            <span className="siDistance">上海浦东新区南六公路178号</span>
            <div className="flex-line">
              <span className="siTaxiOp">5A级旅游景区</span><span className="siTaxiOp">上万野生动物</span>
            </div>
            <span className="siFeatures">★ 【野生动物】园内步行区、车入区及“水域神秘”三大区域将为您从不同角度呈现国内外200余种，上弯头野生动物。</span>
            <span className="siFeatures">★ 【零距离接触】能够邂逅大熊猫、长颈鹿、火烈鸟等可爱的动物朋友，还能零距离感受东北虎、非洲狮、猎豹等猛兽的野性呼唤。</span>
            <span className="siFeatures">★ 【温馨家园】动物的温馨教员，提升动物福利保障，宣传动物保护理念。固定时段提供丰富的科普讲解与动物行为展示，了解动物鲜为人知的一面。</span>
            <span className="siCancelOpSubtitle">开放时间：09:00-17:00</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">165/人起</span><button className="siCheckButton">选择</button></div>
          </div>
          </div>
                <Footer/></div>
        </div>
    )
}
export default OffersType