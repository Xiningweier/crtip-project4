import React, { useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./apartmentlist.css"
import { useLocation} from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { CircularProgress } from "@material-ui/core";
const ApartmentList =()=>{
    const location=useLocation()
    const [destination,setDestination]=useState(location.state.destination)
    const [dates,setDates]=useState(location.state.dates)
    const [openDate,setOpenDate]=useState(false)
    const [options,setOptions]=useState(location.state.options)
    const [min,setMin]=useState(undefined)
    const [max,setMax]=useState(undefined)
    const {data,loading,error,reFetch}=useFetch(`http://localhost:8800/api/hotels?city=${destination}&type=apartment&min=${min || 0 }&max=${max || 999999999}`)
    const handleClick=()=>{
        reFetch();
    }

    return(
        <div>
            <Navbar/>
            <Header type="list"  />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">搜索</h1>
                        <div className="lsItem">
                            <label htmlFor="">目的地</label>
                            <input  placeholder={destination}  type="text" />
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">检查日期</label>
                            <span onClick={()=>setOpenDate(!openDate)}> {`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}</span>
                            { openDate && (<DateRange onChange={item=>setDates([item.selection])} minDate={new Date() } ranges={dates}/>)}
                            
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">选择</label>
                            <div className="lsOptions">

                            
                            <div className="lsOptionItem">
                                <span className="lsOptionText">最低价</span>
                                <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />

                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptionText">最高价</span>
                                <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />

                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptionText">成人</span>
                                <input type="number" min={1} className="lsOptionInput"  placeholder={options.adult}/>

                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptionText">孩子</span>
                                <input type="number"  min={0} className="lsOptionInput" placeholder={options.children} />

                            </div>
                            <div className="lsOptionItem">
                                <span className="lsOptionText">房间</span>
                                <input type="number" min={1} className="lsOptionInput"  placeholder={options.room}/>

                            </div>
                            </div>


                        </div>
                        <button onClick={handleClick} >搜索</button>
                    </div>
                    <div className="listResult">
                        {loading ? < CircularProgress/> :<>
                        {data.map(item=>(                    
                        <SearchItem item={item} key={item._id}/>))}
                        </>}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ApartmentList