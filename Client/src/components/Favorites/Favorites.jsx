//import {connect} from "react-redux"
import Card from "../Card/Card";
import style from "./Favorites.module.css"
import {filter, order} from "../../redux/Actions/actions"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownWideShort, faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons'

export default function Favorites(props) {
   
   const [aux,setAux] = useState(false);
   //const [tipo,setTipo]= useState("");

   const dispatch = useDispatch();

   const myFavorites = useSelector(state => state.myFavorites);
   const tipo = useSelector(state => state.filterGender);

   const handleOrder = (value) => {
      dispatch(order(value));
      setAux(!aux);
      //setTipo("");
   };

   const handleFilter = (gender) => {
      dispatch(filter(gender));
      //setTipo(gender);
   };

   const clear = () => {
      dispatch(order("All"));
      setAux(false);
      //setTipo("");
   };


   return (
   <>
    <div className = {style.titleFav}>
         <h1>Favorites</h1>
    </div>
    <div className = {style.containerFilterFav}>
         <div className = {style.titleGenderFav}>Gender</div>
         <div className = {style.orderFav}>
            { aux 
            ? <div onClick={()=>handleOrder("A")}><FontAwesomeIcon icon={faArrowDownShortWide} /></div>
            : <div onClick={()=>handleOrder("D")}><FontAwesomeIcon icon={faArrowDownWideShort} /></div> 
            }
         </div>
         <div className = {style.filterFav}>
            {tipo === "Male"
            ? <div className = {style.filterNameFav+" "+style.filterNameActiveFav} onClick={()=>handleFilter("Male")}>Male</div>
            : <div className = {style.filterNameFav} onClick={()=>handleFilter("Male")}>Male</div>
            }
            {tipo === "Female"
            ? <div className = {style.filterNameFav+" "+style.filterNameActiveFav} onClick={()=>handleFilter("Female")}>Female</div>
            : <div className = {style.filterNameFav} onClick={()=>handleFilter("Female")}>Female</div>
            }
            {tipo === "Genderless"
            ? <div className = {style.filterNameFav+" "+style.filterNameActiveFav} onClick={()=>handleFilter("Genderless")}>Genderless</div>
            : <div className = {style.filterNameFav} onClick={()=>handleFilter("Genderless")}>Genderless</div>
            }
            {tipo === "unknown"
            ? <div className = {style.filterNameFav+" "+style.filterNameActiveFav} onClick={()=>handleFilter("unknown")}>Unknown</div>
            : <div className = {style.filterNameFav} onClick={()=>handleFilter("unknown")}>Unknown</div>
            }
         </div>
         <div className = {style.titleClearFav} onClick={()=>clear()}>Clear</div>
    </div>
    <div className = {style.containerFav}>
       
        {  
          myFavorites.map((elemento) => {
           return <Card
            id={elemento.id}
            name={elemento.name}
            status={elemento.status}
            species={elemento.species}
            gender={elemento.gender}
            origin={elemento.origin}
            image={elemento.image}
            />
        })}
       
    </div>
   </>  
   );
}


/*export function mapStateToProps(state) {
   return {
      myFavorites: state.myFavorites,
   }
}

export default connect(mapStateToProps, null)(Favorites);*/