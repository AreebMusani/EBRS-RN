import { StyleSheet } from "react-native";
import colors from "../../configs/colors";
import fontSizes from "../../configs/fontSizes";

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
        fontSize: fontSizes.subHeading
    },

    seeAllText: {
        color: colors.TEXT,
        fontSize: fontSizes.text3,
    }
})

export default styles;