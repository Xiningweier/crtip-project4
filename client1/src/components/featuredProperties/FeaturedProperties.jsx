import { CircularProgress } from "@material-ui/core"
import useFetch from "../../hooks/useFetch"
import "./featuredProperties.css"
import { Link } from "react-router-dom";

const FeaturedProperties=()=>{
    const {data,loading,error}=useFetch("http://localhost:8800/api/hotels?featured=true")

    return(
        <div className="fp">
            {loading ?< CircularProgress/> :<>
            {data.map(item=>(
            <div className="fpItem"  key={item._id}>
                <Link to={`/hotels/${item._id}`}>
                <img style={{ height: '160px' }} src={item.photos[0]} alt="" className="fpImg" />
                </Link>
                <span className="fpName">{item.name}</span>
                <div className="fp-line">
                    <span className="fpCity">{item.city}</span>
                    {/* <span className="fpCity">{item.type}</span> */}
                    {/* <span className="fpCity">{item.desc}</span> */}
                    <span className="fpPrice">￥{item.cheapestPrice}起</span>
                </div>
                {item.rating && <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>豪华型</span>
                </div>}           
            </div>  ))}  </> }
        </div>
        
    )
}
export default FeaturedProperties