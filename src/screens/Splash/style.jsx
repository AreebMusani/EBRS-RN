import colors from "../../configs/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const { StyleSheet } = require("react-native");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoText: {
        textAlign: 'center',
        fontSize: 30,
        color: '#fff',
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        marginTop: 20
    },

    logoImg: {
        width: wp("50"), 
        height: wp("50"),
        resizeMode: 'contain'
    }
})

export default styles;