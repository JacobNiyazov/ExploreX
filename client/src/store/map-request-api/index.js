import axios from 'axios'
axios.defaults.withCredentials = true;
const maps = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL + '/api',
})

const headers = {
    'Content-Type': "multipart/form-data",
}

export const createMap = (ownerUsername, files, mapType, publishDate, fileType, property) => {
    return maps.post(`/map/`, files,
    { params:
        // SPECIFY THE PAYLOAD
        //owner, stringGraphics, type, publishDate, fileType
        {ownerUsername: ownerUsername, 
        files: files,
        mapType: mapType, 
        publishDate: publishDate,
        fileType: fileType,
        property:property},
    },  {headers:headers})
}
export const updateMapById = (id, map) =>{
    return maps.put(`/map/${id}`,{
        map: map
    })
}
export const getMapById = (id) =>maps.get(`/map/${id}`)

export const getUserMapIdPairs = () =>maps.get('/usermapidpairs')

export const deleteMap = (id) => maps.delete(`/map/${id}`)
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