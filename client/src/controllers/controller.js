import axios from 'axios'

export const registration = async (email, name, password, telegram) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/registration`, {email, name, password, telegram})
    window.location.replace("../")
  } catch (e) {
    console.log(e)
  }
}


export const login = async (email, password) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {email, password})
    localStorage.setItem('name', response.data.user.name)
    localStorage.setItem('email', response.data.user.email)
    window.location.replace("../")
  } catch (e) {
    console.log(e)
  } 
}



export const addnote = async (name, user) => {
  try{
    const desc = ""
    const to = ""
    const finishDate = ""
    const offset = 0
    const offsetTime = 0
    const status = "todo"
    const folder = "default"
    const active = "inactive"
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addtask`, {name, user, desc, to, finishDate, offset, offsetTime, status, folder, active})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}



export const addfolder = async (name, user) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addfolder`, {name, user})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}



export const updatefield = async (field, info, ind) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/change${field}`, {info, ind})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}



export const addtime = async (ind, name, desc, folder, status, date, finishDate, time) => {
  try{
    const now = new Date()
    finishDate = finishDate + " | " + time.slice(0,2) + ":" + time.slice(3,5)
    const noteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.slice(0,2), time.slice(3,5))
    if (Date.parse(noteDate) >= Date.parse(now)) {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addtime`, {ind, noteDate, finishDate, time})
      document.location.reload()
    }
    else alert("Wrong date")
  } catch (e) {
    console.log(e)
  }
}



export const setoffset = async (ind, offset) => {
  try{
    const offsetTime = offset.slice(0,2) *  3600000 + offset.slice(3,5) *  60000
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/setoffset`, {ind, offset, offsetTime})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}
