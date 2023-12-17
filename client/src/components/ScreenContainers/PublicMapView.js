import React, { useState, useContext, useEffect, useMemo } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { GlobalStoreContext } from '../../store';
import { MapContainer, TileLayer, ZoomControl, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import DeleteIcon from '@mui/icons-material/Delete'
import L from "leaflet";
import { Box, Grid, Typography } from '@mui/material';
import { BaseMapSwitch, ControlGrid, BaseMapContainer, BaseMapBlur, LegendContainer }from '../StyleSheets/MapEditStyles.js'
//import DotDistMap from '../DotDistMap.js';
//import SpikeMap from '../SpikeMap.js';
import DeletePostModal from '../DeletePostModal';
import ExportMapModal from '../ExportMapModal';
import CircularProgress from '@mui/material/CircularProgress';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as ReactDOMServer from 'react-dom/server';


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
import SpikeLegend from '../SpikeLegend';
import DotDistLegend from '../DotDistLegend';
import VoronoiLegend from '../VoronoiLegend';
import ChoroLegend from '../ChoroLegend';
import HeatMapLegend from '../HeatMapLegend.js';

const PublicMapView = () => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false)
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
  
  let currLiked = false;
  let currDisliked = false;
  /*if(store && store.currentMap && store.currentMap.reactions && auth.user !== null){
    currLiked = store.currentMap.reactions.likes.includes(auth.user.username);
  }
  if(store && store.currentMap && store.currentMap.reactions && auth.user !== null){
    currDisliked = store.currentMap.reactions.dislikes.includes(auth.user.username);
  }*/

  const [liked, setLiked] = useState(currLiked);
  const [disliked, setDisliked] = useState(currDisliked);
  const [baseMap, setBaseMap] = useState(false);
  useEffect(() => {
    if (store && store.currentMap && store.currentMap.reactions && auth.user !== null) {
      const isLiked = store.currentMap.reactions.likes.includes(auth.user.username);
      const isDisliked = store.currentMap.reactions.dislikes.includes(auth.user.username);
  
      setLiked(isLiked);
      setDisliked(isDisliked);
    }
  }, [store,store.currentMap, auth.user]);
  
  //useEffect(() => {
  //   setLiked(likes.includes(auth.user?.username));
  //   setDisliked(dislikes.includes(auth.user?.username));
  // }, [likes, dislikes, auth.user?.username]);
  //console.log(store.currentMap)
  if (!store.currentMap || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
        <CircularProgress style={{'color':'#ff24bd'}}/>
        Loading...
      </Box>
    );
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
      //console.log("this is likes in public map view: ",likes)
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
    //console.log("Forking")
    await store.handleFork()
    //console.log(store.currentMap._id)
    navigate(`/editMap?id=${store.currentMap._id}`)
  }
  const DotLayer = ({ typeData, regionData, stroke, fill, typeSpecific, text }) => {
    const leafletMap = useMap();
 
    useEffect(() => {
      const textStyles = {
        color: text.textColor,
        fontSize: text.textSize,
        fontFamily: text.textFont
      };
      leafletMap.invalidateSize();
      let dotLayer;
      if(typeData.features){
        dotLayer = L.geoJSON(typeData, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 3,
                fillColor: typeSpecific.dotColor,
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
                    return { stroke: stroke.hasStroke,
                      color: stroke.strokeColor,
                      weight: stroke.strokeWeight,
                      opacity: stroke.strokeOpacity,
                      fill: true,
                      fillColor: fill.fillColor,
                      fillOpacity: fill.fillOpacity, };
                case 'LineString':
                case 'MultiLineString':
                    return { stroke: stroke.hasStroke,
                      color: stroke.strokeColor,
                      weight: stroke.strokeWeight,
                      opacity: stroke.strokeOpacity,
                      fill: true,
                      fillColor: fill.fillColor,
                      fillOpacity: 0.01, };
                default:
                    return {}; // Point geometries, if any, are already handled in dot density layer
            }
        },
        // Ensure that no default marker is created for point features
        pointToLayer: function (feature, latlng) {
          return null;
        },
        onEachFeature: function (feature, layer) {
          // // Customize popup content
          layer.bindPopup(          
            ReactDOMServer.renderToString(
                <div className="leaflet-popup-content">
                    <p style={textStyles}><u><b>{typeSpecific.property}</b></u>{': ' + feature.properties[typeSpecific.property]}</p>
                </div>
            )
             + Object.keys(feature.properties).map(function (k) {
              if (k !== typeSpecific.property) {
                  return (
                      ReactDOMServer.renderToString(
                          <div className="leaflet-popup-content">
                              <p style={textStyles}>{k + ': ' + feature.properties[k]}</p>
                          </div>
                      )
                  );
              }
              else{
                return (
                  ReactDOMServer.renderToString(
                      <div className="leaflet-popup-content">
                      </div>
                  )
                );
              }
            }).join(""), {maxHeight: 200}
          )
        }
      }).addTo(leafletMap);
      try{
        leafletMap.fitBounds(L.geoJSON(regionData).getBounds());
      }
      catch (err){
        //console.log(err)
      }
      if(typeData.features) dotLayer.bringToFront();
  
      return () => {
        if(typeData.features) dotLayer.remove();
        regionLayer.remove();
      };
    }, [typeData, regionData, leafletMap, stroke, fill, typeSpecific, text]);
  
    return null;
  };
  const SpikeLayer = ({ typeData, regionData, stroke, fill, typeSpecific, text}) => {
    const leafletMap = useMap();
 
    useEffect(() => {
      const textStyles = {
        color: text.textColor,
        fontSize: text.textSize,
        fontFamily: text.textFont
      };
      leafletMap.invalidateSize();
      let spikeFeatureGroup; 
      if(typeData){
        spikeFeatureGroup = L.featureGroup().addTo(leafletMap);
        typeData.forEach(spike => {
          const spikeLayer = L.polygon(spike.map(point => [point.lat, point.lng]), {
            color: '#000',
            fillColor: typeSpecific.spikeColor,
            fillOpacity: 0.5  // Reduced opacity for more transparency
          });
          spikeLayer.addTo(spikeFeatureGroup);
        });
      }
      const regionLayer = L.geoJSON(regionData, {
        style: function (feature) {
            switch (feature.geometry.type) {
                case 'Polygon':
                case 'MultiPolygon':
                    return { stroke: stroke.hasStroke,
                      color: stroke.strokeColor,
                      weight: stroke.strokeWeight,
                      opacity: stroke.strokeOpacity,
                      fill: true,
                      fillColor: fill.fillColor,
                      fillOpacity: fill.fillOpacity, };
                case 'LineString':
                case 'MultiLineString':
                    return { stroke: stroke.hasStroke,
                      color: stroke.strokeColor,
                      weight: stroke.strokeWeight,
                      opacity: stroke.strokeOpacity,
                      fill: true,
                      fillColor: fill.fillColor,
                      fillOpacity: 0.01, };
                default:
                    return {}; // Point geometries, if any, are already handled in dot density layer
            }
        },
        // Ensure that no default marker is created for point features
        pointToLayer: function (feature, latlng) {
          return null;
        },
        onEachFeature: function (feature, layer) {
          // // Customize popup content
          layer.bindPopup(          
            ReactDOMServer.renderToString(
                <div className="leaflet-popup-content">
                    <p style={textStyles}><u><b>{typeSpecific.property}</b></u>{': ' + feature.properties[typeSpecific.property]}</p>
                </div>
            )
             + Object.keys(feature.properties).map(function (k) {
              if (k !== typeSpecific.property) {
                  return (
                      ReactDOMServer.renderToString(
                          <div className="leaflet-popup-content">
                              <p style={textStyles}>{k + ': ' + feature.properties[k]}</p>
                          </div>
                      )
                  );
              }
              else{
                return (
                  ReactDOMServer.renderToString(
                      <div className="leaflet-popup-content">
                      </div>
                  )
                );
              }
            }).join(""), {maxHeight: 200}
          )
        }
      }).addTo(leafletMap);
      try{
        leafletMap.fitBounds(L.geoJSON(regionData).getBounds());
      }
      catch (err){
        //console.log(err)
      }
      if(typeData) spikeFeatureGroup.bringToFront();
  
      return () => {
        if(typeData) spikeFeatureGroup.remove();
        regionLayer.remove();
      };
    }, [typeData, regionData, leafletMap, stroke, fill, typeSpecific, text]);
  
    return null;
  };
  const ChloroLayer = ({ typeData, regionData, property, stroke, fill, text, typeSpecific }) => {
    const leafletMap = useMap();
 
    useEffect(() => {
      const textStyles = {
        color: text.textColor,
        fontSize: text.textSize,
        fontFamily: text.textFont
      };
      leafletMap.invalidateSize();

      const getColor = (d, colorObject) => {
        let temp = {...colorObject}
        delete temp.isString;
        const keys = Object.keys(temp).map(Number).sort((a, b) => b - a);
        for (let i = 0; i < keys.length; i++) {
            if (d > keys[i]) {
                return temp[keys[i]];
            }
        }
        return temp[keys[0]];
      };

      function convertStringToNumber(inputString) {
        const editedString = inputString.replace(/,/g, '').replace(/%/g, '');
        let isNegative = false;
        let numberString = editedString;

        if (editedString.includes('-')) {
          isNegative = true;
          numberString = editedString.replace('-', '');
        }
      
        // Convert string to number
        let result = parseFloat(numberString);
      
        // Multiply by -1 for negative numbers
        if (isNegative) {
          result *= -1;
        }
      
        if (!isNaN(result)) {
          return result;
        } else {
          //console.log("ERROR", inputString)
          return null; 
        }
      }
      
      let flag = typeData.isString
      let coloring = typeData;
      const regionLayer = L.geoJSON(regionData, {
        style: function (feature) {
            let fillColor;
            let propertyValue;
            if (flag){
              fillColor = coloring[feature.properties[property].toLowerCase().trim()];
            }
            else if(typeof(feature.properties[property]) === 'string'){
                propertyValue = convertStringToNumber(feature.properties[property]);
            }
            else{
                propertyValue = feature.properties[property];
            }
            if (!flag){
              fillColor = getColor(propertyValue, coloring);
            }
            console.log(propertyValue)
            console.log(feature.properties[property])
            console.log(fillColor)
          
            return {
              fillColor,
              stroke: stroke.hasStroke,
              weight: stroke.strokeWeight,
              opacity: stroke.strokeOpacity,
              color: stroke.strokeColor,
              fillOpacity: fill.fillOpacity,
            };
        },
        pointToLayer: function (feature, latlng) {
          return null;
        },
        onEachFeature: function (feature, layer) {
          // // Customize popup content
          layer.bindPopup(          
            ReactDOMServer.renderToString(
                <div className="leaflet-popup-content">
                    <p style={textStyles}><u><b>{typeSpecific.property}</b></u>{': ' + feature.properties[typeSpecific.property]}</p>
                </div>
            )
             + Object.keys(feature.properties).map(function (k) {
              if (k !== typeSpecific.property) {
                  return (
                      ReactDOMServer.renderToString(
                          <div className="leaflet-popup-content">
                              <p style={textStyles}>{k + ': ' + feature.properties[k]}</p>
                          </div>
                      )
                  );
              }
              else{
                return (
                  ReactDOMServer.renderToString(
                      <div className="leaflet-popup-content">
                      </div>
                  )
                );
              }
            }).join(""), {maxHeight: 200}
          )
        }
      }).addTo(leafletMap);
      try{
        leafletMap.fitBounds(L.geoJSON(regionData).getBounds());
      }
      catch (err){
        //console.log(err)
      }
      // if(typeData.features) dotLayer.bringToFront();
  
      return () => {
        // if(typeData.features) dotLayer.remove();
        regionLayer.remove();
      };
    }, [typeData, regionData, property, leafletMap, stroke, fill, text, typeSpecific]);
  
    return null;
  };

  const VoronoiLayer = ({ geojson, fill, dot, stroke, text, value }) => {
    const leafletMap = useMap();
 
    useEffect(() => {
      leafletMap.invalidateSize();
      const textStyles = {
        color: text.textColor,
        fontSize: text.textSize,
        fontFamily: text.textFont
      };

      const regionLayer = L.geoJSON(geojson, {
        onEachFeature: function (feature, layer) {
          if(feature.geometry.type === 'Polygon'){
            layer.setStyle({
                stroke: stroke.hasStroke,
                color: stroke.strokeColor,
                weight: stroke.strokeWeight,
                opacity: stroke.strokeOpacity,
                fill: fill.hasFill,
                fillColor: fill.fillColor,
                fillOpacity: fill.fillOpacity,
              });
          }

          if(feature.geometry.type === 'Point'){
            layer.bindPopup(
              ReactDOMServer.renderToString(
              <div className="leaflet-popup-content">
                <p style={textStyles}>{'Represents: ' + value}</p>
              </div>)
            )
          }
          else{
            // // Customize popup content
            layer.bindPopup(Object.keys(feature.properties).map(function(k) {
                return (
                  ReactDOMServer.renderToString(
                  <div className="leaflet-popup-content">
                    <p style={textStyles}>{k + ': ' + feature.properties[k]}</p>
                  </div>)
                );        
            }).join(""), {
                maxHeight: 200
            });
          }
        },
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
              radius: 4,
              fillColor: dot,
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
          });
      }
      }).addTo(leafletMap);
      try{
        leafletMap.fitBounds(L.geoJSON(geojson).getBounds());
      }
      catch (err){
        //console.log(err)
      }
      // if(typeData.features) dotLayer.bringToFront();
  
      return () => {
        // if(typeData.features) dotLayer.remove();
        regionLayer.remove();
      };
    }, [geojson, leafletMap, fill, dot, stroke, text, value]);
  
    return null;
  };
  const HeatLayer = ({ data, stroke, fill, typeSpecific, text}) => {
    const leafletMap = useMap();
    const textStyles = useMemo(() => ({
      color: text.textColor,
      fontSize: text.textSize,
      fontFamily: text.textFont
    }), [text.textColor, text.textSize, text.textFont]);
    const low = store.currentMap.graphics.typeSpecific.lowGradient;
    const med = store.currentMap.graphics.typeSpecific.mediumGradient;
    const high = store.currentMap.graphics.typeSpecific.highGradient;
    console.log("beofre the use effect", data, stroke, fill, typeSpecific, text)
    useEffect(() => {
      console.log("first line of the use effect")
      leafletMap.invalidateSize();
      let heatLayer;
      // we have to recalculate the heat map here
      // 1. this is where we call the extract coords
        const extractCoordsFromFeature = (feature, property, props) => {
          const propertyValue = feature.properties[property];
    
          // Skip features without the selected property or with non-numeric property values
          if (propertyValue === undefined || propertyValue === null || isNaN(propertyValue)) {
            console.log("is this property a number?")
            return [];
          }
          let allProps = []
          for(let i = 0; i < props.length; i++){
            allProps.push(props[i].properties[property])
          }
          //console.log("ALL PROPS" , allProps)
          const intensity = parseFloat(propertyValue);
          
          // Handle MultiPolygon geometries
          if (feature.geometry.type === "MultiPolygon") {
            return feature.geometry.coordinates.flatMap((polygonCoords) =>
              extractCoordsFromPolygon(polygonCoords, intensity)
            );
          }
    
          // Handle Polygon geometries
          return extractCoordsFromPolygon(feature.geometry.coordinates, intensity);
        };
        let allProps = data.features
        let property = store.currentMap.graphics.typeSpecific.property
        const heatPoints = data?.features?.flatMap((feature) => {
          return extractCoordsFromFeature(feature, property, allProps);
        });
    
        console.log("colors: ", colors)
        let heatLayerOptions = {}
        if(heatPoints && heatPoints.length > 0){
          heatLayerOptions = {
            blur: 25,
            radius: 15,
            gradient:{
              0.25: colors.lowGradient,
              0.75: colors.mediumGradient,
              1: colors.highGradient
            }
          }
          // have to do the store update local map here
          console.log("what the f man PMV: ", heatPoints)
          
          console.log("updated local map me thinks PMV: ", store.currentMap)
          if(low === null|| med === null|| high === null){
              store.updateMapGraphics(null, null, null, null, null, null, null, null, colors.lowGradient, colors.mediumGradient, colors.highGradient)
          }
    };
  
    const heatLayerGroup = L.featureGroup().addTo(leafletMap);
    heatLayer = L.heatLayer(heatPoints, heatLayerOptions);
    console.log("I HAVE A FEAR THAT THE ISSUE IS WITH ADD TO")
    heatLayer.addTo(heatLayerGroup)
    heatLayerGroup.bringToFront()
    console.log("heat map points 3: ", heatPoints)

    const regionLayer = L.geoJSON(data, {
      style: function (feature) {
          switch (feature.geometry.type) {
              case 'Polygon':
              case 'MultiPolygon':
                  return { stroke: stroke.hasStroke,
                    color: stroke.strokeColor,
                    weight: stroke.strokeWeight,
                    opacity: stroke.strokeOpacity,
                    fill: true,
                    fillColor: fill.fillColor,
                    fillOpacity: fill.fillOpacity, };
              case 'LineString':
              case 'MultiLineString':
                  return { stroke: stroke.hasStroke,
                    color: stroke.strokeColor,
                    weight: stroke.strokeWeight,
                    opacity: stroke.strokeOpacity,
                    fill: true,
                    fillColor: fill.fillColor,
                    fillOpacity: 0.01, };
              default:
                  return {}; // Point geometries, if any, are already handled in dot density layer
            }
        },
        // Ensure that no default marker is created for point features
        pointToLayer: function (feature, latlng) {
          return null;
        },
        onEachFeature: function (feature, layer) {
          // // Customize popup content
          layer.bindPopup(          
            ReactDOMServer.renderToString(
                <div className="leaflet-popup-content">
                    <p style={textStyles}><u><b>{typeSpecific.property}</b></u>{': ' + feature.properties[typeSpecific.property]}</p>
                </div>
            )
             + Object.keys(feature.properties).map(function (k) {
              if (k !== typeSpecific.property) {
                  return (
                      ReactDOMServer.renderToString(
                          <div className="leaflet-popup-content">
                              <p style={textStyles}>{k + ': ' + feature.properties[k]}</p>
                          </div>
                      )
                  );
              }
              return null;
            }).join(""), {maxHeight: 200}
          )
        }
      }).addTo(leafletMap);
      try{
        leafletMap.fitBounds(L.geoJSON(data).getBounds());
      }
      catch (err){
        console.log(err)
      }
  
      return () => {
        regionLayer.remove();
      };
    }, [data, leafletMap, stroke, fill, typeSpecific, text, low, med, high, textStyles]);

    const extractCoordsFromPolygon = (polygonCoords, intensity) => {
      if (!Array.isArray(polygonCoords)) {
        console.error('Invalid polygon coordinates:', polygonCoords);
        return [];
      }
      if(polygonCoords.length === 2){
        const [longitude, latitude] = polygonCoords;
        return [[latitude, longitude, intensity]]; // [Latitude, Longitude, Intensity]
      }
      else{
        return polygonCoords[0].map((coord) => {
          return [coord[1], coord[0], intensity]; // [Latitude, Longitude, Intensity]
        });
      }
    };
  
    return null;
  };
  const MapEditInner = () =>{
    if(map.type === "Dot Distribution Map"){
      let fill = store.currentMap.graphics.fill;
      let stroke = store.currentMap.graphics.stroke;
      let typeSpecific = store.currentMap.graphics.typeSpecific;
      let text = store.currentMap.graphics.text
      let data = {
        type: 'FeatureCollection',
        features: store.currentMap.graphics.typeSpecific.dotPoints[0],
      };
      return <DotLayer typeData={data} regionData={map.graphics.geojson} fill={fill} stroke={stroke} typeSpecific={typeSpecific} text={text}/>;

    }
    else if(map.type === "Spike Map"){
        let data = store.currentMap.graphics.typeSpecific.spikeData;
        let fill = store.currentMap.graphics.fill;
        let stroke = store.currentMap.graphics.stroke;
        let typeSpecific = store.currentMap.graphics.typeSpecific;
        let text = store.currentMap.graphics.text
        return <SpikeLayer typeData={data} regionData={map.graphics.geojson} fill={fill} stroke={stroke} typeSpecific={typeSpecific} text={text}/>;
    }
    else if(map.type === "Heat Map"){
      console.log("HELLUR FROM INSIDE HEAT: ", store.currentMap)
      let data = store.currentMap.graphics.geojson;
      let fill = store.currentMap.graphics.fill;
      let stroke = store.currentMap.graphics.stroke;
      let typeSpecific = store.currentMap.graphics.typeSpecific
      let text = store.currentMap.graphics.text
      return <HeatLayer data = {data}
        fill = {fill}
        stroke = {stroke}
        typeSpecific={typeSpecific}
        text = {text}
      />
      /*let graphics = store.currentMap.graphics
      let colors = {
        TextColor: graphics.text.textColor,
        FillColor: graphics.fill.fillColor,
        StrokeColor: graphics.stroke.strokeColor,
        DotMap: graphics.typeSpecific.dotColor,
        SpikeMap: graphics.typeSpecific.spikeColor,
        VoronoiMap: graphics.typeSpecific.voronoiColor,
        lowGradient: graphics.typeSpecific.lowGradient,
        mediumGradient: graphics.typeSpecific.mediumGradient,
        highGradient: graphics.typeSpecific.highGradient
      }
      let sizes = {
        StrokeWeight: graphics.stroke.strokeWeight,
        TextSize: graphics.text.textSize
      }
      let opacities = {
        FillOpacity: graphics.fill.fillOpacity,
        StrokeOpacity: graphics.stroke.strokeOpacity
      }
      let hasStroke = graphics.stroke.hasStroke
      let hasFill = graphics.fill.hasFill
        return <HeatMap geojsonData ={map.graphics.geojson} 
        property = {map.graphics.typeSpecific.property}
        colors = {colors}
        sizes = {sizes}
        opacities = {opacities}
        hasStroke = {hasStroke}
        hasFill = {hasFill}
        screenFlag = "pmv"
        textFont = {store.currentMap.graphics.text.textFont}
        />*/
    }
    else if(map.type === "Choropleth Map"){
        //console.log("SHOWING MAP")
        let data = store.currentMap.graphics.typeSpecific.chloroLegend;
        let fill = store.currentMap.graphics.fill;
        let stroke = store.currentMap.graphics.stroke;
        let typeSpecific = store.currentMap.graphics.typeSpecific;
        let text = store.currentMap.graphics.text
        return <ChloroLayer typeData = {data} regionData={map.graphics.geojson} property = {map.graphics.typeSpecific.property} typeSpecific={typeSpecific} fill={fill} stroke={stroke} text={text}/>
    }
    else if(map.type === "Voronoi Map"){
        let dot = store.currentMap.graphics.typeSpecific.voronoiColor
        let fill = store.currentMap.graphics.fill;
        let stroke = store.currentMap.graphics.stroke;
        let text = store.currentMap.graphics.text
        let geojson = store.currentMap.graphics.geojson;
        let value = store.currentMap.graphics.typeSpecific.voronoiValue;
        return <VoronoiLayer geojson={geojson} fill={fill} stroke={stroke} text={text} dot={dot} value={value}/>
    }
    return null;
  }
  
  let DynamicLegend = null;
  let graphics = store.currentMap.graphics
  let colors = {
    TextColor: graphics.text.textColor,
    FillColor: graphics.fill.fillColor,
    StrokeColor: graphics.stroke.strokeColor,
    DotMap: graphics.typeSpecific.dotColor,
    SpikeMap: graphics.typeSpecific.spikeColor,
    VoronoiMap: graphics.typeSpecific.voronoiColor,
    lowGradient: graphics.typeSpecific.lowGradient,
    mediumGradient: graphics.typeSpecific.mediumGradient,
    highGradient: graphics.typeSpecific.highGradient
  }
  let legendFields = graphics.typeSpecific.chloroLegend
  let voronoiValue =  graphics.typeSpecific.voronoiValue
  if(store.currentMap.type === "Spike Map"){
      DynamicLegend = <SpikeLegend colors={colors}/>
  }
  else if(store.currentMap.type === "Dot Distribution Map"){
      DynamicLegend = <DotDistLegend colors={colors}/>
  }
  else if(store.currentMap.type === "Voronoi Map"){
      DynamicLegend = <VoronoiLegend 
                          colors={colors}
                          voronoiValue={voronoiValue}
                          setVoronoiValue={null}/>
  }
  else if(store.currentMap.type === "Heat Map"){
      DynamicLegend = <HeatMapLegend colors = {colors}/>
  }
  else if(store.currentMap.type === "Choropleth Map"){
      //console.log(legendFields)
      DynamicLegend = <ChoroLegend
          legendFields = {legendFields}
          legendAnchors = {null}
          handleLegendClick = {null}
          handleClose = {null}
          handleNewColor = {null}>
          </ChoroLegend>
  }

  let forkButton = ""
  let commentSection = ""
  let deleteButton = ""
  if(auth.user !== null && auth.loggedIn === true){
    forkButton = (<StyledForkButton onClick={handleFork} >
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

                        <LegendContainer id="legendcontainer" sx={store.currentMap.graphics.legend.hideLegend? {zIndex:-100} : {zIndex:1000}} style={{
                                maxHeight: '500px',
                                maxWidth: '500px',
                                overflowY: 'auto',
                            }}>
                            <Typography>{store.currentMap.graphics.legend.legendTitle}</Typography>
                            <div id="legenddiv" style={{ overflow: 'auto' }}>
                            {DynamicLegend}
                            </div>
                            
                        </LegendContainer>
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
            <StyledTypography variant="h5" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <FileDownloadIcon/>
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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
        <CircularProgress style={{'color':'#ff24bd'}}/>
        Loading...
      </Box>
    );
  }
};

export default PublicMapView;
