import {StyleSheet} from 'react-native'
import colors from '../../configs/colors';
import fontSizes from '../../configs/fontSizes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#322251",
    // marginHorizontal: -20,
    // marginTop: -20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp('5%'),
    paddingHorizontal: 20,
    gap: 5,
    elevation: 10,
  },

  rightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  name: {
    color: colors.TEXT,
    fontWeight: "bold",
    fontSize: hp(fontSizes.heading3 / 10)
  },

  userIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    overflow: "hidden"
  }
})

export default styles;
