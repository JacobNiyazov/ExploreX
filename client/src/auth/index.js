import React, { createContext, useState, useEffect, useRef } from "react";
// import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

export const AuthContext = createContext();

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    RECOVER_PASSWORD: "RECOVER_PASSWORD",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    GUEST_LOGIN: "GUEST_LOGIN"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: undefined,
        isGuest: false,
    });
    // const history = useHistory();

    const authRef = useRef(auth);

    useEffect(() => {
        authRef.current.getLoggedIn();
    }, [authRef]);

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
            case AuthActionType.RECOVER_PASSWORD: {
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
                    user: payload.user,
                    loggedIn: true,
                    isGuest: false,
                })
            }
            case AuthActionType.SET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    isGuest: false,
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
        try {
            if (!auth.isGuest) {
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
        } catch (error) {
            console.error("An error occurred while checking logged-in status:", error);
        }
    }
    auth.guestLogin = async function (){
        authReducer({
            type: AuthActionType.GUEST_LOGIN,

        });
    }
    auth.registerUser = async function( email, username, password, passwordVerify) {
        try {
            const response = await api.registerUser(email, username, password, passwordVerify);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                });
            }
        } catch (error) {
            throw(error)
        }
        
    }

    auth.loginUser = async function(username, password) {
        try {
            const response = await api.loginUser(username, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                });
                localStorage.setItem('authToken', response.data.token);
                // history.push("/");
            }
        } catch (error) {
            throw(error)
        }

        
    }

    auth.logoutUser = async function() {
        try {
            const response = await api.logoutUser();
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                });
                // history.push("/");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }

    }

    auth.recoverPassword = async function(email) {
        try {
            const response = await api.recoverPassword(email);
            if (response.status === 200) {
                authReducer( {
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })
            }
        } catch (error) {
            throw(error)
        }


    }

    auth.resetUserPassword = async function(userId, token, password) {
        try {
            const response = await api.resetUserPassword(userId, token, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGOUT_USER,
                    payload: null
                })
            }
        } catch (error) {
            throw(error)
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        //console.log("user initials: " + initials);
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