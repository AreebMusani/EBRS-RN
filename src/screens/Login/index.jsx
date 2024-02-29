import { StyleSheet, Text, TouchableOpacity,
  View,
  TextInput,
  Image
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
import FaceScan from '../../components/FaceScan';

const Login = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const onLogin = () => {
    navigation.replace("Home");
  }

  return (
    <>
      <View style={[globalStyle.container, styles.container]}>
        <Text style={styles.heading}>Login your account</Text>

        <View style={{marginVertical: 10}}>
          <InputField
            keyboardType={'email-address'}
            placeholder={'Email'}
            iconName={'envelope-o'}
          />

          <InputField iconName={'lock'} placeholder={'Password'} isPassword />

          <View style={styles.row}>
            <CheckBox
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: '#9668EF', false: '#9668EF'}}
            />
            <Text style={{color: '#fff'}}>Remember Me</Text>
          </View>
        </View>
        <Button text={'Login'} onPress={onLogin} />

        <TouchableOpacity style={{marginTop: 10, marginBottom: 20}}>
          <Text style={styles.forgetPass}>Forget the Password?</Text>
        </TouchableOpacity>

        <View style={styles.row}>
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
          <Text style={styles.msgText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BackButton navigation={navigation} />

    </>
  );
};

export default Login;
