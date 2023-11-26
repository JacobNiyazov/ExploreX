import { useContext, useEffect } from "react";
import { useMap} from "react-leaflet";
import L from "leaflet";
import GlobalStoreContext from '../store/index.js';

const ChloroplethMap = () => {

    const { store } = useContext(GlobalStoreContext);
    const map = useMap();

    useEffect(() => {
        console.log("ASD")
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
                console.log(result)
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

        const getColor = (d, colorRanges) => {
            // console.log("COLOR RANGES HJERE", colorRanges[0])
            return  d > colorRanges[6] ? '#800026' :
                    d > colorRanges[5]  ? '#BD0026' :
                    d > colorRanges[4]  ? '#E31A1C' :
                    d > colorRanges[3]  ? '#FC4E2A' :
                    d > colorRanges[2]   ? '#FD8D3C' :
                    d > colorRanges[1]   ? '#FEB24C' :
                    d > colorRanges[0]   ? '#FED976' :
                                '#FFEDA0';
        }
        const chloroLayerGroup = L.featureGroup().addTo(map);


        const updateLayers = (geojsonData) => {
            // Clear existing layers
            chloroLayerGroup.clearLayers();
            let currentNum = 0;
            let chloroData = [];
            geojsonData.features.forEach(feature => {
                if(typeof(feature.properties[store.currentMap.graphics.typeSpecific.property]) === 'string'){
                    currentNum = convertStringToNumber(feature.properties[store.currentMap.graphics.typeSpecific.property]);
                }
                else{
                    currentNum = feature.properties[store.currentMap.graphics.typeSpecific.property];
                }
                chloroData.push(currentNum)
            })

            let coloring = generateColorRanges(chloroData) 
            console.log(coloring)
            
            L.geoJSON(geojsonData, {
                style: (feature) => {
                    let propertyValue;
                    if(typeof(feature.properties[store.currentMap.graphics.typeSpecific.property]) === 'string'){
                        propertyValue = convertStringToNumber(feature.properties[store.currentMap.graphics.typeSpecific.property]);
                    }
                    else{
                        propertyValue = feature.properties[store.currentMap.graphics.typeSpecific.property];
                    }
                    const fillColor = getColor(propertyValue, coloring);
                  
                    return {
                      fillColor,
                      weight: 2,
                      opacity: 1,
                      color: 'white',
                      fillOpacity: 0.7,
                    };
                },
              }).addTo(chloroLayerGroup);

            try{
                map.fitBounds(chloroLayerGroup.getBounds());
            }
            catch (err){
                console.log(err)
            }
        }
        var geojsonData = store.currentMap.graphics.geojson;
        console.log(geojsonData)

        updateLayers(geojsonData)
        
        return () => {
            chloroLayerGroup.remove();
          };
    }, [map, store.currentMap.graphics.geojson, store.currentMap.graphics.typeSpecific.property]);

    return null;    
}

export default ChloroplethMap;
