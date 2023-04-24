import { CircularProgress } from "@material-ui/core"
import useFetch from "../../hooks/useFetch"
import "./propertyList.css"
import { useNavigate } from "react-router-dom";


const PropertyList=()=>{
    const {data,loading,error}=useFetch("http://localhost:8800/api/hotels/countByType")

    const navigate=useNavigate();
    const handleclick = [
        () => navigate("/typehotellist1"),
        () => navigate("/typehotellist2"),
        () => navigate("/typehotellist3"),
        () => navigate("/typehotellist4"),
      ];

    const images=[
        "https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ]
    return(
        <div className="pList">
            { loading ? < CircularProgress/> : (<>
            {data && images.map((img,i)=>(
            <div className="pListItem">
                <img src={img} alt="" className="pListImg" onClick={handleclick[i]}/>
                <div className="pListTitles">
                    <h1 >{data[i]?.type}</h1>
                    <h2>{data[i]?.count} {data[i]?.type} </h2>
                </div>
            </div>))}
        </>
    )}           
     </div>
    )
}
export default PropertyList