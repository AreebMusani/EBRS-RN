import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import globalStyle from '../../configs/globalStyle';
import React from 'react'
import styles from './style'
import InputField from '../../components/InputField';
import BackButton from '../../components/BackButton';

const ForgotPassword = ({navigation}) => {
  return (
    <ImageBackground
        source={require("../../assets/images/bg.png")}
        style={[globalStyle.container, styles.container]}
    >
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.lowText}>Enter the email address associated with your account</Text>
        <InputField
            placeholder={'Email'}
            iconName={'envelope-o'}
            keyboardType={'email-address'}
            containerStyle={styles.textField}
        />

          <TouchableOpacity onPress={() => navigation.navigate("OTPVerification")} style={styles.button}>
              <FontAwesome style={styles.buttonIcon} name={"long-arrow-right"} size={30} color={"#fff"} />
          </TouchableOpacity>

          <BackButton navigation={navigation} />
    </ImageBackground>
  )
}

export default ForgotPassword;