import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../configs/colors';
import fontSizes from '../../configs/fontSizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerTopContainer:{ 
    flexDirection: "row",
    justifyContent: "space-between",
    height: "auto"
  },

  header: {
    backgroundColor: '#322251',
    position: "relative",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // overflow: 'hidden',
    paddingVertical: hp('5%'),
    paddingHorizontal: 20,
    height: 'auto',
  },

  headerMainContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: wp('5'),
    elevation: 10,
  },

  menu: {
    position: 'absolute',
    right: 0,
    top: 40, // Adjust as needed
    borderRadius: 10,
    // padding: 10,
    zIndex: 1000,
    width: 150,
    height: "auto",
    backgroundColor: "rgba(255,255,255,1)",
    elevation: 5
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  menuItemText: {
    color: "#000"

  },

  songToggle: {
    position: "absolute",
    bottom: -20,
    right: 20,
    backgroundColor: colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    width: wp("14"),
    height: wp("14"),
    borderRadius: wp("14") / 2,
    elevation: 5
},

  profileImage: {
    width: wp('30'),
    height: wp('30'),
    borderRadius: wp('30') / 2,
    resizeMode: 'contain',
  },

  rightSideHeader: {
    flexGrow: 1,
    flexShrink: 1,
  },

  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 30,
    overflow: 'hidden',
  },

  lightText: {
    fontSize: 12,
    lineHeight: 14,
  },

  heading: {
    color: colors.TEXT,
    fontWeight: 'bold',
    fontSize: hp(fontSizes.heading3 / 10),
    marginBottom: hp('2'),
  },
});

export default styles;
