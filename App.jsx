import React, { useEffect } from 'react';
import { SafeAreaView, Text, View , LogBox} from 'react-native';
import { Provider } from 'react-redux';

import Navigation from './src/navigator/index';
import { store } from './src/redux/store/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import colors from './src/configs/colors';

const containerStyle = { flexGrow: 1 };

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={{backgroundColor: colors.PRIMARY}}
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
      contentContainerStyle={{backgroundColor: colors.PRIMARY}}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
      }}
    />
  ),
};

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={containerStyle}>
      <Provider store={store}>
        <Navigation />
        <Toast config={toastConfig} />
      </Provider>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
