import React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from './store';
import LoginScreen from './ScreenContainers/LoginScreen.js';

export default function Navigator() {
    const { store } = useContext(GlobalStoreContext);
    console.log(store)

    switch (store.currentPage) {
        case "Login":
            return (<LoginScreen />)
        default:
            return (<LoginScreen />)
    }
}