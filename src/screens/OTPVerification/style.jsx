import {StyleSheet} from 'react-native';
import colors from '../../configs/colors';
import fontSizes from '../../configs/fontSizes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 36,
  },

  lowText: {
    fontSize: 13,
    lineHeight: 16,
    marginTop: 14,
    textAlign: 'center',
  },

  resendCode: {
    color: colors.PRIMARY,
    fontSize: fontSizes.text3,
    fontWeight: 'bold',
  },

   //OTP FIELDS
   codeFieldRoot: {
    marginTop: 40
  },

  cell: {
    width: wp(12),
    height: wp(12),
    lineHeight: wp(12),
    fontSize: 24,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginHorizontal: 3,
    borderRadius: 5,
    color: '#000',
    fontWeight: "bold"
  },

  focusCell: {
    borderColor: '#000',
    color: '#000'
  },
});

export default styles;
