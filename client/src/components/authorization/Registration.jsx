import React, {useState, useEffect} from "react"
import './authorization.css'
import { registration } from '../../controllers/controller'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorText, LabelText } from '../popups/ErrorText'
import { omit } from 'lodash'

const { getUsers } = require("../../service/service")

const Registration = () => {
  
  const [Username, setName] = useState("")
  const [Userpassword, setPassword] = useState("")
  const [Useremail, setEmail] = useState("")
  const [Usertelegram, setTelegram] = useState("")

  const [validateInputs, setValidateInputs] = useState(false)

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data))
  }, [])

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()



  const validate = (name, value) => {

    switch(name){

      case "email":

        let exists
        users.map(user => {
          if(value === user.email){
            exists = 1
          }
        })
        if(exists || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))){
          setErrors({
            ...errors,
            email:"Value is not email or user already exists"
          }) 
        } else {

          let newObj = omit(errors, "email")
          setErrors(newObj)

        }
        break

      case "nickname":
        if(!(/^[a-zA-Z0-9]+$/.test(value))){
          setErrors({
            ...errors,
            nickname:"Empty field"
          })
        } else {
          let newObj = omit(errors, "nickname")
          setErrors(newObj)
        }
        break

      case "pass":
        if(value.length < 3 || value.length > 12){
          setErrors({
            ...errors,
            pass:"Password must be longer than 3 and shorter than 12 symbols"
          }) 
        } else {
          let newObj = omit(errors, "pass")
          setErrors(newObj)
        }
        break

      default:
        break
    }

  }

  const handleChange = (event) => {

    let name = event.target.name
    let val = event.target.value

    console.log(errors)

    validate(name, val)
  }

  const checkInputs = () => {
    registration(Useremail, Username, Userpassword, Usertelegram)
    if(Object.keys(errors).length){
      return setValidateInputs(true)
    } else {
      return navigate("/login")
    }
    
  }

  return (
    <div className="auth_container">
      <div className="auth">
        <div className="auth_header">Registration</div>
        <LabelText message="Email" />
        <input name="email" defaultValue={Useremail} className="auth_input" type="text" placeholder="Enter email" onChange={(event) => (handleChange(event), setEmail(event.target.value), setValidateInputs(false))} />
          {validateInputs && <ErrorText trigger={errors.email} message={errors.email} />}
        <LabelText message="Name" />
        <input name="nickname" defaultValue={Username} className="auth_input" type="text" placeholder="Enter name" onChange={(event) => (handleChange(event), setName(event.target.value), setValidateInputs(false))} />
          {validateInputs && <ErrorText trigger={errors.nickname} message={errors.nickname} />}
        <LabelText message="Password" />
        <input name="pass" defaultValue={Userpassword} className="auth_input" type="password" placeholder="Enter password" onChange={(event) => (handleChange(event), setPassword(event.target.value), setValidateInputs(false))} />
          {validateInputs && <ErrorText trigger={errors.pass} message={errors.pass} />}
        <LabelText message="Telegram ID" />
        <input onChange={(event) => (setTelegram(event.target.value))} defaultValue={Usertelegram} className="auth_input" type="text" placeholder="Enter telegram ID" />
        <div className="links">
          {Useremail && Username && Userpassword && Usertelegram ? (
            <button className="nav_log_out" style={{float: "left"}} onClick={checkInputs}>Sign in</button>
          ):(
            <button className="nav_log_out" style={{float: "left", color: "#ffffff30"}} disabled>Sign in</button>
          )}
          <Link to="/" className="nav_log_out" style={{float: "right"}}>Back</Link>
        </div>
      </div>
     </div>
  )
}

export default Registration