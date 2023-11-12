import { StyleSheet } from "react-native";

export default StyleSheet.create({

    // START OF FAQ PAGE SPECIFICATIONS
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header_text: {
        color: '#FF76D6',
        fontFamily: 'Nova Square, sans-serif',
        fontSize: '40px',
    },
    column: {
        width: '100%'
    },
    columns: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    accordion: {
        margin: '20px',
        width: '500px'
    },
    title: {
        marginBottom: '20px'
    }
    // END OF FAQ PAGE SPECIFICATIONS
}); 
