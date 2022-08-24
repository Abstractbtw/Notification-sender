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
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => setUsers(data))
    
  }, []);

  const [checkUser, setCheckUser] = useState(false)
  const [checkPass, setCheckPass] = useState(false)

  function checkInputs(){
    let exists = 0
    users.map(user => {
      if(Loginemail === user.email){
        exists = 1
        if(!bcrypt.compareSync(Userpassword, user.password)){
          setCheckPass(true)
        }
      }
    })
    if (exists === 0){
      setCheckUser(true)
    }
    if(!(checkPass && checkUser)){
      login(Loginemail, Userpassword)
    }
  }

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Log In</div>
        <input onChange={(event) => (setEmail(event.target.value), setCheckUser(false))} value={Loginemail} className="auth_input" type="text" placeholder="Enter email"></input>
        {checkUser ? (
          <div className="error_text">User not found</div>
        ):("")}
        <input onChange={(event) => (setPassword(event.target.value), setCheckPass(false))} value={Userpassword} className="auth_input" type="password" placeholder="Enter password"></input>
        {checkPass && !checkUser ? (
          <div className="error_text">Wrong password</div>
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