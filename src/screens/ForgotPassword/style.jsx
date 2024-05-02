import { StyleSheet } from "react-native";
import colors from "../../configs/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 36
  },

  lowText: {
    fontSize: 13,
    lineHeight: 16,
    marginTop: 14
  },

  textField: {
    borderWidth: 0.2,
    borderColor: "#fff",
    borderRadius: 8,
    height: 49,
    marginTop: 30
  },

  button: {
    backgroundColor: colors.PRIMARY,
    width: 65,
    height: 49,
    borderRadius: 49,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 24
  },

  buttonText: {
    marginRight: 10, 
    minWidth: 20, 
    textAlign: "center"
  }
})

export default styles;
