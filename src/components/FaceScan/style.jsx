import { StyleSheet, Dimensions } from "react-native"
import colors from "../../configs/colors";
import fontSizes from "../../configs/fontSizes";

const {height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: "center"
    },

    arrowBack: {
        position: "absolute",
        left: 20,
        top: "5%",
        zIndex: 20
    },

    cameraFrame: {
        width: "100%",
        height: height * 0.5,
        backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        marginBottom: 20,
        overflow: "hidden"
    },

    FaceScan: {
        width: "100%",
        height: height * 0.5,
    },

    msgText: {
        color: colors.TEXT,
        fontWeight: "bold",
        fontSize: fontSizes.subHeading
    },

    wave: {
        marginVertical: 20
    },

    btnText: {
        color: colors.TEXT,
        fontSize: fontSizes.text3
    }
})

export default styles;
