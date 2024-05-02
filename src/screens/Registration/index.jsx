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

const Registration = ({navigation, showAlert}) => {
  const [isLoading, setisLoading] = useState(false)
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
      const response = await api.signup(payload);
      console.log("response ", response);
      dispatch(setUser({token: response?.token, user: response?.user}));
      Toast.show({
        type: 'success',
        text1: "Registered Successfully...",
      });
      navigation.navigate("BottomNav");
    }catch(error){
      showAlert("Error", error?.message || error.toString());
    } finally{
      setisLoading(false);
    }
  }

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

        <View style={[styles.row, styles.iconContainer]}>
          <TouchableOpacity>
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
          <Text style={styles.msgText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <BackButton navigation={navigation} />
    </>
  );
};

export default withAlert(Registration);
