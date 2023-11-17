import axios from 'axios'

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/auth',
})

export const getLoggedIn = () => api.get(`/loggedIn/`);

export const loginUser = (username, password) => {
    return api.post(`/login/`, {
        username : username,
        password : password
    })
}
export const logoutUser = () => api.get(`/logout/`)
export const registerUser = (email, username, password, passwordVerify) => {
    return api.post(`/register/`, {
        email : email,
        username: username,
        password : password,
        passwordVerify : passwordVerify
    })
}
export const recoverPassword = (email) => {
    return api.post(`/forgotPassword/`, {
        email : email,
    })
}
export const resetUserPassword = (userId, token, password) => {
    return api.post(`/resetPassword/`, {
        userId: userId,
        token: token,
        password : password,
    })
}
const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    recoverPassword,
    resetUserPassword
}

export default apis
