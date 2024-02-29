import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import Navigation from './src/navigator/index';
import { store } from './src/redux/store/index';

const containerStyle = { flexGrow: 1 };

const App = () => {
  return (
    <SafeAreaView style={containerStyle}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
