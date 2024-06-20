import { StyleSheet, Text, TouchableOpacity,
  View,
  TextInput,
  Image,
  StatusBar,
  ImageBackground,
  Keyboard
} from 'react-native';
import React, {useEffect, useState} from 'react';
import globalStyle from '../../configs/globalStyle';
import styles from './styles';
import Button from '../../components/Button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputField from '../../components/InputField';
import CheckBox from '@react-native-community/checkbox';
import colors from '../../configs/colors';
import BackButton from '../../components/BackButton';
import FaceScan from '../../components/FaceScan';
import { useForm } from 'react-hook-form';
import { loginValidation } from '../../configs/validation.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../api/api';
import withAlert from '../../components/AlertBox/withAlert';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/user';

const Login = ({navigation, showAlert}) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { 
    register, 
    handleSubmit,
    getValues, 
    setValue,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(loginValidation)
  });

  const onLogin = async (data) => {
    Keyboard.dismiss();
    setisLoading(true)
    try{
      const payload = {
        email: data.useremail,
        password: data.password
      }
      const response = await api.login(payload);
      console.log("response ", response);
      dispatch(setUser({token: response?.token, user: response?.user}));
      Toast.show({
        type: 'success',
        text1: "Login Successfully...",
      });
    }catch(error){
      showAlert("Error", error?.message || error.toString());
    }finally{
      setisLoading(false)
    }
  }

  const saveAuthData = async (data) => {
    Keyboard.dismiss();
    setisLoading(true)
    try{
      const payload = {
        email: data?.email,
        username: data?.name,
        googleId: data?.id,
        avatar: data?.photo,
        loginType: "google"
      }
      const response = await api.socialLogin(payload);
    }catch(error){
      showAlert("Error", error?.message || error.toString());
    }finally{
      setisLoading(false)
    }
  } 

  return (
    <>
      <ImageBackground source={require("../../assets/images/bg.png")} style={[globalStyle.container, styles.container]}>
        <StatusBar backgroundColor={'#25274D'} />
        <Text style={styles.heading}>Login your account</Text>

        <View style={{marginVertical: 10}}>
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

          <View style={styles.row}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: '#9668EF', false: '#9668EF'}}
            />
            <Text style={{color: '#fff'}}>Remember Me</Text>
          </View>
        </View>
        <Button text={'Login'} isLoading={isLoading} onPress={handleSubmit(onLogin)} />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{marginTop: 10, marginBottom: 20}}>
          <Text style={styles.forgetPass}>Forget the Password?</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <View style={styles.line}></View>
          <Text style={styles.lineInnerText}>or continue with</Text>
          <View style={styles.line}></View>
        </View>

        <View style={[styles.row, styles.iconContainer]}>
          <TouchableOpacity onPress={() => {
            
          }}>
            <Image source={require('../../assets/images/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Facebook.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Apple.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.msgText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <BackButton navigation={navigation}  />

    </>
  );
};

export default withAlert(Login);
