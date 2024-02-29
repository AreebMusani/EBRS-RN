import { StyleSheet } from 'react-native';
import colors from '../../configs/colors';
import fontSizes from '../../configs/fontSizes';

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },

  heading: {
    fontWeight: "bold",
    color: colors.TEXT,
    fontSize: fontSizes.heading2,
    marginBottom: 20
  },

  forgetPass: {
    color: colors.PRIMARY,
    fontSize: fontSizes.text3,
    fontWeight: "bold"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  line: {
    borderWidth: 2,
    borderColor: colors.TEXT,
    alignSelf: "center",
    flex: 1,
    marginTop: 2
  }, 

  lineInnerText: {
    color: colors.TEXT,
    fontSize: fontSizes.text3,
    marginHorizontal: 15,
    fontWeight: "bold"
  },

  iconContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    marginVertical: 20
  }, 

  msgText: {
    color: colors.TEXT
  },

  btnText: {
    color: colors.PRIMARY,
    fontWeight: "bold"
  }

})

export default styles;