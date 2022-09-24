import axios from 'axios'

export const getNotes = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

export const getUsers = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/users`, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

export const getFolders = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/folders`, {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

export const saveData = (name, email) => {
  localStorage.setItem('name', name)
  localStorage.setItem('email', email)
}
      