import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {

const {id} = useParams();
const [character, setCharacter] = useState({});
const [loading, setloading] = useState(true); 
const navigate = useNavigate();

useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
       if (data.name) {
          setCharacter(data);
          setloading(false);
       } else {
          window.alert('No hay personajes con ese ID');
       }
    });
    return setCharacter({});
 }, [id]);

    if (loading) {
        return <div>....Cargando</div>
    }

    return(
      <div className="modalDiv">
         <div className="modal">
            <div className="btnClose" onClick={() => navigate(-1)}>
               <FontAwesomeIcon icon={faSquareXmark} />
            </div> 
            <div>
               <img src={character.image} alt='' />
            </div>
            <div>
               <h2>Name: {character.name}</h2>
               <h2>Status: {character.status}</h2>
               <h2>Specie: {character.species}</h2>
               <h2>Gender: {character.gender}</h2>
               <h2>Origin: {character.origin.name}</h2>
            </div>
         </div>
      </div>
    );
}

export default Detail;