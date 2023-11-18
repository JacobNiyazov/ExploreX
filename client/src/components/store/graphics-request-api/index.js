import axios from 'axios'

axios.defaults.withCredentials = true;
const graphics = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/graphics',
})

export const createGraphics = (type, features, ownerUsername) =>{
    return graphics.post("/graphics/", {
        type: type,
        features: features,
        ownerUsername: ownerUsername
    })
}
export const updateGraphicsById = (id) =>{
    return graphics.put(`/graphics/${id}`,{
        graphics: graphics
    })
}
export const getGraphicsById = (id) =>{
    return graphics.get(`/graphics/${id}`)
}
export const deleteGraphics = (id) =>{
    return graphics.delete(`/graphics/${id}`)
}