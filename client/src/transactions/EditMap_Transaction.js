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
        console.log("we redoing")
        // add if statements to check if the props are equal so that theyre not repeating
        this.setTitle(this.newMapData.title);
        this.setColors(this.newMapData.colors);
        this.setSizes(this.newMapData.sizes);
        this.setOpacities(this.newMapData.opacities);
        this.setAnchors(this.newMapData.anchors);
        this.setTextFont(this.newMapData.textFont);
        this.setHasStroke(this.newMapData.hasStroke);
        this.setHasFill(this.newMapData.hasFill);
        this.setHideLegend(this.newMapData.hideLegend);
        // this.setRange(this.newMapData.range);
        this.setLegendTitle(this.newMapData.legendTitle);
        this.setLegendFields(this.newMapData.legendFields);
    }
    
    undoTransaction() {
        console.log("we are making it to undo, this is old map: ", this.oldMapData)
        this.setTitle(this.oldMapData.title);
        this.setColors(this.oldMapData.colors);
        this.setSizes(this.oldMapData.sizes);
        this.setOpacities(this.oldMapData.opacities);
        this.setAnchors(this.oldMapData.anchors);
        this.setTextFont(this.oldMapData.textFont);
        this.setHasStroke(this.oldMapData.hasStroke);
        this.setHasFill(this.oldMapData.hasFill);
        this.setHideLegend(this.oldMapData.hideLegend);
        // this.setRange(this.oldMapData.range);
        this.setLegendTitle(this.oldMapData.legendTitle);
        this.setLegendFields(this.oldMapData.legendFields);
    }
}