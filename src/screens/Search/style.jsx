import { StyleSheet, Dimensions } from "react-native";
import fontSizes from "../../configs/fontSizes";
import colors from "../../configs/colors";

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
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
    },

    itemContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.PRIMARY,
        padding: 10,
        paddingRight: 0,
        borderRadius: 10,
        width: width * 0.43,
    },

    roundImg: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: (width * 0.2) / 2,
    },

    itemHead: {
        color: colors.TEXT,
        fontSize: fontSizes.subHeading,
        fontWeight: "bold",
        overflow: "hidden",
        flexShrink: 1,
        flexGrow: 1,
    }
})

export default styles;
