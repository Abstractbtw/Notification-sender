import axios from 'axios'

const TOKEN = "5420841806:AAGsrf7SpO_Nq6P0SVGZCU1A9b_nywPbWV0"
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


export const registration = async (email, name, password, telegram) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/registration`, {email, name, password, telegram})
    document.location.reload()
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
    document.location.reload()
    window.location.replace("../")
  } catch (e) {
    console.log(e)
  } 
}



export const addnote = async (name, user) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addtask`, {name, user})
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



export const changefolder = async (folder, ind) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/changefolder`, {folder, ind})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}



export const changestatus = async (status, ind) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/changestatus`, {status, ind})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}



export const changeactive = async (active, ind) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/changeactive`, {active, ind})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}



export const updatetext = async (text, ind) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/updatetext`, {text, ind})
    document.location.reload()
  } catch (e) {
    console.log(e)
  }
}



export const addtime = async (ind, name, desc, folder, status, date, finishDate, time) => {
  try{
    const newTime = time.slice(0,2) *  3600000 + time.slice(3,5) *  60000
    const todayTime = date.getHours() * 3600000 + date.getMinutes() * 60000
    const now = new Date()
    finishDate = finishDate + " | " + time.slice(0,2) + ":" + time.slice(3,5)
    const noteDate = Date.parse(date) - todayTime + newTime
    if (noteDate >= Date.parse(now)) {
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




export const sendnote = async (telegramID, name, desc, folder, status) => {

  let message = `<b>${name}</b>\n\n`
  message += `<a>Folder: ${folder}</a>\n`
  message += `<a>Status: ${status}</a>\n\n`
  message += `<a>Description: ${desc}</a>`

  axios.post(URI_API, {
    chat_id: telegramID,
    parse_mode: 'html',
    text: message
  })
}