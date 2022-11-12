import axios from 'axios'
import { saveData } from '../service/service'
const bcrypt = require("bcryptjs")

export const registration = async (email, name, password, telegram) => {
  try{
    const hashPassword = await bcrypt.hash(password, 4)
    const foldername = "default"
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/registration`, {email, name, password, hashPassword, telegram})
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addfolder`, {foldername, email})
  } catch (e) {
    console.log(e)
  }
}


export const login = async (email, password) => {
  try{
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {email, password})
    saveData(response.data.name, response.data.email)
  } catch (e) {
    console.log(e)
  } 
}



export const addnote = async (name, folderId, folderName) => {
  try{
    const now = new Date()

    const desc = ""
    const to = ""
    const finishDate = ""
    const offset = 0
    const offsetTime = 0
    const status = "todo"
    const folder = folderName
    const active = false
    const deleted = false
    const startDate = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()
    const deleteDate = ""
    const updateDate = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()
    const lastUpdate = "Task created"
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addtask`, {name, desc, to, finishDate, offset, offsetTime, status, folder, folderId, active, deleted, startDate, deleteDate, updateDate, lastUpdate})
  } catch (e) {
    console.log(e)
  }
}



export const addfolder = async (foldername, email) => {
  try{
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addfolder`, {foldername, email})
  } catch (e) {
    console.log(e)
  }
}



export const updatefield = async (field, info, ind) => {
  try{
    const user = localStorage.getItem("email")
    await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/changefield/:_id`, {field, user, info, ind})
  } catch (e) {
    console.log(e)
  }
}



export const addtime = async (ind, noteDate, finishDate, time) => {
  try{
    const user = localStorage.getItem("email")
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/addtime`, {user, ind, noteDate, finishDate, time})
  } catch (e) {
    console.log(e)
  }
}



export const settimer = async (ind, offset) => {
  try{
    const user = localStorage.getItem("email")
    const offsetTime = offset.slice(0,2) *  3600000 + offset.slice(3,5) *  60000
    await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/settimer`, {user, ind, offset, offsetTime})
  } catch (e) {
    console.log(e)
  }
}
