import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  StatusBar,
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

const Registration = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <>
      <View style={[globalStyle.container, styles.container]}>
        <StatusBar backgroundColor={'#25274D'} />

        <Text style={styles.heading}>Create an account</Text>

        <View style={{marginVertical: 10}}>
          <InputField
            placeholder={'UserName'}
            iconName={'user-o'}
          />
          <InputField
            keyboardType={'email-address'}
            placeholder={'Email'}
            iconName={'envelope-o'}
          />

          <InputField iconName={'lock'} placeholder={'Password'} isPassword />
          <InputField iconName={'lock'} placeholder={'Confirm Password'} isPassword />

          
        </View>
        <Button onPress={() => navigation.replace('BottomNav')} text={'Create an account'} />

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
      </View>

      <BackButton navigation={navigation} />
    </>
  );
};

export default Registration;
