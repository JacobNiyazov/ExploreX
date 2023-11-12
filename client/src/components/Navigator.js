import React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from './store';
import LoginScreen from './ScreenContainers/LoginScreen.js';
import EditScreen from './ScreenContainers/EditMapScreen.js';

export default function Navigator() {
    const { store } = useContext(GlobalStoreContext);
    console.log(store)

    switch (store.currentPage) {
        case "LOGIN":
            return (<LoginScreen />)
        case "EDIT_MAP":
            return (<EditScreen />)
        default:
            return (<LoginScreen />)
    }
}