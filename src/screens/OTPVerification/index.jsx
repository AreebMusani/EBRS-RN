import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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


  const CELL_COUNT = 6;

const OTPVerification = ({navigation}) => {

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
  
    const confirmCode = async () =>  {
      if(value === '' || value.length < 6){
          alert("please write otp code...")
        return;
      }
      navigation.navigate("Login");
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
            style={{height: 49, paddingVertical: 0, marginTop: 26, justifyContent: "center"}}
            onPress={confirmCode}
        />

        <TouchableOpacity style={{marginTop: 20}}>
          <Text style={styles.resendCode}>Forget the Password?</Text>
        </TouchableOpacity>

    </ImageBackground>
  )
}

export default OTPVerification
