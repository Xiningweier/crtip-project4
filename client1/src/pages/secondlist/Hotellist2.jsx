import "./listtype.css";
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import MailList from "../../components/mailList/MailList";
import SearchItemcity from "../../components/searchItemcity/SearchItemcity";
import Footer from "../../components/footer/Footer"

const Hotellist2 = () => {
  const location = useLocation();
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/hotels?type=公寓`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div className="kuku">
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItemcity item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="ft">
            <Footer/>
      </div>
    </div>
  );
};

export default Hotellist2;
