import React, { useEffect } from 'react';
import { SafeAreaView, Text, View , LogBox} from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigator/index';
import { store } from './src/redux/store/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import colors from './src/configs/colors';
import TrackPlayer, {
  Event,
  State,
  usePlaybackState,
  usePlayWhenReady,
} from 'react-native-track-player';
import {setupPlayer, useLogTrackPlayerState} from './src/components/trackPlayer/TrackPlayerService';
import { toastConfig } from './src/configs/toastConfig';

const containerStyle = { flexGrow: 1 };

const App = () => {
  LogBox.ignoreAllLogs();
  useLogTrackPlayerState()

  useEffect(() => {
    setupPlayer();
  }, []);

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
