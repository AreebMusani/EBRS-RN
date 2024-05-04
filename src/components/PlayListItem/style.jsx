import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import colors from "../../configs/colors";
import fontSizes from "../../configs/fontSizes";

const styles = StyleSheet.create({
  
    playlistItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#000",
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        borderRadius: wp('3%'),
        // marginHorizontal: wp('3%'),
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // borderRadius: 10,
        gap: 10,
        // marginHorizontal: 20
    },

    playlistItemHead: {
        color: colors.TEXT,
        fontWeight: "bold",
        fontSize: fontSizes.text3,
    },

    playlistItemSubHead: {
        color: colors.TEXT,
        fontSize: fontSizes.text3
    },

    playlistItemImg: {
        width: wp("12"),
        height: wp("12"),
        borderRadius: 10
    },
})

export default styles;
