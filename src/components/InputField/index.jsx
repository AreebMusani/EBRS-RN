import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InputField = ({iconName, keyboardType, placeholder, isPassword, containerStyle, iconColor, inputStyles}) => {
    const [isInputTextShow, setisInputTextShow] = useState(isPassword)
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <FontAwesome style={{marginRight: 10, minWidth: 20, textAlign: "center"}} name={iconName} size={20} color={iconColor || "#fff"} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={inputStyles?.placeholderTextColor || '#fff'}
        style={[styles.inputField, inputStyles]}
        secureTextEntry={isInputTextShow}
        keyboardType={keyboardType || "default"}
      />

      {isPassword && <TouchableOpacity style={{marginLeft: 10}} onPress={() => setisInputTextShow(!isInputTextShow)}>
        {isInputTextShow ? <FontAwesome name="eye-slash" size={20} color="rgba(255,255,255, 0.5)" />
        : <FontAwesome name="eye" size={20} color="rgba(255,255,255, 0.5)" />}
      </TouchableOpacity>}
    </View>
  );
};

export default InputField;
