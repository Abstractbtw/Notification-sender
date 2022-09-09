import React, {useState, useEffect} from "react"
import './authorization.css'
import {login} from '../../controllers/controller'
import {Link} from 'react-router-dom'
const bcrypt = require("bcryptjs")

const Login = () => {
    
  const [Loginemail, setEmail] = useState("")
  const [Userpassword, setPassword] = useState("")

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
    .then(res => res.json())
    .then(setUsers)
    
  }, []);

  const [checkUser, setCheckUser] = useState(false)

  function checkInputs(){
    if(users.some(user => (user.email === Loginemail && bcrypt.compareSync(Userpassword, user.password)))){
      login(Loginemail, Userpassword)
    }
    else{
      setCheckUser(true)
    }
  }

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Log In</div>
        <input onChange={(event) => (setEmail(event.target.value), setCheckUser(false))} value={Loginemail} className="auth_input" type="text" placeholder="Enter email"></input>
        <input onChange={(event) => (setPassword(event.target.value))} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        {checkUser ? (
          <div className="error_text">Invalid email or password</div>
        ):("")}
        <div className="links">
          {Loginemail && Userpassword ? (
            <button className="nav_log_out" style={{float: "left"}} onClick={() => (checkInputs())}>Log in</button>
          ):(
            <button className="nav_log_out" style={{float: "left", color: "#ffffff30"}} disabled>Log in</button>
          )}
          <Link to="/" className="nav_log_out" style={{float: "right"}}>Back</Link>
        </div>
      </div>
     </div>
  )
}

export default Login