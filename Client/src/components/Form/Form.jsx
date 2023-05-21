import React from 'react'
import { useState } from 'react'
import validation from '../../validation'
import style from './Form.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faEyeSlash, faEye, faBell } from '@fortawesome/free-solid-svg-icons'
import banner from '../../img/banner.png'

export default function Form ({login}) { 

const [showPass, setShowpass] = useState(false);

const [userData,setUsedata] = useState({
    email:"",
    password:"",
});

const [errors,setErrors] = useState({
    email:"",
    password:"",
});

const handleChange = (event) => {
    setErrors(validation({...userData,[event.target.name]:event.target.value}));
    setUsedata({...userData,[event.target.name]:event.target.value});  
};

const handleSubmit = (event) => {
    event.preventDefault();
    login(userData);  
};
  

  return (
    <>
    <div className={style.contenedorLogin}>
      <img src={banner} alt='Rick' />
      <div className={style.contenedorForm}>
        <form onSubmit={handleSubmit}>
          <h2>Email</h2>
          <input className={style.inputForm}
                type="text" 
                name="email" 
                value={userData.email} 
                onChange={handleChange}
                placeholder='Escribe tu email...' />
          <p className={style.errorForm}>{errors.email && <div><FontAwesomeIcon icon={faBell} beatFade />  {errors.email}</div>}</p>
          <h2>Password</h2>
          <div className={style.inputeyeForm}>
            <input className={style.inputForm}
                  type={showPass ? "text" : "password"} 
                  name="password" 
                  value={userData.password} 
                  onChange={handleChange}
                  placeholder='Escribe tu password...' />
            <div className={style.eyeForm} onClick={() => setShowpass(!showPass)}>
              {showPass ? <div><FontAwesomeIcon icon={faEyeSlash} /></div> : <div><FontAwesomeIcon icon={faEye} /></div> }
            </div>
          </div>      
          <p className={style.errorForm}>{errors.password && <div><FontAwesomeIcon icon={faBell} beatFade /> {errors.password}</div>}</p>
          <button className={style.buttonForm} type="submit"><FontAwesomeIcon icon={faArrowRightToBracket} /> Submit</button>
        </form>
      </div>
    </div>
    </>
  );
}