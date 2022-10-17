import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios"


function App() {

  const  [usernameReg, setNameReg] = useState("")
  const  [emailReg, setemailReg] = useState("")
  const  [passwordReg, setPassReg] = useState("")
  const [registerStatus, setStatusReg] = useState("")

  const[username, setUsername] = useState("")
  const[password, setPass] = useState("")
  
  const [userList, setUser] = useState([]);
  const [loginStatus, setLoginStatus] = useState("")

  Axios.defaults.withCredentials = true;

  const addUser = () =>{
    Axios.post("http://localhost:3001/create", {
      usernameReg:usernameReg, 
      emailReg:emailReg, 
      passwordReg:passwordReg,
    }).then((response) => {
      if(response.data.message){
        setLoginStatus(response.data.message)  
      }
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setUser(response.data)
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username:username, 
      password:password,
    }).then((response) => {
      if(response.data.message){
        setLoginStatus(response.data.message)  
      }else{
        setLoginStatus(response.data[0].username)
      }
      
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) =>{
      if(response.data.loggedIn == true){
        setLoginStatus(response.data.user[0].username);
      }
    });
  },[])

  return (
    <div className="App">
      <div className='register'>
        <label>Name: </label>
        <input type="text" onChange={(event) => {setNameReg(event.target.value)}} />
        <label>Email: </label>
        <input type="email" onChange={(event) => {setemailReg(event.target.value)}}/>
        <label>Password: </label>
        <input type="password" onChange={(event) => {setPassReg(event.target.value)}}/>
        <button onClick={addUser}>Register</button>
      </div>
      <div className='register'>
        <label>Name: </label>
        <input type="text" onChange={(event) => {setUsername(event.target.value)}} />
        <label>Password: </label>
        <input type="password" onChange={(event) => {setPass(event.target.value)}}/>
        <button onClick={login}>Login</button>
      </div>
      <hr />
      <div className='users'>
        <button onClick={getUsers}>Show Users</button>
        {
          userList.map((val,key) => {
            return (<div key={val.id}> {val.username} </div>)
          })
        }
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;


// const addUser = () =>{
//   Axios.post("http://localhost:3001/create", {
//     usernameReg:usernameReg, 
//     emailReg:emailReg, 
//     passwordReg:passwordReg,
//   }).then(() => {
//     setUser([...userList, {
//       usernameReg:usernameReg, 
//       emailReg:emailReg, 
//       passwordReg:passwordReg,
//     },
//   ]);
//   });
// };