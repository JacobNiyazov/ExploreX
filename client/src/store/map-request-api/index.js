import axios from 'axios'
axios.defaults.withCredentials = true;
const maps = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/api',
})

export const createMap = (ownerUsername, stringGraphics, mapType, publishDate, fileType) => {
    console.log(stringGraphics)
    return maps.post(`/map/`, {
        // SPECIFY THE PAYLOAD
        //owner, stringGraphics, type, publishDate, fileType
        ownerUsername: ownerUsername, 
        stringGraphics: stringGraphics,
        mapType: mapType, 
        publishDate: publishDate,
        fileType: fileType
    })
}
export const updateMapById = (id, map) =>{
    return maps.put(`/map/${id}`,{
        map: map
    })
}
export const getMapById = (id) =>maps.get(`/map/${id}`)

export const getUserMapIdPairs = (id) =>maps.get('/usermapidpairs')

export const deleteMap = (id) => {maps.delete(`/map/${id}`)}
export const getPublicMapPairs = ()=>maps.get(`/publicmapidpairs`)


const apis = {
    createMap,
    updateMapById,
    getMapById,
    getUserMapIdPairs,
    deleteMap,
    getPublicMapPairs
}

export default apis