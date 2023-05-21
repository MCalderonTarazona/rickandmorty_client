import style from "./Card.module.css";
import { Link } from "react-router-dom";
import {addFav, removeFav} from '../../redux/Actions/actions';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faHeart, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
//import {connect} from "react-redux";


export default function Card(props) {

const {pathname} = useLocation();
const [isFav, setIsfav] = useState(false);

const dispatch = useDispatch();
const myFavorites = useSelector(state => state.allCharacters);

const handleFavorite = () => {
   if (isFav) {
      setIsfav(false);
      dispatch(removeFav(props.id));
   } else {
      setIsfav(true);
      dispatch(addFav(props));
   }
};

useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === props.id) {
         setIsfav(true);
      }
   });
}, [myFavorites]);

   return (
      <div className = {style.containerCard}>
         
         { (pathname !== "/favorites") ? (<div className = {style.btnClose}  onClick={() => props.onClose() }><FontAwesomeIcon icon={faSquareXmark} /></div>) : (<div className = {style.btnCloseFav} ><FontAwesomeIcon icon={faSquareXmark} /></div>) }
         {(isFav)? ( <div className = {style.btnFavoritesOn} onClick={handleFavorite}><FontAwesomeIcon icon={faHeart} beat /></div>) : (<div className = {style.btnFavoritesOff} onClick={handleFavorite}><FontAwesomeIcon icon={faHeart} /></div> )}
         <h2 className = {style.cardId}>{props.id}</h2>
         <img src={props.image} alt='' />
         <h2>{props.name}</h2>
         <Link to={`/detail/${props.id}`} state={{ background: pathname }}><div className={style.cardLink}><FontAwesomeIcon icon={faBarcode} /></div></Link>
         
      </div>
   );
}

/*export function mapDispatchToProps(dispatch) {
   return {
      addFav: (personaje) => dispatch(addFav(personaje)),
      removeFav: (id) => dispatch(removeFav(id))
   }
}

export function mapStateToProps(state) {
   return {
      myFavorites: state.myFavorites,
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);*/
