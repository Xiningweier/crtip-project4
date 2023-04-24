import {
BrowserRouter ,
Route,
Routes,
} from "react-router-dom";

import Home from "./pages/home/Home"
import List from "./pages/list/List"
import Hotel from "./pages/hotel/Hotel"
import Login from "./pages/login/Login";
import Signup from "./signup/Signup";
import HotelType from "./components/Typesearch/HotelType";
import HotelList from "./pages/TypeList/HotelList";
import ApartmentType from "./components/Typesearch/ApartmentType";
import ResortsType from "./components/Typesearch/ResortsType";
import VillasType from "./components/Typesearch/VillasType";
import ApartmentList from "./pages/TypeList/ApartmentList";
import VillasList from "./pages/TypeList/VillasList";
import ResortsList from "./pages/TypeList/ResortsList";
import Profile from "./components/profile/Profile";

import OffersType from "./components/Typesearch/OffersType";
import NewOffers from "./pages/TypeList/NewOffers";
import Booking from "./components/Bookings/Booking";
import Forgot from "./components/forgot/Forgot";
import Forgotid from "./components/forgotid/Forgotid";
import EditUser from "./components/Edituser/EditUser";
import Listcity1 from "./pages/listcity/Listcity1";
import Listcity2 from "./pages/listcity/Listcity2 ";
import Listcity3 from "./pages/listcity/Listcity3";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Help from "./components/help/Help";
import Terms from "./components/terms/Terms";
import Hotellist1 from "./pages/secondlist/Hotellist1";
import Hotellist2 from "./pages/secondlist/Hotellist2";
import Hotellist3 from "./pages/secondlist/Hotellist3";
import Hotellist4 from "./pages/secondlist/Hotellist4";



// 使用React Router库实现的路由配置，它定义了应用程序的不同路径（URL）对应的组件
// <BrowserRouter> 是React Router中的一个组件，用于为应用程序启用HTML5历史路由机制。
// <Routes> 是一个包含多个子节点的组件，每个子节点表示一个不同的路径（URL）
// <Route> 是一个组件，用于指定一个路径（URL）和对应的组件（element属性）。
function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* 1主页 */}
      <Route path="/" element={<Home/>} />
      {/* 2酒店搜索列表页 */}
      <Route path="/hotels" element={<List/>} />
      {/* 3用户信息和订单信息页面 */}
      <Route path="/profile" element={<Profile/>} />
      {/* 4用户修改个人信息 */}
      <Route path="/edituser" element={<EditUser/>} />
      {/* 5酒店详情页面 */}
      <Route path="/hotels/:id" element={<Hotel/>} />
      {/* 6登陆页面 */}
      <Route path="/login" element={<Login/>} />
      {/* 7注册页面 */}
      <Route path="/register" element={<Signup/>} />
      {/* 8所有酒店页面 */}
      <Route path="/allhotels" element={<HotelType/>} />
      {/* 1所有飞机票页面 */}
      <Route path="/allapartments" element={<ApartmentType/>} />
      {/* 2所有火车票页面 */}
      <Route path="/allresorts" element={<ResortsType/>} />
      {/* 3所有跟团游页面 */}
      <Route path="/allvillas" element={<VillasType/>} />
      {/* 4所有门票页面 */}
      <Route path="/offers" element={<OffersType/>} />
      {/* 9预定信息填写页面 */}
      <Route path="/hotels/room/book/:roomid" element={<Booking/>} />
      {/* 10忘记密码验证邮箱的页面 */}
      <Route path="/forgot" element={<Forgot />} />
      {/* 11重置密码页面 */}
      <Route path="/forgotid" element={<Forgotid/>}/>
      {/* 12上海酒店列表页 */}
      <Route path="hotels/hyderabad" element={<Listcity1/>}/>
      {/* 13杭州酒店列表页 */}
      <Route path="hotels/banglore" element={<Listcity2/>}/>
      {/* 14苏州酒店列表页 */}
      <Route path="hotels/mumbai" element={<Listcity3/>}/>
      {/* 5关于 */}
      <Route path="/about" element={<About/>}/>
      {/* 6条款 */}
      <Route path="/terms" element={<Terms/>}/>
      {/* 7帮助 */}
      <Route path="/help" element={<Help/>}/>
      {/* 8联系我们 */}
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/typehotellist" element={<HotelList/>} />
      <Route path="/typeapartmentlist" element={<ApartmentList/>} />
      <Route path="/typevillaslist" element={<VillasList/>} />
      <Route path="/offerslist" element={<NewOffers/>} />
      <Route path="/typeresortslist" element={<ResortsList/>} />
      {/* 类型选择 */}
      <Route path="/typehotellist1" element={<Hotellist1/>} />
      <Route path="/typehotellist2" element={<Hotellist2/>} />
      <Route path="/typehotellist3" element={<Hotellist3/>} />
      <Route path="/typehotellist4" element={<Hotellist4/>} />
      
    </Routes>

    </BrowserRouter>
    
  );
}

export default App;
