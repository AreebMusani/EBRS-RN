import { StyleSheet } from "react-native";
import colors from "../../configs/colors";
import fontSizes from "../../configs/fontSizes";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        // flexGrow: 1,
        // flex: 1
        padding: 0,    
    },

    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    heading: {
        color: colors.TEXT,
        fontWeight: "bold",
        fontSize: hp(fontSizes.subHeading / 10)
    },

    seeAllText: {
        color: colors.TEXT,
        fontSize: hp(fontSizes.text3 / 10),
    }
})

export default styles;