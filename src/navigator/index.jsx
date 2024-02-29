import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GettingStarted from '../screens/GettingStarted';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;
const StackOptions = {
  headerShown: false,
};

const AuthStack = () => {
  return (
    <Navigator initialRouteName='GettingStarted' screenOptions={StackOptions}>
      <Screen name="GettingStarted" component={GettingStarted} />
      <Screen name="Login" component={Login} />
      <Screen name="Registration" component={Registration} />
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Navigation;
