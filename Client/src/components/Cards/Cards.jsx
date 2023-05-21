import Card from '../Card/Card';
import style from "./Cards.module.css"

export default function Cards(props) {
   return(
         <div className = {style.containerCards}>
               {  
                  props.characters.map((elemento) => {
                     return <Card
                     id={elemento.id}
                     name={elemento.name}
                     status={elemento.status}
                     species={elemento.species}
                     gender={elemento.gender}
                     origin={elemento.origin.name}
                     image={elemento.image}
                     onClose={()=>{props.onClose(elemento.id)}}
                     />
                  })
               }
         </div>
      );
}
