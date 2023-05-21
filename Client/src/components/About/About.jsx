import style from "./About.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons'

const About = () => {

 return(
    <>
    <div className={style.containerAbout2}></div>
    <div className={style.containerAbout}>
            <h2>Created By</h2>
            <h2>Mauricio Calderón</h2>
            <h2>Full Stack Web Developer <FontAwesomeIcon icon={faBatteryHalf} fade /></h2>
    </div>
    </>
 );
}
export default About;