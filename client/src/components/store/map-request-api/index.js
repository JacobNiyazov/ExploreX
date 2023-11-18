import axios from 'axios'

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/maps',
})
export const createMap = (title, ownerUsername, reactions, graphics, isPublic, type, publishDate) => {
    return api.post(`/map/`, {
        // SPECIFY THE PAYLOAD
        title:title,
        ownerUsername: ownerUsername, 
        reactions: reactions,
        graphics: graphics,
        isPublic: isPublic, 
        type: type, 
        publishDate: publishDate
    })
}
export const updateMapById = (id, map) =>{
    return api.put(`/map/${id}`,{
        map: map
    })
}
export const getMapById = (id) =>{
    return api.get(`/map/${id}`)
}
export const getUserMapIdPairs = (id) =>{
    return api.get('usermapidpairs')
}
export const deleteMap = (id) => {
    return api.delete(`/map/${id}`)
}
export const getPublicMapPairs = ()=>{
    return api.get('/publicmapidpairs')
}

const apis = {
    createMap,
    updateMapById,
    getMapById,
    getUserMapIdPairs,
    deleteMap,
    getPublicMapPairs
}

export default apis