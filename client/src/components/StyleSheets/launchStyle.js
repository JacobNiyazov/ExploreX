import { StyleSheet } from "react-native";

export default StyleSheet.create({

    // START OF LOGIN PAGE SPECIFICATIONS
    header_text: {
        color: '#FF76D6',
        fontFamily: 'Nova Square, sans-serif',
        fontSize: '50px',
    },
    rounded_input: {
        borderRadius: '10px',
        border: 'none',
        padding: '15px',
        outline: 'none',
        backgroundColor: '#f0f0f0', 
        height: "30%",
        width: '100%',
    },
    container: {
        display: 'flex',
        height: '82vh', 
    },
    password_container: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
        marginTop: 10,
        marginBottom: 0,
    },
    password:{
        paddingTop: '10px',
        color: '#FF76D6',
        flex: 1,
        textAlign: 'left'
    },
    confirmPassword:{
        paddingTop: '7px',
        color: '#FF76D6',
        flex: 1,
        textAlign: 'left'
    },
    forgot: {
        color: 'white',
        flex: 1,
        textAlign: 'right'  
    },
    leftSide: {
        flex: 1, 
        padding: '20px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#404040', 
        width: '100%'

    },
    rightSide: {
        flex: 1.75, 
        padding: '20px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', 
    },
    image: {
        maxWidth: '100%',
        height: '100%', 
    },
    button_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#FF76D6',
        borderRadius: 25,
        width: 175,
        height: 50,
        marginTop: 10,
        
    },
    button_text: {
        color: 'white',
        fontSize: '20px',
        paddingTop: '20px',
    },

    // END OF LOGIN PAGE SPECIFICATIONS

    // START OF REGISTER PAGE SPECIFICATIONS


    // END OF REGISTER PAGE SPECIFICATIONS

    // START OF FORGOT PASSWORD SPECIFICATIONS

    sub_header_text: {
        color: '#FF76D6',
        fontFamily: 'Nova Square, sans-serif',
        fontSize: '25px',
    },

    // END OF FORGOT PASSWORD SPECIFICATIONS
});
