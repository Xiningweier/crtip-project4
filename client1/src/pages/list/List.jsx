import React, { useState } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./list.css";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { CircularProgress } from "@material-ui/core";
const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999999999
    }`
  );
  const handleClick = (e) => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-listSearch-wrap">
        <div className="list-listSearch">
          <div className="lsItem">
            <label htmlFor="">目的地</label>
            <input style={{ width: '280px' }} placeholder={destination} type="text" />
          </div>
          <div className="lsItem">
            <label htmlFor="">入住时间-退房时间</label>
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >
              {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )} `}{" "}
            </span>
            {openDate && (
              <DateRange
                style={{ width: '280px' }}
                editableDateInput={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          <div className="lsItem">
            {/* <label htmlFor="">Options</label> */}
            <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">最低价</span>
                <input
                  type="number"
                  onChange={(e) => setMin(e.target.value)}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">最高价</span>
                <input
                  type="number"
                  onChange={(e) => setMax(e.target.value)}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">成人</span>
                <input
                  type="text"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.adult}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">孩子</span>
                <input
                  type="text"
                  min={0}
                  className="lsOptionInput"
                  placeholder={options.children}
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">房间</span>
                <input
                  type="text"
                  min={1}
                  className="lsOptionInput"
                  placeholder={options.room}
                />
              </div>
            </div>
          </div>
          <button className="list-listSearch-btn" onClick={handleClick}>
            搜索
          </button>
        </div>
      </div>
      <div className="listContainer-page">
        <div className="listWrapper">
          <div className="listResult">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {!data ? (
                  "efddw"
                ) : (
                  <>
                    {data.map((item) => (
                      <SearchItem item={item} key={item._id} />
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
