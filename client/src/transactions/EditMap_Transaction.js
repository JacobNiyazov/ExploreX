import { jsTPS_Transaction } from "./jsTPS";

export default class EditMap_Transaction extends jsTPS_Transaction{
    constructor(oldMapData, 
        newMapData,
         setTitle, 
         setLegendTitle, 
         setLegendFields, 
         setColors, 
         setSizes, 
         setOpacities, 
         setAnchors, 
         setTextFont, 
         setHasStroke,
         setHasFill, 
         setHideLegend) {
        super();
        this.oldMapData = oldMapData;
        this.newMapData = newMapData;
        this.setTitle = setTitle;
        this.setLegendTitle = setLegendTitle;
        this.setLegendFields = setLegendFields;
        this.setColors = setColors;
        this.setSizes = setSizes;
        this.setOpacities = setOpacities;
        this.setAnchors = setAnchors;
        this.setTextFont = setTextFont;
        this.setHasFill = setHasFill;
        this.setHasStroke = setHasStroke;
        this.setHideLegend = setHideLegend;
    }
    // need to add a edit map transaction every time a onChange or smth
    // is triggered in edit side panel
    doTransaction() {
        // add if statements to check if the props are equal so that theyre not repeating
        this.setTitle(prevTitle =>{
            if(prevTitle === this.newMapData.title){
                return prevTitle
            }
            return {...prevTitle, ...this.newMapData.title}
        })
        this.setColors(prevColors=>{
            if(prevColors.TextColor !==this.newMapData.colors.TextColor){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.FillColor !== this.newMapData.colors.FillColor){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.StrokeColor !== this.newMapData.StrokeColor){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.DopMap !== this.newMapData.DotMap){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.SpikeMap !== this.newMapData.SpikeMap){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.lowGradient !== this.newMapData.lowGradient){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.mediumGradient !== this.newMapData.mediumGradient){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.highGradient !== this.newMapData.highGradient){
                return {...prevColors, ...this.newMapData.colors}
            }
            if(prevColors.voronoiColor !== this.newMapData.voronoiColor){
                return {...prevColors, ...this.newMapData.colors}
            }
            return prevColors
        })
        this.setSizes(prevSizes =>{
            if(prevSizes.TextSize !== this.newMapData.sizes.TextSize){
                return {...prevSizes, ...this.newMapData.sizes}
            }
            if(prevSizes.StrokeWeight !== this.newMapData.StrokeWeight){
                return {...prevSizes, ...this.newMapData.sizes}
            }
            return prevSizes
        })
        this.setOpacities(prevOpacities=>{
            if(prevOpacities.StrokeOpacity !== this.newMapData.StrokeOpacity){
                return {...prevOpacities, ...this.newMapData.opacities}
            }
            if(prevOpacities.FillOpacity !== this.newMapData.FillOpacity){
                return {...prevOpacities, ...this.newMapData.opacities}
            }
             if(prevOpacities.StrokeOpacity !== this.newMapData.StrokeOpacity){
                return {...prevOpacities, ...this.newMapData.opacities}
            }
            return prevOpacities
        })
        this.setTextFont(prevFont =>{
            if(prevFont !== this.newMapData.textFont){
                return {...prevFont, ...this.newMapData.textFont}
            }
            return prevFont
        })
        this.setHasStroke(prevStroke=>{
            if(prevStroke !== this.newMapData.hasStroke){
                return {...prevStroke, ...this.newMapData.hasStroke}
            }
            return prevStroke
        })
        this.setHasFill(prevFill=>{
            if(prevFill !== this.newMapData.hasFill){
                return {...prevFill, ...this.newMapData.hasFill}
            }
            return prevFill
        })
        this.setHideLegend(prevLegend=>{
            if(prevLegend !== this.newMapData.hideLegend){
                return {...prevLegend, ...this.newMapData.hideLegend}
            }
            return prevLegend
        })
        /*this.setLegendTitle(prevLegendTitle=>{
            if(prevLegendTitle !== this.newMapData.legendTitle){
                return {...prevLegendTitle, ...this.newMapData.legendTitle}
            }
            return prevLegendTitle
        })
        this.setLegendFields(prevLegendFields=>{
            if(prevLegendFields !== this.newMapData.legendFields){
                return {...prevLegendFields, ...this.newMapData.legendFields}
            }
            return prevLegendFields
        })*/
    }
    
    undoTransaction() {
        this.setTitle(prevTitle =>{
            if(prevTitle === this.oldMapData.title){
                return prevTitle
            }
            return {...prevTitle, ...this.oldMapData.title}
        })
        this.setColors(prevColors=>{
            if(prevColors.TextColor !==this.oldMapData.colors.TextColor){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.FillColor !== this.oldMapData.colors.FillColor){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.StrokeColor !== this.oldMapData.StrokeColor){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.DopMap !== this.oldMapData.DotMap){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.SpikeMap !== this.oldMapData.SpikeMap){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.lowGradient !== this.oldMapData.lowGradient){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.mediumGradient !== this.oldMapData.mediumGradient){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.highGradient !== this.oldMapData.highGradient){
                return {...prevColors, ...this.oldMapData.colors}
            }
            if(prevColors.voronoiColor !== this.oldMapData.voronoiColor){
                return {...prevColors, ...this.oldMapData.colors}
            }
            return prevColors
        })
        this.setSizes(prevSizes =>{
            if(prevSizes.TextSize !== this.oldMapData.sizes.TextSize){
                return {...prevSizes, ...this.oldMapData.sizes}
            }
            if(prevSizes.StrokeWeight !== this.oldMapData.StrokeWeight){
                return {...prevSizes, ...this.oldMapData.sizes}
            }
            return prevSizes
        })
        this.setOpacities(prevOpacities=>{
            if(prevOpacities.StrokeOpacity !== this.oldMapData.StrokeOpacity){
                return {...prevOpacities, ...this.oldMapData.opacities}
            }
            if(prevOpacities.FillOpacity !== this.oldMapData.FillOpacity){
                return {...prevOpacities, ...this.oldMapData.opacities}
            }
             if(prevOpacities.StrokeOpacity !== this.oldMapData.StrokeOpacity){
                return {...prevOpacities, ...this.oldMapData.opacities}
            }
            return prevOpacities
        })
        this.setTextFont(prevFont =>{
            if(prevFont !== this.oldMapData.textFont){
                return {...prevFont, ...this.oldMapData.textFont}
            }
            return prevFont
        })
        this.setHasStroke(prevStroke=>{
            if(prevStroke !== this.oldMapData.hasStroke){
                return {...prevStroke, ...this.oldMapData.hasStroke}
            }
            return prevStroke
        })
        this.setHasFill(prevFill=>{
            if(prevFill !== this.oldMapData.hasFill){
                return {...prevFill, ...this.oldMapData.hasFill}
            }
            return prevFill
        })
        this.setHideLegend(prevLegend=>{
            if(prevLegend !== this.oldMapData.hideLegend){
                return {...prevLegend, ...this.oldMapData.hideLegend}
            }
            return prevLegend
        })
        /*this.setLegendTitle(prevLegendTitle=>{
            if(prevLegendTitle !== this.oldMapData.legendTitle){
                return {...prevLegendTitle, ...this.oldMapData.legendTitle}
            }
            return prevLegendTitle
        })
        this.setLegendFields(prevLegendFields=>{
            if(prevLegendFields !== this.oldMapData.legendFields){
                return {...prevLegendFields, ...this.oldMapData.legendFields}
            }
            return prevLegendFields
        })*/
    }
}