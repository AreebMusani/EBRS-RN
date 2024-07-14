import { StyleSheet, Dimensions } from "react-native";
import colors from "../../configs/colors";
import fontSizes from "../../configs/fontSizes";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        height: hp('40%'),//height * 0.4,
        borderBottomLeftRadius: hp('10%'),
        borderBottomRightRadius: hp('10%'),
        width: wp('40%'),
        resizeMode: "contain"
    },

    timer: {
        color: "#777",
        fontSize: hp('2.5%')//fontSizes.subHeading,
    },

    itemName: {
        color: colors.TEXT,
        fontSize: hp('3%'),//fontSizes.heading3,
        fontWeight: "bold",
        flexShrink: 1,
        textAlign: "center",
        marginLeft: 30
    },


    controllerContainer: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: hp('6%')//height * 0.1
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
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('2%'),
        borderRadius: wp('3%'),
        marginHorizontal: wp('3%'),
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
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: 10
    },

    bottomContentContainer: {
        // backgroundColor: "#0000002E"
        flex: 1,
        gap: hp('2%')
    }
})

export default styles;
