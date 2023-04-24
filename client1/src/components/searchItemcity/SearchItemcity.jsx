import { Link } from "react-router-dom";
import "./searchItemcity.css";
import LikeButton from '../likebutton/Likebutton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMap, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";

const SearchItemcity = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="img" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <div className="flex-line">
            <FontAwesomeIcon style={{width:9,paddingRight:3}}icon={faLocationDot} />
            <span className="siDistance"><h4>{item.address}</h4></span>
        </div>
        <span className="siDistance">{item.distance} KM 距离机场</span>
        <div className="flex-line">
          <span className="siTaxiOp">提供接送</span>
          <span className="siTaxiOp">提供早餐</span>
          <span className="siTaxiOp">免费停车</span>
        </div>
        {/* <span className="siSubtitle">入住时间:14:00后 退房时间:12:00前</span> */}

        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOpSubtitle">入住时间:14:00后 退房时间:12:00前</span>
        {/* <span className="siCancelOp">不允许18岁以下单独办理入住</span>
        <span className="siCancelOpSubtitle">
            不允许18岁以下单独办理入住
        </span> */}
        {/* <span className="siCancelOpSubtitle">不允许18岁以下单独办理入住</span> */}
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice}起</span>
          {/* <span className="siTaxOp">不允许18岁以下单独办理入住</span> */}
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">选择</button></Link>
          <LikeButton text="点个赞" color="#ffcc00" />
        </div>
      </div>
    </div>
  );
};

export default SearchItemcity;
