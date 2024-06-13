import { ImageBackground, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import globalStyle from '../../configs/globalStyle';
import React, { useState } from 'react'
import style from './style'
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


  const CELL_COUNT = 6;

const OTPVerification = ({navigation, showAlert, route}) => {
  const [isLoading, setisLoading] = useState(false);
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
  
    const confirmCode = async () =>  {
      Keyboard.dismiss();
      if(value === '' || value.length < 6){
        showAlert("Error", "please write otp code...")
        return;
      }
      setisLoading(true);
      try{
        const payload = {
          email: route?.params?.email,
          otp: value
        }
        const response = await api.verifyOTPCode(payload);
        console.log("response ", response);
        // navigation.navigate("OTPVerification")
        Toast.show({
          type: 'success',
          text1: "Please enter new password",
        });
        navigation.navigate("ForgotPassword", payload)
      }catch(error){
        showAlert("Error", error?.message || error.toString());
      }finally{
        setisLoading(false)
      }
      // navigation.navigate("Login");
    }

  return (
    <ImageBackground source={require("../../assets/images/bg.png")} style={[globalStyle.container, style.container]}>
<Text style={styles.heading}>Verification</Text>
        <Text style={styles.lowText}>Enter the verification code we{"\n"}just sent you on your email address</Text>    
        
        <CodeField
          ref={ref}
          {...propss}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />

        <Button 
            text={"Verify Code"}
            width={"50%"}
            isLoading={isLoading}
            style={{height: 49, paddingVertical: 0, marginTop: 26, justifyContent: "center"}}
            onPress={confirmCode}
        />

        <TouchableOpacity style={{marginTop: 20}}>
          <Text style={styles.resendCode}>Forget the Password?</Text>
        </TouchableOpacity>

    </ImageBackground>
  )
}

export default withAlert(OTPVerification)
