import React, { createContext, useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    GUEST_LOGIN: "GUEST_LOGIN"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        isLoggedIn: false,
        isGuest: null,
    });
    // const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    isGuest: null,
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    isGuest: null,
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    isGuest: null,
                })
            }
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    isGuest: null,
                })
            }
            case AuthActionType.GUEST_LOGIN:{
                return setAuth({
                    user: null,
                    loggedIn: true,
                    isGuest: true,
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        if(!auth.isGuest){
            const response = await api.getLoggedIn();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.SET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user
                    }
                });
            }
        }

    }
    auth.guestLogin = async function (){
        authReducer({
            type: AuthActionType.GUEST_LOGIN,

        });
    }
    auth.registerUser = async function( email, username, password, passwordVerify) {
        console.log("create user:" + email + " " + username + " " + " " + password + " " + passwordVerify);
        const response = await api.registerUser(email, username, password, passwordVerify);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER
            })

            // history.push("/login");
        }
    }

    auth.loginUser = async function(username, password) {
        const response = await api.loginUser(username, password);
        if (response.status === 200) {
            console.log(response.data.user)
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            // history.push("/");
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            // history.push("/");
        }
    }

    auth.recoverPassword = async function(email) {
        const response = await api.recoverPassword(email);
        //TODO Don't worry about these for now.
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            // history.push("/");
        }

    }

    auth.resetUserPassword = async function(userId, token, password) {
        const response = await api.resetUserPassword(userId, token, password);
        //TODO Don't worry about these for now.
        if (response.status === 200) {
            console.log("SUCCESS")
            // authReducer( {
            //     type: AuthActionType.LOGOUT_USER,
            //     payload: null
            // })
            // history.push("/");
        }

    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };