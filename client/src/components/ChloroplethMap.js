import { useContext, useEffect, useRef } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';

const ChloroplethMap = ({
  colors,
  sizes,
  opacities,
  hasStroke,
  hasFill,
}) => {

    const { store } = useContext(GlobalStoreContext);
    const storeRef = useRef(store);
    const map = useMap();

    useEffect(() => {
        function generateColor(usedColors) {
          let newColor;
          do {
              newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
          } while (usedColors.includes(newColor)); // Check if the color is already used
        
          return newColor;
        }
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
              console.log("ERROR", inputString)
              return null; 
            }
          }

          
        const generateColorRanges = (data, numRanges = 7) => {
            const sortedData = data.slice().sort((a, b) => a - b); // Sort a copy of the data
            const colorRanges = [];
            
            for (let i = 0; i < numRanges; i++) {
                const index = Math.floor((sortedData.length - 1) * (i / numRanges));
                colorRanges.push(sortedData[index]);
            }
            
            return colorRanges;
        };

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
        const chloroLayerGroup = L.featureGroup().addTo(map);


        const updateLayers = (geojsonData, chloroInfo) => {
          chloroLayerGroup.clearLayers();
          let currentNum = 0;
          let chloroData = [];
          let flag = false;
          let coloring = []
          let counter = 0;
          let color;
          let usedColors = [];
          let colorScheme = "";


          if(!chloroInfo){
            geojsonData.features.forEach(feature => {
              if (flag){
                // if (counter < 25){
                  color = generateColor(usedColors);
                  usedColors.push(color)
                  counter = counter + 1;
                // }
                coloring[feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]] = color;

              }
              else if(typeof(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]) === 'string'){
                  currentNum = convertStringToNumber(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]);
                  if (currentNum === null){
                    flag = true;
                    if (counter < 10){
                      color = generateColor(usedColors);
                      usedColors.push(color)
                      counter = counter + 1;
                    }
                    coloring[feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]] = color;
    
                  }
              }
              else{
                  currentNum = feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property];
              }
              chloroData.push(currentNum)
            })
            if (!flag){
              colorScheme= ['#FED976', '#FEB24C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026', '#FFEDA0']
              let tempcoloring = generateColorRanges(chloroData)
              coloring = {};
              colorScheme.forEach((color, index) => {
                coloring[tempcoloring[index]] = color;
              });

            }

          }
          else{
            console.log("INFOMRATION")
            console.log(chloroInfo)
            flag = chloroInfo.isString
            coloring = chloroInfo
          
          }        
      
            L.geoJSON(geojsonData, {
                style: (feature) => {
                    let fillColor;
                    let propertyValue;
                    if (flag){
                      fillColor = coloring[feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]];;
                    }
                    else if(typeof(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]) === 'string'){
                        propertyValue = convertStringToNumber(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]);
                    }
                    else{
                        propertyValue = feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property];
                    }
                    if (!flag){
                      fillColor = getColor(propertyValue, coloring);
                    }

                  
                    return {
                      fillColor,
                      stroke: hasStroke,
                      color: colors.StrokeColor,
                      weight: sizes.StrokeWeight,
                      opacity: opacities.StrokeOpacity,
                      fillOpacity: 0.8 
                    };
                },
                pointToLayer: function (feature, latlng) {
                  return null;
                }
              }).addTo(chloroLayerGroup);

            try{
                map.fitBounds(chloroLayerGroup.getBounds());
            }
            catch (err){
                console.log(err)
            }
            if(!flag){
              coloring["isString"] = false;
              return {
                colors: coloring
              };
            }
            coloring["isString"] = true;
            return {
              colors: coloring
            };
        }
        var geojsonData = storeRef.current.currentMap.graphics.geojson;
        var chloroInfo = storeRef.current.currentMap.graphics.typeSpecific.chloroLegend

        // console.log(geojsonData) 

        console.log("SCHEME")
        console.log(storeRef.current.currentMap.graphics)
        console.log(chloroInfo)
        var result = updateLayers(geojsonData, chloroInfo)
        console.log(result)
       
        if(storeRef.current.currentMap.graphics.typeSpecific.chloroLegend === null){
          console.log("UPDATING NEW LEGEND")
          storeRef.current.updateMapGraphics(null, null, null, null, null, null, result.colors);
        } 
        return () => {
            chloroLayerGroup.remove();
          };
    }, [map, storeRef, colors, sizes, opacities, hasStroke]);

    return null;    
}

export default ChloroplethMap;
