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
export const updateMapById = (id, map, chloro) =>{
    console.log("IM CRAZY", chloro)
    let crazyFix;
    if(!chloro){
        crazyFix = null;
    }
    else{
        crazyFix = { ...chloro };
    }
    return maps.put(`/map/${id}`,{
        map: map,
        chloro: crazyFix
    })
}
export const getMapById = (id) =>maps.get(`/map/${id}`)

export const getUserMapIdPairs = () =>maps.get('/usermapidpairs')

export const forkMap = (id) => maps.post(`/map/${id}`)
export const deleteMap = (id) => maps.delete(`/map/${id}`)
export const getPublicMapIdPairs = ()=>maps.get(`/publicmapidpairs`)


const apis = {
    createMap,
    updateMapById,
    getMapById,
    forkMap,
    getUserMapIdPairs,
    deleteMap,
    getPublicMapIdPairs
}

export default apis