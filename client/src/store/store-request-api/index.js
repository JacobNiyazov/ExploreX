import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/user',
})

export const editUserInfo = (id, username, email, bio, password) => {
  return api.put(`/editAccount/${id}`, {
      username: username,
      email : email,
      bio: bio,
      password : password,
  })
}

const apis = {
  editUserInfo,
}

export default apis