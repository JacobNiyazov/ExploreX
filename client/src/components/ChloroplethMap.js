import { useContext, useEffect, useRef } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';

const ChloroplethMap = ({
  colors,
  sizes,
  opacities,
  hasStroke,
  handlePropertyDataLoad,
  propertyData,
  chloroProperty,
  setChloroProperty
}) => {

    const { store } = useContext(GlobalStoreContext);
    const storeRef = useRef(store);
    const map = useMap();
    let usedColors = [];


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
              //console.log("ERROR", inputString)
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
              if (d >= keys[i]) {
                  return temp[keys[i]];
              }
          }
          return temp[keys[0]];
        };
        const chloroLayerGroup = L.featureGroup().addTo(map);


        const updateLayers = (geojsonData, chloroInfo) => {
          chloroLayerGroup.clearLayers();
          let changedFlag = false;
          let currentNum = 0;
          let chloroData = [];
          let flag = false;
          let coloring = []
          let counter = 0;
          let color;
          let colorScheme = "";


          if(!chloroInfo){
            geojsonData.features.forEach(feature => {
              if (flag){
                // if (counter < 25){
                  color = generateColor(usedColors);
                  usedColors.push(color)
                  counter = counter + 1;
                // }
                coloring[feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property].toLowerCase().trim()] = color;

              }
              else if(typeof(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]) === 'string'){
                  currentNum = convertStringToNumber(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]);
                  if (currentNum === null){
                    flag = true;
                    color = generateColor(usedColors);
                    usedColors.push(color)
                    counter = counter + 1;
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
            flag = chloroInfo.isString
            coloring = chloroInfo
            if(!flag){
              geojsonData.features.forEach(feature => {
               if(typeof(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]) === 'string'){
                    currentNum = convertStringToNumber(feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property]);
                }
                else{
                    currentNum = feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property];
                }
                chloroData.push(currentNum)
              })
            
                chloroData.sort(function(a, b) {
                  const numericA = parseInt(a);
                  const numericB = parseInt(b);

                  if (numericA < 0 && numericB >= 0) {
                    return -1; 
                  } else if (numericB < 0 && numericA >= 0) {
                    return 1; 
                  } else {
                    return numericA - numericB; 
                  }
                });
                delete chloroInfo["isString"]

                let keysInOrder = [];
                let colorsInOrder = [];
                Object.keys(chloroInfo).forEach(key => {
                  keysInOrder.push(parseFloat(key)); 
                });

                keysInOrder.sort((a, b) => a - b);

                keysInOrder.forEach(key => {
                  colorsInOrder.push(chloroInfo[key]); 
                });


                colorScheme = colorsInOrder


                let tempcoloring = generateColorRanges(chloroData)
                tempcoloring.sort(function(a, b) {
                  const numericA = parseInt(a);
                  const numericB = parseInt(b);

                  if (numericA < 0 && numericB >= 0) {
                    return -1; // Place negative numbers before positive numbers
                  } else if (numericB < 0 && numericA >= 0) {
                    return 1; // Place positive numbers after negative numbers
                  } else {
                    return numericA - numericB; // Sort other numbers normally
                  }
                });
              
                coloring = {};
                colorScheme.forEach((color, index) => {
                  coloring[tempcoloring[index]] = color;
                });
                // changedFlag = true;
                const keys1 = Object.keys(coloring);
                const keys2 = Object.keys(chloroInfo);

                changedFlag = false;

                  // Check if the number of keys is the same
                  if (keys1.length !== keys2.length) {
                    changedFlag = true;
                  }

                  // Check if all keys and values are the same
                  for (let key of keys1) {
                    if (coloring[key] !== chloroInfo[key]) {
                      changedFlag = true;
                    }
                  }
              }
          
          }        
            let i = 0
            const usedColorsSet = new Set();
            L.geoJSON(geojsonData, {
                onEachFeature: function(feature, layer){
                  let tempi = i
                  layer.on({
                      click: (e) => {
                          if(feature.geometry.type !== 'Point'){
                              L.DomEvent.stopPropagation(e);
                              // Here we set the index to tempi
                              handlePropertyDataLoad(tempi)
                          }
                      },
                  })
                  i+=1
                },
                style: (feature) => {
                    let fillColor;
                    let propertyValue;
                    if (flag){
                      fillColor = coloring[feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property].toLowerCase().trim()];;
                      if(!fillColor){
                          changedFlag = true;
                          color = generateColor(usedColors);
                          counter = counter + 1;
                          fillColor = color;
                          coloring[feature.properties[storeRef.current.currentMap.graphics.typeSpecific.property].toLowerCase().trim()] = color;
                      }
                      usedColorsSet.add(fillColor);

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

              map.on('click',function(e) {
                //console.log('clicked on map', e);
                // Here we set the index to null
                handlePropertyDataLoad(null)
              });

            if(!flag){
              coloring["isString"] = false;
              return {
                colors: coloring,
                changedFlag: changedFlag
              };
            }

            const usedColorsArray = Array.from(usedColorsSet);

            const originalColoringLength = Object.keys(coloring).length - 1; 

            const updatedColoring = Object.fromEntries(
              Object.entries(coloring).filter(([key, value]) =>
                usedColorsArray.includes(value)
              )
            );
            // updatedColoring["isString"] = true;
            const updatedColoringLength = Object.keys(updatedColoring).length; // Get updated length
            const coloringChanged = originalColoringLength !== updatedColoringLength;
            changedFlag = changedFlag || coloringChanged 

            coloring = updatedColoring
            coloring["isString"] = true;
            return {
              colors: coloring,
              changedFlag: changedFlag
            };
        }
        var geojsonData = store.currentMap.graphics.geojson;
        var chloroInfo = storeRef.current.currentMap.graphics.typeSpecific.chloroLegend

        // //console.log(geojsonData) 

        if (chloroProperty){
          chloroInfo = chloroProperty
        }
        var result = updateLayers(geojsonData, chloroInfo)
       
        if(storeRef.current.currentMap.graphics.typeSpecific.chloroLegend === null){
          storeRef.current.updateMapGraphics(null, null, null, null, null, null, result.colors);
        } 
        else{
          if(result.changedFlag){
            setChloroProperty(result.colors)
            //console.log("NEW", result.colors)
          }
        }
        return () => {
            chloroLayerGroup.remove();
            map.off('click')
          };
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [map, storeRef, colors, sizes, opacities, hasStroke, chloroProperty, setChloroProperty, store.currentMap.graphics.geojson, usedColors]);

    useEffect(()=>{
      map.fitBounds(L.geoJSON(storeRef.current.currentMap.graphics.geojson).getBounds());
    }, [map])

    // Adding overlay for properties
    useEffect(() =>{
      const propertyLayerGroup = L.featureGroup().addTo(map);
      if(store.currentMap && propertyData.featureIndex !== null){
        let selected = {"type":"FeatureCollection", "features": [store.currentMap.graphics.geojson.features[propertyData.featureIndex]]};
        L.geoJSON(selected, {
          onEachFeature: function (feature, layer) {
            //console.log(":(")
            if(colors.StrokeColor === '#000000'){
              layer.setStyle({
                color: "#FFFFFF",
                weight: '6',
                opacity: '1',
              });
            }
            else{
              layer.setStyle({
                color: "#000000",
                weight: '6',
                opacity: '1',
              });
            }
          }
        }).addTo(propertyLayerGroup);
      }
      map.on("layeradd", function (event) {
        propertyLayerGroup.bringToFront();
      });
      return () => {
        propertyLayerGroup.remove();
      };
      
    }, [ propertyData, store.currentMap, map, colors.StrokeColor])

    return null;    
}

export default ChloroplethMap;
