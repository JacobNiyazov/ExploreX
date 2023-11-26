import axios from 'axios'

axios.defaults.withCredentials = true;
const graphicsApis = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/api',
})

export const createGraphics = (type, features, ownerUsername) =>{
    return graphicsApis.post("/graphics/", {
        type: type,
        features: features,
        ownerUsername: ownerUsername
    })
}
export const updateGraphicsById = (id, newGraphics) =>{
    return graphicsApis.put(`/graphics/${id}`,{
        graphics: newGraphics
    })
}
export const getGraphicsById = (id) =>{
    return graphicsApis.get(`/graphics/${id}`)
}
export const deleteGraphics = (id) =>{
    return graphicsApis.delete(`/graphics/${id}`)
}

const graphicsApi = {
    createGraphics,
    updateGraphicsById,
    getGraphicsById,
    deleteGraphics
}

export default graphicsApi