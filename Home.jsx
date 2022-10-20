import React from 'react';
import Axios from "axios"
import { useEffect, useState } from "react";

    const Home = () => {
    const  [usernameReg, setNameReg] = useState("")
    const  [emailReg, setEmailReg] = useState("")
    const [loginStatus, setLoginStatus] = useState
    ("")
    
    Axios.defaults.withCredentials = true;

    const addUser = () =>{
        Axios.post("http://localhost:3001/create", {
        usernameReg:usernameReg, 
        }).then((response) => {
        if(response.data.message){
            setLoginStatus(response.data.message)  
        }
        });
    };

  return (
    <div>
        <input type="text" onChange={(event) => {setNameReg(event.target.value)}}/>
        <button onClick={addUser}>Register</button>
        <label>{loginStatus}</label>
    </div>
  )
}

export default Home