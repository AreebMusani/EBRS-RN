import {StyleSheet} from 'react-native';
import colors from '../../configs/colors';
import fontSizes from '../../configs/fontSizes';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },

  headImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: hp(5)
  },


  headContainer: {
    textAlign: 'center',
    marginVertical: "10%"
  },

  head: {
    color: colors.TEXT,
    textAlign: 'center',
    fontSize: fontSizes.heading,
    fontWeight: "bold",
    fontFamily: 'Century Gothic'
  },

  lowText: {
    color: colors.TEXT,
    textAlign: 'center',
    fontSize: fontSizes.text3
  },

  footer: {
    marginTop: "auto",
    alignItems: "center",
    color: colors.TEXT,
  },

  footerText: {
    fontWeight: "bold",
    fontSize: fontSizes.text3,
    color: colors.TEXT,
  }

});

export default style;
