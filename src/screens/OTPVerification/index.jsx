import {
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyle from '../../configs/globalStyle';
import React, {useEffect, useState} from 'react';
import style from './style';
import styles from './style';
import Button from '../../components/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import withAlert from '../../components/AlertBox/withAlert';
import api from '../../api/api';
import Toast from 'react-native-toast-message';
import { setUser } from '../../redux/slices/user';
import { useDispatch } from 'react-redux';

const CELL_COUNT = 6;

const OTPVerification = ({navigation, showAlert, route}) => {
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const {email, password} = route?.params || {};

  useEffect(() => {
    console.log(route?.params);
  })

  const confirmCode = async () => {
    Keyboard.dismiss();
    if (value === '' || value.length < 6) {
      showAlert('Error', 'please write otp code...');
      return;
    }
    setisLoading(true);
    try {
      if(route?.params?.purpose === "verifyEmail"){
        await verifyAndCreateUser();
      }else{
        await forgotPassword();
      }
    } catch (error) {
      showAlert('Error', error?.message || error.toString());
    } finally {
      setisLoading(false);
    }
    // navigation.navigate("Login");
  };

  const forgotPassword = async () => {
    const payload = {
      email: route?.params?.email,
      otp: value,
    };
    const response = await api.verifyOTPCode(payload);
    console.log('response ', response);
    // navigation.navigate("OTPVerification")
    Toast.show({
      type: 'success',
      text1: 'Please enter new password',
    });
    navigation.navigate('ForgotPassword', payload);
  }

  const verifyAndCreateUser = async () => {
    const payload = {
      username: route?.params?.username,
      email: route?.params?.email,
      password: route?.params?.password,
      otp: value,
      loginType: "normal"
    }
    const response = await api.signup(payload);
      console.log("response ", response);
      dispatch(setUser({token: response?.token, user: response?.user}));
      Toast.show({
        type: 'success',
        text1: "Registered Successfully...",
      });
      navigation.navigate("BottomNav");
  }

  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={[globalStyle.container, style.container]}>
      <Text style={styles.heading}>Verification</Text>
      <Text style={styles.lowText}>
        Enter the verification code we{'\n'}just sent you on your email address
      </Text>

      <CodeField
        ref={ref}
        {...propss}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

      <Button
        text={'Verify Code'}
        width={'50%'}
        isLoading={isLoading}
        style={{
          height: 49,
          paddingVertical: 0,
          marginTop: 26,
          justifyContent: 'center',
        }}
        onPress={confirmCode}
      />

      {/* <TouchableOpacity style={{marginTop: 20}}>
          <Text style={styles.resendCode}>Forget the Password?</Text>
        </TouchableOpacity> */}
    </ImageBackground>
  );
};

export default withAlert(OTPVerification);
