import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav.jsx';
//import characters, { Rick } from './data.js';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import SearchBar from './components/SearchBar/SearchBar';
import React, { useState, useEffect} from 'react';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import {removeFav} from './redux/Actions/actions'
import {connect} from "react-redux"

export function App(props) {
const location = useLocation();
const background = location.state && location.state.background;

let [characters, setCharacters] = useState([]);

/*const onSearch = (id) => {
   axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
      if (data.name) {

         if(characters.find(character => character.id === data.id))
            window.alert(`ID ${data.id} ya existe`);
         else setCharacters((oldChars) => [...oldChars, data]);

      } else if (!data.id) window.alert('ID vacio');
      else {
         window.alert('¡No hay personajes con este ID!');
      }
   });
};*/

const onSearch = async (id) => {
      
   try {
      const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`)
      if (data.name) {
         if(characters.find(character => character.id === data.id))
               window.alert(`ID ${data.id} ya existe`);
         else setCharacters((oldChars) => [...oldChars, data]);
         }
   } catch (error) {
      console.log(error)
      switch (error.request.status) {
         case 404:
            window.alert('ID vacio');
            break;
         case 500:
            window.alert('¡No hay personajes con este ID!');
            break;
         default:
            window.alert(`Character ${id} not found`);
            break;
      }
   }
}

const onClose = (id) => {
   setCharacters(characters.filter((elemento) => elemento.id !== parseInt(id)));
   props.removeFav(parseInt(id));
};

const navigate = useNavigate();
const [access, setAccess] = useState(false);
const EMAIL = "prueba@gmail.com";
const PASSWORD = "prueba1234";

/*const login = (userData) => {
    if (EMAIL === userData.email && PASSWORD === userData.password) {
        setAccess(true);
        navigate('/home');
    }else{
      alert("Email/Contraseña incorrecta")
    }
}*/

/*function login(userData) {
   const { email, password } = userData;
   const URL = 'http://localhost:3001/rickandmorty/login/';
   axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
      const { access } = data;
      setAccess(data);
      access && navigate('/home');
   });
}*/

const login = async (userData) => {
   const { email, password } = userData;
   try {
      const URL = 'http://localhost:3001/rickandmorty/login/';
      const { data } = await axios(URL + `?email=${email}&password=${password}`);
      const { access } = data;
      setAccess(data);
      access && navigate('/home')
   } catch (error) {
      window.alert("Email/Contraseña incorrecta");
   }
}

const logout = () => {
   setAccess(false);
   navigate('/');
};

useEffect(() => {
   !access && navigate('/');
 }, [access]);


   return (
      <div className='App'>
      <Nav logout={logout}/>
      <Routes location={background || location}>
         <Route path='/' element={<Form login={login}/>} />
         <Route path='/home' element={<><SearchBar onSearch={onSearch} /><Cards characters={characters} onClose={onClose}/></>} />
         <Route path='/about' element={<About />} />
         <Route path='/favorites' element={<Favorites/>} />
         <Route path='*' element={<Error />} />
      </Routes>
      {location && (
      <Routes>
         <Route path='/detail/:id' element={<Detail />} />
      </Routes>
      )}
      
      </div>
   );
}

export function mapDispatchToProps(dispatch) {
   return {
      removeFav: (id) => dispatch(removeFav(id))
   }
}

export function mapStateToProps(state) {
   return {
      myFavorites: state.myFavorites,
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

