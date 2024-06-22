import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GettingStarted from '../screens/GettingStarted';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Home from '../screens/Home';
import Search from '../screens/Search';
import SongPlayer from '../screens/SongPlayer';
import MainStack from './MainStack';
import ForgotPassword from '../screens/ForgotPassword';
import OTPVerification from '../screens/OTPVerification';
import { useSelector } from 'react-redux';
import Splash from '../screens/Splash';
import UserProfile from '../screens/UserProfile';
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Stack = createNativeStackNavigator();
const {Navigator, Screen} = Stack;
const StackOptions = {
  headerShown: false,
};

const AuthStack = () => {
  return (
    <Navigator screenOptions={StackOptions}>
      <Screen name="GettingStarted" component={GettingStarted} />
      <Screen name="Login" component={Login} />
      <Screen name="Registration" component={Registration} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
      <Screen name="OTPVerification" component={OTPVerification} />
      
      {/* <Screen name="Home" component={Home} />
      <Screen name="Search" component={Search} /> */}
      <Screen name="SongPlayer" component={SongPlayer} />
      {/* <Screen name='BottomNav' component={MainStack} /> */}
    </Navigator>
  );
};

const HomeStack = () => {
  return (
    <Navigator screenOptions={StackOptions}>
      <Screen name='BottomNav' component={MainStack} />
      <Screen name="SongPlayer" component={SongPlayer} />
      <Screen name='UserProfile' component={UserProfile} />
    </Navigator>
  );
};


const Navigation = () => {
  const state = useSelector(state => state);
  const [Isloading, setIsloading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
  GoogleSignin.configure({
    webClientId: "729587116660-dkqqgtdq6corikljp43lmlrvvbip36tm.apps.googleusercontent.com"
  });
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [state?.user?.token])

  const checkAuthStatus = () => {
    console.log("checkAuthStatus", state.user.user);
    try{
      if(state.user.user){
        setIsAuthenticated(true)
      }else{
        setIsAuthenticated(false)
      }
    }catch(error){
      console.warn("Error while checking Auth Status: ", error);
    }finally{
      setTimeout(() => {
        setIsloading(false);
      }, 3000);
    }
  }

  if(Isloading){
    return <Splash />
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <HomeStack /> : <AuthStack />}
      {/* <AuthStack />
      <HomeStack /> */}
    </NavigationContainer>
  );
};

export default Navigation;
