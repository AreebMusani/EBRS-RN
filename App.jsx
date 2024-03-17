import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import Navigation from './src/navigator/index';
import { store } from './src/redux/store/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const containerStyle = { flexGrow: 1 };

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={containerStyle}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
