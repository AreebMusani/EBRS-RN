import { StyleSheet, Dimensions } from "react-native";
import colors from "../../configs/colors";
import fontSizes from "../../configs/fontSizes";

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        padding: 0
    },

    topContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        width: "100%",
        justifyContent: "space-between",
    },

    wallpaper: {
        height: height * 0.4,
        borderBottomLeftRadius: height * 0.1,
        borderBottomRightRadius: height * 0.1,
        width: width * 0.4,
        resizeMode: "cover"
    },

    timer: {
        color: "#777",
        fontSize: fontSizes.subHeading,
    },

    itemName: {
        color: colors.TEXT,
        fontSize: fontSizes.heading3,
        fontWeight: "bold"
    },


    controllerContainer: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: height * 0.1
    },

    songToggle: {
        backgroundColor: colors.PRIMARY,
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: (width * 0.14) / 2,
        elevation: 5
    },

    playlistItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#000",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 10,
        marginHorizontal: 20
    },

    playlistItemHead: {
        color: colors.TEXT,
        fontWeight: "bold",
        fontSize: fontSizes.text2,
    },

    playlistItemSubHead: {
        color: colors.TEXT,
        fontSize: fontSizes.text3
    },

    playlistItemImg: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: 10
    }
})

export default styles;
