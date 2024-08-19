import { StyleSheet } from "react-native";
import colors from "../../configs/colors";
import fontSizes from "../../configs/fontSizes";

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 250,
        borderRadius: 20,
        backgroundColor: "grey",
        overflow: "hidden"
    },

    img: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch"
    },

    details: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255,255,255, 0.4)",
        width: "100%",
        padding: 10,
    },

    head1: {
        color: colors.TEXT,
        fontSize: fontSizes.text2,
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
    },

    head2: {
        color: colors.TEXT,
        fontSize: fontSizes.text1,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
    }
})

export default styles
