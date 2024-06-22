import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Keyboard } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import globalStyle from '../../configs/globalStyle';
import React, { useState } from 'react'
import styles from './style'
import InputField from '../../components/InputField';
import BackButton from '../../components/BackButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailValidation, NewPasswordValidation } from '../../configs/validation.constants';
import Button from '../../components/Button';
import api from '../../api/api';
import withAlert from '../../components/AlertBox/withAlert';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation, showAlert, route}) => {
  const [IsLoading, setisLoading] = useState(false);
  const {email, otp}  = route?.params || {};

  const { 
    register, 
    handleSubmit,
    getValues, 
    setValue,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(otp ? NewPasswordValidation : emailValidation)
  });

  const onSubmit = async (data) => {
    console.warn("data ", data);
    Keyboard.dismiss();
    // () => navigation.navigate("OTPVerification")
    setisLoading(true)
    try{
      const payload = {
        email: data.email
      }
      const response = await api.sendOTPCode(payload);
      console.log("response ", response);
      navigation.navigate("OTPVerification", {email: data.email})
      Toast.show({
        type: 'success',
        text1: "OTP code has sent to your email...",
      });
    }catch(error){
      showAlert("Error", error?.message || error.toString());
    }finally{
      setisLoading(false)
    }
  }

  const onForgotPassword = async (data) => {
    console.warn("data ", data);
    Keyboard.dismiss();
    setisLoading(true)
    try{
      const payload = {
        email: email,
        newPassword: data?.password 
      }
      const response = await api.resetPassword(payload);
      console.log("response ", response);
      Toast.show({
        type: 'success',
        text1: "Your password changed Successfully...",
      });
      navigation.replace("Login")
    }catch(error){
      showAlert("Error", error?.message || error.toString());
    }finally{
      setisLoading(false)
    }
  } 

  return (
    <ImageBackground
        source={require("../../assets/images/bg.png")}
        style={[globalStyle.container, styles.container]}
    >
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.lowText}>
          {otp ? "Enter your new password" : "Enter the email address associated with your account"}
        </Text>

        {otp ?
          <>

          <InputField 
            iconName={'lock'} 
            placeholder={'New Password'} 
            isPassword 
            name="password"
            register={register}
            onChange={(text) => {setValue("password", text)}}
            error={errors.password}
            containerStyle={{marginTop: 30}}
          />

          <InputField 
            iconName={'lock'} 
            placeholder={'Confirm New Password'} 
            isPassword 
            name="cPassword"
            register={register}
            onChange={(text) => {setValue("cPassword", text)}}
            error={errors.cPassword}
          />
          </> :
          <InputField
          placeholder={'Email'}
          iconName={'envelope-o'}
          keyboardType={'email-address'}
          name="email"
          register={register}
          onChange={(text) => {setValue("email", text)}}
          error={errors.email}
          isEditable={!otp}
          containerStyle={styles.textField}
      />}

          {/* <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
              <FontAwesome style={styles.buttonIcon} name={"long-arrow-right"} size={30} color={"#fff"} />
          </TouchableOpacity> */}

          {otp ? <Button text={'Update Password'} style={{marginTop: 24}} isLoading={IsLoading} onPress={handleSubmit(onForgotPassword)} /> : 
          <Button onPress={handleSubmit(onSubmit)} style={styles.button} isLoading={IsLoading}>
            <FontAwesome style={styles.buttonIcon} name={"long-arrow-right"} size={25} color={"#fff"} />
          </Button>}

          <BackButton navigation={navigation} />
    </ImageBackground>
  )
}

export default withAlert(ForgotPassword);