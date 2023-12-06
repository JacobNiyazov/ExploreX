import { jsTPS_Transaction } from "./jsTPS";

export default class EditMap_Transaction extends jsTPS_Transaction{
    constructor(initStore, initOldMapData, initNewMapData) {
        super();
        this.store = initStore;
        this.oldMapData = initOldMapData;
        this.newMapData = initNewMapData;
    }
    // need to add a edit map transaction every time a onChange or smth
    // is triggered in edit side panel
    doTransaction() {
        this.store.updateMap(this.index, this.newMapData);
    }
    
    undoTransaction() {
        this.store.updateMap(this.index, this.oldMapData);
    }
}