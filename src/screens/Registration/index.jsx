import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import globalStyle from '../../configs/globalStyle';
import styles from './styles';
import Button from '../../components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputField from '../../components/InputField';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../configs/colors';
import BackButton from '../../components/BackButton';
import withAlert from '../../components/AlertBox/withAlert';

import { registerValidation } from '../../configs/validation.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/user';
import Toast from 'react-native-toast-message';
import api from '../../api/api';
import { GoogleSignin, GoogleSigninButton, isErrorWithCode } from '@react-native-google-signin/google-signin';

const Registration = ({navigation, showAlert}) => {
  const [isLoading, setisLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit,
    getValues, 
    setValue,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(registerValidation)
  });

  const onSubmit = async (data) => {
    Keyboard.dismiss();
    setisLoading(true);
    try{
      const payload = {
        username: data.fullName,
        email: data.useremail,
        password: data.password
      }

      const response = await api.sendOTPForEmailVerification({email: data?.useremail});
      console.log("response ", response);
      navigation.navigate("OTPVerification", {...payload, purpose: "verifyEmail"});

      /**
      const response = await api.signup(payload);
      console.log("response ", response);
      dispatch(setUser({token: response?.token, user: response?.user}));
      Toast.show({
        type: 'success',
        text1: "Registered Successfully...",
      });
      navigation.navigate("BottomNav");
      */
    }catch(error){
      showAlert("Error", error?.message || error.toString());
    } finally{
      setisLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setIsGoogleLoading(true);
      await saveAuthData(userInfo?.user);
    } catch (error) {
      if (isErrorWithCode(error)) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('IN_PROGRESS');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('PLAY_SERVICES_NOT_AVAILABLE');
        } else {
          showAlert("Error", error?.message || error.toString());
        }
      } else {
        // an error that's not related to google sign in occurred
        showAlert("Error", error?.message || error.toString());
      }
    }finally{
      setIsGoogleLoading(false);
    }
  };

  const saveAuthData = async data => {
    Keyboard.dismiss();
    const payload = {
      email: data?.email,
      username: data?.name,
      googleId: data?.id,
      avatar: data?.photo,
      loginType: 'google',
    };
    console.log('payload', payload);
    const response = await api.socialLogin(payload);
    console.log('response ', response);
    dispatch(setUser({token: response?.token, user: response?.user}));
    Toast.show({
      type: 'success',
      text1: 'Login Successfully...',
    });
  };

  return (
    <>
      <ImageBackground source={require('../../assets/images/bg.png')} style={[globalStyle.container, styles.container]}>
        <StatusBar backgroundColor={'#25274D'} />

        <Text style={styles.heading}>Create an account</Text>

        <View style={{marginVertical: 10}}>
          <InputField
            placeholder={'UserName'}
            iconName={'user-o'}
            name="fullName"
            register={register}
            onChange={(text) => {setValue("fullName", text)}}
            error={errors.fullName}
          />
          <InputField
            keyboardType={'email-address'}
            placeholder={'Email'}
            iconName={'envelope-o'}
            name="useremail"
            register={register}
            onChange={(text) => {setValue("useremail", text)}}
            error={errors.useremail}
          />

          <InputField 
            iconName={'lock'} 
            placeholder={'Password'} 
            isPassword 
            name="password"
            register={register}
            onChange={(text) => {setValue("password", text)}}
            error={errors.password}
          />
          
          <InputField 
            iconName={'lock'} 
            placeholder={'Confirm Password'} 
            isPassword 
            name="cPassword"
            register={register}
            onChange={(text) => {setValue("cPassword", text)}}
            error={errors.cPassword}
          />

          
        </View>
        <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading} text={'Create an account'} />

        <View style={[styles.row, {marginTop: 20}]}>
          <View style={styles.line}></View>
          <Text style={styles.lineInnerText}>or continue with</Text>
          <View style={styles.line}></View>
        </View>

        {/* <View style={[styles.row, styles.iconContainer]}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Facebook.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Apple.png')} />
          </TouchableOpacity>
        </View> */}

        <GoogleSigninButton onPress={signInWithGoogle} style={{ width: "60%", marginVertical: 20 }} />

        <View style={styles.row}>
          <Text style={styles.msgText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <BackButton navigation={navigation} />

      {isGoogleLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      )}
    </>
  );
};

export default withAlert(Registration);
