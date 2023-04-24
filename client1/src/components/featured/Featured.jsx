import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import "./Featured.css"
import {CircularProgress} from '@material-ui/core'
const Featured=()=>{
    const navigate=useNavigate();
    // const {data,loading,error}=useFetch("/hotels/countByCity?cities=Hyderabad,Mumbai,Banglore")
    const {data,loading,error}=useFetch("http://localhost:8800/api/hotels/countByCity?cities=上海,杭州,苏州")

    const handleclick=()=>{
        navigate("/hotels/hyderabad")

    }
    const handleclick1=()=>{
        navigate("/hotels/mumbai")
        
    }
    const handleclick2=()=>{
        navigate("/hotels/banglore")
        
    }
    
    return(
        <div className="featured">
            
            { loading ? < CircularProgress/> :(<><div className="featuredItem">
                <img src="https://images.unsplash.com/photo-1548919973-5cef591cdbc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" 
                className="featuredImg"
                onClick={handleclick}
                 />
                <div className="featureTitles">
                    <h1>上海</h1>
                    <h2>海纳百川 追求卓越</h2>
                    {/* <h3>精选{data[0]} 间</h3> */}
                </div>
               
            </div>
            <div className="featuredItem">
                <img src="https://images.unsplash.com/photo-1629536666798-d5b3565cd728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="" className="featuredImg"onClick={handleclick1} />
                <div className="featureTitles">
                    <h1>杭州</h1>
                    <h2>烟柳画桥 旖旎风光</h2>
                </div>
                
            </div>
            <div className="featuredItem">
                <img src="https://images.unsplash.com/photo-1591707201437-fa5a4893eb2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=355&q=80" alt="" className="featuredImg" onClick={handleclick2} />
                <div className="featureTitles">
                    <h1>苏州</h1>
                    <h2>匠心独运 高台厚榭</h2>
                </div>
            </div></>)}      
        </div>
    )
}
export default Featured