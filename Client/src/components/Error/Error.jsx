import { useLocation } from "react-router-dom";

const Error = () => {

    const {pathname} = useLocation();

    return(
       <div>
           <p>Error 404: Esta ruta {pathname} no existe.</p>
       </div>
    );
   }
export default Error;
