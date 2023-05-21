import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom"
import style from "./Nav.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons'
import banner from '../../img/banner.png'
import { useState } from 'react'

export default function Nav({logout}) {
const [showHambuger, setShowhambuger] = useState(false);

const {pathname} = useLocation(); 

if (pathname === "/") {
    return null;
}


/*useEffect(() => {
  setShowhambuger(false);
},[]);*/

   return (
    
    <div className={style.containerNav}>
      <Link to="/home"><img src={banner} alt='' /></Link>
      {!showHambuger ? <div className={style.menuNavContainer}> 
        <Link className={style.menuNav} to="/home">Home</Link>
        <Link className={style.menuNav} to="/favorites">Favorites</Link>
        <Link className={style.menuNav} to="/about">About</Link>       
      </div>
      : <div className={style.menuNavContainer+" "+style.menuNavContainerActive} >
        <Link onClick={() => setShowhambuger(!showHambuger)} className={style.menuNav} to="/home">Home</Link>
        <Link onClick={() => setShowhambuger(!showHambuger)} className={style.menuNav} to="/favorites">Favorites</Link>
        <Link onClick={() => setShowhambuger(!showHambuger)} className={style.menuNav} to="/about">About</Link>
        <div className={style.menuNav} onClick={()=>{setShowhambuger(!showHambuger);logout()}}>Logout</div>
      </div>
      }
      <div className={style.logoutNav} onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></div>
      <div className={style.hamburgerNav} onClick={() => setShowhambuger(!showHambuger)}><FontAwesomeIcon icon={faBars} /></div> 
    </div>  
   );
}