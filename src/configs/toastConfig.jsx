import { BaseToast } from "react-native-toast-message";
import colors from "./colors";

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={{backgroundColor: colors.PRIMARY, zIndex: 999999}}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
    />
  ),
  error: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'red'}}
      contentContainerStyle={{backgroundColor: colors.PRIMARY, zIndex: 999999}}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
    />
  ),
};

export {toastConfig};
