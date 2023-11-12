import React from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from './store';
import LoginScreen from './ScreenContainers/LoginScreen.js';
import RegisterScreen from './ScreenContainers/RegisterScreen.js';
import ForgotPasswordScreen from './ScreenContainers/ForgotPasswordScreen.js';
import FAQScreen from './ScreenContainers/FAQScreen.js';


export default function Navigator() {
    const { store } = useContext(GlobalStoreContext);
    console.log(store)

    switch (store.currentPage) {
        case "Login":
            return (<LoginScreen />)
        case "Forgot":
            return (<ForgotPasswordScreen/>)
        case "Register":
            return (<RegisterScreen/>)
        case "FAQScreen":
            return (<FAQScreen/>)
        default:
            return (<LoginScreen />)
    }
}