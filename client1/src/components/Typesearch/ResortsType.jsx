import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navbar from "../navbar/Navbar";
import "./resortstype.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHotel,
  faHouseUser,
  faBuildingColumns,
  faUmbrellaBeach,
  faPercent,
  faPlane,
  faTrain,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faMountainCity } from "@fortawesome/free-solid-svg-icons";
import { faTaxi } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css filenp
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import MailList from "../mailList/MailList";
import image1 from "./image1/跟团游1.jpg";

const ResortsType = ({ type }) => {
  const { user } = useContext(AuthContext);
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setoptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const navigate = useNavigate();
  const handleOptions = (name, operation) => {
    setoptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const { dispatch } = useContext(SearchContext);
  const handleInput = () => {
    if (destination == "") {
      alert("请输入目的地");
    } else {
      handleSearch();
    }
  };
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/typeresortslist", { state: { destination, dates, options } });
  };
  return (
    <div>
      <Navbar />
      <div className="header-resort">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
          <div className="headerList">
            <div className="headerListItem active">
              <FontAwesomeIcon icon={faHouseUser} />
              <span> <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>主页</NavLink></span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faHotel} />
              <span><NavLink to="/allhotels" style={{ color: "inherit", textDecoration: "none" }}>酒店</NavLink></span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faPlane} />
              <span><NavLink to="/allapartments" style={{ color: "inherit", textDecoration: "none" }}>飞机票</NavLink></span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTrain} />
              <span><NavLink to="/allvillas" style={{ color: "inherit", textDecoration: "none" }}>  火车票 </NavLink></span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faUmbrellaBeach} />
              <span><NavLink   to="/allresorts"   style={{ color: "inherit", textDecoration: "none" }}>  跟团游 </NavLink> </span>
            </div>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faTicket} />
              <span><NavLink  to="/offers"  style={{ color: "inherit", textDecoration: "none" }}>门票 </NavLink></span>
            </div>
          </div>
          {type !== "list" && (
            <>
              <h1 className="headerTitle">除了工作 旅行也是一种生活</h1>
              <p className="headerDesc">携程福礼 与您同行</p>
              {!user && (
                <button className="headerBtn">
                  <NavLink  to="/register"  style={{ textDecoration: "none", color: "inherit" }}>登录/ 注册 </NavLink>
                </button>
                )}
              <div className="headerSearch">
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faHotel} className="headerIcon" />
                  <input type="text"   placeholder="请输入目的地" className="headerSearchInput" onChange={(e) => setDestination(e.target.value)}/>
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="headerIcon"
                  />
                  <span  onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} 至 ${format( dates[0].endDate, "dd/MM/yyyy")} `}</span>
                  {openDate && (
                    <DateRange
                      editableDateInput={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                    />
                  )}
                </div>
                <div className="headerSearchItem">
                  <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                  <span onClick={() => setOpenOptions(!openOptions)}className="headerSearchInput"> {" "}
                    {`${options.adult} 成人${options.children} 孩子${options.room} 房间`} </span>
                  {openOptions && (
                    <div className="options">
                      <div className="optionItem">
                        <span className="optionText">成人</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.adult <= 1}
                            className="optionCounterButton"
                            onClick={() => handleOptions("adult", "d")}
                          >
                            -
                          </button>
                          <button className="optionCounterNumber"> {options.adult}</button>
                          <button className="optionCounterButton" onClick={() => handleOptions("adult", "i")}>
                            +
                          </button>
                        </div>
                      </div>
                      <div className="optionItem">
                        <span className="optionText">孩子</span>
                        <div className="optionCounter">
                          <button
                            disabled={options.children <= 0}
                            className="optionCounterButton"
                            onClick={() => handleOptions("children", "d")}
                          >
                            -
                          </button>
                          <button className="optionCounterNumber">
                            {options.children}
                          </button>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOptions("children", "i")}
                          >
                            +
                          </button></div></div>
                      <div className="optionItem">
                        <span className="optionText">房间</span>
                        <div className="optionCounter">
                          <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOptions("room", "d")}>
                            -
                          </button>
                          <button className="optionCounterNumber"> {options.room}</button>
                          <button className="optionCounterButton" onClick={() => handleOptions("room", "i")} >
                            +
                          </button>
                        </div></div></div>
                  )}
                </div>
                <div className="headerSearchItem">
                  <button className="headerBtn" onClick={handleInput}>
                    搜索
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="homeContainer">
        <div style={{width:"980px"}} className="searchItem-res">
          <img src="https://dimg03.c-ctrip.com/images/100f0e00000071hgt5385_D_769_510_Q100.jpg" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">泰国普吉岛+皮皮岛+鸡蛋岛5日4晚私家团</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>出境亲子游·丛林飞跃·海岛浮潜·海景大象营·尼莫海豚馆·全程五钻酒店·1单1团·专车服务·纯玩</h3></span>
            </div>
            <span className="siDistance">皮皮岛+鸡蛋岛+普吉镇+芭东海滩+卡伦海滩+青蛙夜市·旅行管家</span>
            <div className="flex-line">
              <span className="siTaxiOp">亲子甄选</span><span className="siTaxiOp">丛林飞跃</span><span className="siTaxiOp">潜水体验</span>
            </div>
            <span className="siFeatures">★ 【度假首选】五钻温泉度假酒店可选，三大海滩环绕，室外游泳池，室外网球场，享受全套spa服务</span>
            <span className="siFeatures">★ 【优选行程】1单1团，专车服务，睡到自然醒，行程设计宽松，时间自己说了算，彰显度假休闲理念</span>
            <span className="siFeatures">★ 【缤纷景点】涵盖皮皮岛、鸡蛋岛、丛林飞跃、海景大象营、尼莫海豚馆等普吉岛特色景点及活动</span>
            <span className="siCancelOpSubtitle">独立成团，不与陌生人拼团</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">4593/人起</span><button className="siCheckButton">选择</button></div>
          </div>
        </div>
        <div style={{width:"980px"}}className="searchItem-res">
          <img src="https://dimg04.c-ctrip.com/images/0302112000att7vv3E9E8_D_769_510_Q100.jpg" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">泰国曼谷+芭堤雅+阁兰岛6日5晚私家团</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>出境游·臻享曼芭·阁兰岛海游·湄南河夜游·蒂芬妮人妖秀·全程五钻酒店·1单1团·专车服务·纯玩</h3></span>
            </div>
            <span className="siDistance">大皇宫+玉佛寺+郑王庙+夜游湄南河+真理寺+芭提雅海滩+打卡三大集市·旅游管家</span>
            <div className="flex-line">
              <span className="siTaxiOp">寺院祈福</span><span className="siTaxiOp">特色表演</span><span className="siTaxiOp">自选酒店</span>
            </div>
            <span className="siFeatures">★ 【度假首选】五钻曼谷金普顿玫兰酒店可选，室外无边盐水泳池，酒吧、咖啡厅、健身室、桑拿浴室应有具有</span>
            <span className="siFeatures">★ 【优选行程】1单1团，专车服务，睡到自然醒，行程设计宽松，时间自己说了算</span>
            <span className="siFeatures">★ 【缤纷景点】涵盖大皇宫、玉佛寺、郑王庙、白玉兰号湄南河夜游、阁兰岛、蒂芬妮人妖秀、真理寺</span>
            <span className="siCancelOpSubtitle">独立成团，不与陌生人拼团</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">7700/人起</span><button className="siCheckButton">选择</button></div>
          </div>
        </div>
        <div style={{width:"980px"}}className="searchItem-res">
          <img src="https://dimg04.c-ctrip.com/images/300r13000000uv525D82B_D_769_510_Q100.jpg" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">江苏无锡南京4日1晚跟团游</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>夜宿拈花湾景区内5钻主题客栈·香花街·悠游渔港·禅趣馆·一笑堂·拈花塔·鹿鸣谷·专车服务·纯玩</h3></span>
            </div>
            <span className="siDistance">『览拈花湾日夜景 · 夜赏水幕灯光秀』&游『赏樱胜地·鼋头渚』&在拈花湾遇见春天</span>
            <div className="flex-line">
              <span className="siTaxiOp">赏樱</span><span className="siTaxiOp">拈花湾</span><span className="siTaxiOp">导游服务</span>
            </div>
            <span className="siFeatures">★ 【服务保障】携程自营，专车专导，纯玩无购物，不打擦边球，不偷换概念，提高您的出游质量！</span>
            <span className="siFeatures">★ 【缤纷景点】畅游鼋头渚经典景区，赏春季花海，览太湖美景！</span>
            <span className="siFeatures">★ 【优选行程】精选入住景区内五钻主题客栈，唐宋古建风格，远离尘嚣，尽享禅意慢生活！</span>
            <span className="siCancelOpSubtitle">独立成团，不与陌生人拼团</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">1299/人起</span><button className="siCheckButton">选择</button></div>
          </div>
        </div>
        <div style={{width:"980px"}}className="searchItem-res">
          <img src="https://dimg03.c-ctrip.com/images/100g10000000oe8ej7579_D_769_510_Q100.jpg" alt="img" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">腾冲+芒市+瑞丽7日6晚私家团</h1>
            <div className="flex-line">
              <span className="siDistance"><h3>起止任选·极边腾冲·天然地热热海大滚锅·浴谷温泉·民族风情芒市·神秘边境瑞丽·专车服务·纯玩</h3></span>
            </div>
            <span className="siDistance">皮皮岛+鸡蛋岛+普吉镇+芭东海滩+卡伦海滩+青蛙夜市·旅行管家</span>
            <div className="flex-line">
              <span className="siTaxiOp">天然温泉</span><span className="siTaxiOp">飞机往返</span><span className="siTaxiOp">小众路线</span>
            </div>
            <span className="siFeatures">★ 【优质交通】多起始地可选，芒市、保山、腾冲任意城市起止均可，24小时专车接机/接站，私家小团随走随停</span>
            <span className="siFeatures">★ 【缤纷景点】经典景区（和顺侨乡+热海+浴谷温泉+火山一寨两国+姐告+金塔+珍奇园）+网红打卡点</span>
            <span className="siFeatures">★ 【尊享入住】全程精选性价比爆棚5钻轻奢酒店，舒适出行，芒市2晚+腾冲4晚连住不挪窝，旅行不折腾</span>
            <span className="siCancelOpSubtitle">独立成团，不与陌生人拼团</span>
          </div>
          <div className="siDetails">
            <div className="siDetailTexts"><span className="siPrice-resort">5555/人起</span><button className="siCheckButton">选择</button></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default ResortsType;
