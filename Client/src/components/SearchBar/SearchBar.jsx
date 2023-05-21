import style from "./SearchBar.module.css"
import { useState } from 'react';
//import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchBar({onSearch}) {


let [id, idSet] = useState ("");

const handleChange = (event) => idSet(event.target.value)

/*const {pathname} = useLocation(); 

if (pathname === "/" || pathname === "/about" || pathname === "/favorites" ) {
   return null;
}*/

   return (
      <>
      <div className={style.containerSearch}> 
         <div>
            <h1>Characters</h1>
         </div>
         <div className={style.containerSearchElements}>
            <div className={style.boxSearch}>
               <input type='text' maxlength="3" onChange={handleChange} value={id} />
               <div onClick={()=>{onSearch(id);idSet("")}} ><FontAwesomeIcon icon={faMagnifyingGlass} className={style.glassSearch} /></div>
            </div>
            <div className={style.randomSearch} onClick={()=>onSearch(Math.floor(Math.random()*826))}>Random</div>
         </div>
      </div>
      </>
   );
}

