import React, { useState, useContext, useEffect } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { GlobalStoreContext } from '../../store';
import { MapContainer, TileLayer, ZoomControl, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import DeleteIcon from '@mui/icons-material/Delete'
//import * as ReactDOMServer from 'react-dom/server';
import L from "leaflet";
import { Box, Grid, Typography } from '@mui/material';
import { BaseMapSwitch, ControlGrid, BaseMapContainer, BaseMapBlur }from '../StyleSheets/MapEditStyles.js'
//import DotDistMap from '../DotDistMap.js';
//import SpikeMap from '../SpikeMap.js';
import HeatMap from "../HeatMap.js";
import ChloroplethMap from '../ChloroplethMap.js';
import VoronoiMap from '../VoronoiMap.js';
import DeletePostModal from '../DeletePostModal';
import ExportMapModal from '../ExportMapModal';

import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  StyledTypography,
  StyledBox,
  StyledForkButton,
} from '../StyleSheets/PublicMapStyles';
import { ReactionButton, ReactionCount } from '../StyleSheets/MapFeedStyles'; // adjust the import path as needed
import CommentList from '../CommentList';
import CommentForm from '../CommentForm';
import { AuthContext } from '../../auth'
import { useNavigate } from 'react-router-dom';

const PublicMapView = () => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  //const [geojsonData, setGeojsonData] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false)
    navigate("/feed");
  };
  const [openExport, setOpenExport] = useState(false);
  const handleOpenExport = () => setOpenExport(true);
  const handleCloseExport = () => setOpenExport(false);
  const navigate = useNavigate();

  useEffect(() => {
    const waitForAuthCheck = async () => {
        if (auth.loggedIn === undefined) {
            // Wait until authentication check is completed
            await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust time as needed
            waitForAuthCheck(); // Re-check status
        } else {
            if(!auth.loggedIn){
                store.setCurrentPage(store.currentPageType.login)
                navigate("/login");
            }   
            setLoading(false);
            
        }
    };

    waitForAuthCheck();
  }, [auth, navigate, store]);

  let likes = [];
  let dislikes = [];

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [baseMap, setBaseMap] = useState(false);

  useEffect(() => {
    setLiked(likes.includes(auth.user?.username));
    setDisliked(dislikes.includes(auth.user?.username));
  }, [likes, dislikes, auth.user?.username]);
  console.log(store.currentMap)
  if (!store.currentMap || loading) {
    return <div>Loading...</div>; // or any loading indicator
  }
  let map = store.currentMap;
  likes = store.currentMap.reactions.likes;
  dislikes = store.currentMap.reactions.dislikes;

  const handleLikeToggle = (event) => {
    //setLiked((prevLiked) => !prevLiked);
    //setDisliked(false);
    event.stopPropagation()
    let likeresult = likes.filter((name)=> name === auth.user.username)
    let dislikeresult = dislikes.filter((name) => name === auth.user.username)
    if(likeresult.length === 0){
      //this means theyre able to like
      if(dislikeresult.length > 0){
        //this means they have to remove this name from the array
        dislikes = dislikes.filter((name)=>name!==auth.user.username)
        setDisliked(false)
      }
      setLiked(true)
      likes.push(auth.user.username)
      console.log("this is likes in public map view: ",likes)
      store.updateMapReaction(map,likes,dislikes,false,null)
    }
    else{
      // if its in the likeresults that means this user is removing their like
      likes = likes.filter((name)=>name!==auth.user.username)
      setLiked(false)
      store.updateMapReaction(map,likes,dislikes,false,null)
    }
  };
  

  const handleDislikeToggle = (event) => {
    event.stopPropagation();
    let likeresult = likes.filter((name)=> name === auth.user.username)
    let dislikeresult = dislikes.filter((name) => name === auth.user.username)
    if(dislikeresult.length === 0){
      //this means theyre able to dislike
      if(likeresult.length > 0){
        //this means they have to remove this name from the array
        likes = likes.filter((name)=>name!==auth.user.username)
        setLiked(false)
      }
      setDisliked(true)
      dislikes.push(auth.user.username)
      store.updateMapReaction(map,likes,dislikes,false,null)
    }
    else{
      dislikes = dislikes.filter((name)=>name!==auth.user.username)
      setDisliked(false)
      store.updateMapReaction(map,likes,dislikes,false,null)
    }
  };
  const handleBaseMap = () =>{
    setBaseMap(!baseMap);
  }

  const handleFork = async () => {
    console.log("Forking")
    await store.handleFork();
    
    // store.setCurrentPage(store.currentPageType.editMapScreen, store.currentMap)
    navigate(`/editMap?id=${map._id}`)


  }
  const DotLayer = ({ typeData, regionData }) => {
    const leafletMap = useMap();
 
    useEffect(() => {
      leafletMap.invalidateSize();
      let dotLayer;
      if(typeData.features){
        dotLayer = L.geoJSON(typeData, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 3,
                fillColor: "#ff24bd",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            })
          },
        }).addTo(leafletMap);
      }
      
      const regionLayer = L.geoJSON(regionData, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'Polygon':
                case 'MultiPolygon':
                    return { color: "#555", weight: 2, opacity: 0.6, fillOpacity: 0.1 };
                case 'LineString':
                case 'MultiLineString':
                    return { color: "#f55", weight: 2, opacity: 0.8 };
                default:
                    return {}; // Point geometries, if any, are already handled in dot density layer
            }
        },
        // Ensure that no default marker is created for point features
        pointToLayer: function (feature, latlng) {
          return null;
        }
      }).addTo(leafletMap);
      try{
        leafletMap.fitBounds(L.geoJSON(regionData).getBounds());
      }
      catch (err){
        console.log(err)
      }
      if(typeData.features) dotLayer.bringToFront();
  
      return () => {
        if(typeData.features) dotLayer.remove();
        regionLayer.remove();
      };
    }, [typeData, regionData, leafletMap]);
  
    return null;
  };
  const SpikeLayer = ({ typeData, regionData }) => {
    const leafletMap = useMap();
 
    useEffect(() => {
      leafletMap.invalidateSize();
      let spikeFeatureGroup; 
      if(typeData.features){
        spikeFeatureGroup = L.featureGroup().addTo(leafletMap);
        typeData.forEach(spike => {
          const spikeLayer = L.polygon(spike.map(point => [point.lat, point.lng]), {
            color: '#ff24bd',
            fillColor: '#ff24bd',
            fillOpacity: 0.1  // Reduced opacity for more transparency
          });
          spikeLayer.addTo(spikeFeatureGroup);
        });
      }
      const regionLayer = L.geoJSON(regionData, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'Polygon':
                case 'MultiPolygon':
                    return { color: "#555", weight: 2, opacity: 0.6, fillOpacity: 0.1 };
                case 'LineString':
                case 'MultiLineString':
                    return { color: "#f55", weight: 2, opacity: 0.8 };
                default:
                    return {}; // Point geometries, if any, are already handled in dot density layer
            }
        },
        // Ensure that no default marker is created for point features
        pointToLayer: function (feature, latlng) {
          return null;
        }
      }).addTo(leafletMap);
      try{
        leafletMap.fitBounds(L.geoJSON(regionData).getBounds());
      }
      catch (err){
        console.log(err)
      }
      if(typeData.features) spikeFeatureGroup.bringToFront();
  
      return () => {
        if(typeData.features) spikeFeatureGroup.remove();
        regionLayer.remove();
      };
    }, [typeData, regionData, leafletMap]);
  
    return null;
  };
  // const ChloroLayer = ({ typeData, regionData }) => {
  //   const leafletMap = useMap();
 
  //   useEffect(() => {
  //     leafletMap.invalidateSize();
  //     let dotLayer;
  //     if(typeData.features){
  //       dotLayer = L.geoJSON(typeData, {
  //         pointToLayer: function (feature, latlng) {
  //           return L.circleMarker(latlng, {
  //               radius: 3,
  //               fillColor: "#ff24bd",
  //               color: "#000",
  //               weight: 1,
  //               opacity: 1,
  //               fillOpacity: 0.8
  //           })
  //         },
  //       }).addTo(leafletMap);
  //     }
      
  //     const regionLayer = L.geoJSON(regionData, {
  //       style: function (feature) {
  //           switch (feature.geometry.type) {
  //               case 'Polygon':
  //               case 'MultiPolygon':
  //                   return { color: "#555", weight: 2, opacity: 0.6, fillOpacity: 0.1 };
  //               case 'LineString':
  //               case 'MultiLineString':
  //                   return { color: "#f55", weight: 2, opacity: 0.8 };
  //               default:
  //                   return {}; // Point geometries, if any, are already handled in dot density layer
  //           }
  //       },
  //       // Ensure that no default marker is created for point features
  //       pointToLayer: function (feature, latlng) {
  //         return null;
  //       }
  //     }).addTo(leafletMap);
  //     try{
  //       leafletMap.fitBounds(L.geoJSON(regionData).getBounds());
  //     }
  //     catch (err){
  //       console.log(err)
  //     }
  //     if(typeData.features) dotLayer.bringToFront();
  
  //     return () => {
  //       if(typeData.features) dotLayer.remove();
  //       regionLayer.remove();
  //     };
  //   }, [typeData, regionData, leafletMap]);
  
  //   return null;
  // };
  const MapEditInner = () =>{
    if(map.type === "Dot Distribution Map"){
      let data = {
        type: 'FeatureCollection',
        features: store.currentMap.graphics.typeSpecific.dotPoints[0],
      };
      return <DotLayer typeData={data} regionData={map.graphics.geojson}/>;

    }
    else if(map.type === "Spike Map"){
        let data = store.currentMap.graphics.typeSpecific.spikeData;
        return <SpikeLayer typeData={data} regionData={map.graphics.geojson}/>;
    }
    else if(map.type === "Heat Map"){
        if(map.graphics.geojson){
            return <HeatMap geojsonData ={map.graphics.geojson} property = {map.graphics.typeSpecific.property}/>
        }
    }
    else if(map.type === "Chloropleth Map"){
        return <ChloroplethMap/>
    }
    else if(map.type === "Voronoi Map"){
      console.log(map)
        return <VoronoiMap />
    }
    return null;
  }
  

  let forkButton = ""
  let commentSection = ""
  let deleteButton = ""
  if(auth.user !== null && auth.loggedIn === true){
    forkButton = (<StyledForkButton onClick={handleFork} sx={{ 
        position: 'absolute', 
        top: 0, 
        right: 0 
    }}>
      <CallSplitIcon />
      <StyledTypography variant="h5" >
        Fork
      </StyledTypography>
    </StyledForkButton>)

    if(store.currentMap && auth.user.username === store.currentMap.ownerUsername){
      
      deleteButton = (
      <StyledForkButton 
        sx={{ 
          marginLeft: "7px"
        }} 
        onClick = {handleOpenDelete} 
        data-testid="delete-button">
        <DeleteIcon fontSize= "large"/>
      </StyledForkButton>)
    }

    commentSection = (<CommentForm map={map}/>)

  }
  if (store.currentPage === store.currentPageType.publicMapView){
      return (
      <Box data-testid='public-map-view' sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'start', 
        position: 'relative', // Added to position the button relative to this box
        mt: 2
    }}>
        <StyledCard>
          <StyledTypography variant="h4" component="div">
            {map.title}
          </StyledTypography>
          <StyledCardMedia alt={`Map titled ${map.title}`}>
            <Grid item xs = {8}>
                <MapContainer center={[0,0]} zoom={3} style={{ height: '57vh'}} zoomControl={false}>
                    {
                        baseMap ?
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                        />
                        :null
                    }
                    <MapEditInner />
                    {/* {geojsonData && <GeoJSON data={geojsonData} />} */}

                    {/* <GeoJSON data={geojson} onEachFeature={onEachFeature} /> */}
                    <ZoomControl position="bottomleft"/>
                      <ControlGrid>
                        <BaseMapContainer>
                            <BaseMapBlur>
                                <BaseMapSwitch onChange={handleBaseMap}></BaseMapSwitch>
                                <Typography>Base Map</Typography>
                            </BaseMapBlur>
                        </BaseMapContainer>
                      </ControlGrid>
                </MapContainer>
            </Grid>
          </StyledCardMedia>
          <StyledCardContent>
            <StyledTypography variant="subtitle1">
              Author: {map.ownerUsername}
            </StyledTypography>
            <StyledTypography variant="body1" paragraph>
              {map.type}
            </StyledTypography>
            <StyledBox>
              <ReactionButton disabled={auth.isGuest} data-testid = "map-like-button" selected={liked} onClick={handleLikeToggle}>
                <ThumbUpIcon />
                <ReactionCount data-testid = "map-likes-count">{likes.length}</ReactionCount>
              </ReactionButton>
              <ReactionButton disabled={auth.isGuest} data-testid = "map-dislike-button" selected={disliked} onClick={handleDislikeToggle}>
                <ThumbDownIcon />
                <ReactionCount data-testid = "map-dislikes-count">{dislikes.length}</ReactionCount>
              </ReactionButton>
            </StyledBox>
          </StyledCardContent>
          <CommentList map={map} commentsList ={map.reactions.comments} />
          {commentSection}
        </StyledCard>
        <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0 
        }}>
          {forkButton}
          <StyledForkButton 
            sx={{ 
              marginLeft: "7px"
            }} 
            onClick = {handleOpenExport}
            data-testid="export-button" >
            <StyledTypography variant="h5">
              Export
            </StyledTypography>
          </StyledForkButton>
          {deleteButton}
        </Box>
        <DeletePostModal
            open={openDelete} 
            onClose={handleCloseDelete}
            map = {store.currentMap}
            screen= "MapFeed"
            />

        <ExportMapModal
            open={openExport} 
            onClose={handleCloseExport}
            map = {store.currentMap}
            />
      </Box>
    );
  }
  else{
    return <div>Loading...</div>
  }
};

export default PublicMapView;
