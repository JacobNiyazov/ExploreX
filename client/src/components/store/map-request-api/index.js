import axios from 'axios'

axios.defaults.withCredentials = true;
const maps = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/maps',
})
export const createMap = (title, ownerUsername, reactions, graphics, isPublic, type, publishDate) => {
    return maps.post(`/map/`, {
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
    return maps.put(`/map/${id}`,{
        map: map
    })
}
export const getMapById = (id) =>{
    return maps.get(`/map/${id}`)
}
export const getUserMapIdPairs = (id) =>{
    return maps.get('usermapidpairs')
}
export const deleteMap = (id) => {
    return maps.delete(`/map/${id}`)
}
export const getPublicMapPairs = ()=>{
    return maps.get('/publicmapidpairs')
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