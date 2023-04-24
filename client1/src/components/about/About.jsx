import "./about.css"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../footer/Footer"
import MailList from "../mailList/MailList"
import Worldly from "./images/ctrip.jpg"

const About =()=>{
    return(
        <div>
            <Navbar/>
            <div className="terms-about">
            <img className="logo22" src={Worldly} alt="" />
            <ul className="ul-font">
                <li>
                携程集团(Trip.com Group) 是全球领先的一站式旅行平台，公司旗下的平台可面向全球用户提供一套完整的旅行产品、 服务及差异化的旅行内容。集团能够提供超过120万种全球住宿服务，480多家国际航空公司，以及超过31万项目的地内活动。并与超过3万家其他合作伙伴一起满足客户不断变化的需求。
                </li>
                <br />
                <li>
                对于中国游客而言，以及对于越来越多的世界各地的游客而言， 携程是其可值得信赖的旅行平台，用户可以通过携程的平台进行任何类型的旅行预订，包括从目的地内活动、周末短假及短途旅行，到跨境旅游及商务旅游等。携程多样化的产品及服务组合涵盖经济、 高端、定制化、精品等选择，吸引了携程国内以及全球日益增长的用户群体。
                </li>
                <br />
                <li>
                近年来，携程不断加大在人工智能、云计算等方面的研发和投入力度，创新科技投入占比远超全球其他同类企业。而在服务上，携程在全球的客服人员约1万名，配备深度神经网络客服机器人及21种语言的全球化服务能力，通过全天候、标准化、快捷性的服务可以做好全方位保障，充分满足消费者需求。此外，携程先后建立了“六重旅游保障”、“先行赔付”、“全球旅行SOS应急机制”、“阶梯退改”等创新举措，服务标准行业领先。为应对新冠疫情，携程启动多项举措保护用户和合作伙伴的权益，发起“旅行复兴V计划”和“BOSS直播”，履行社会责任，推动行业复苏。                </li>
                <br />
                <br />
            </ul>
            </div>
            <br />
            <br />
            <div className="ft">
            <Footer/>
            </div>
        </div>
    )
        
        
}

export default About