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

const InputField = ({
  isEditable = true,
  iconName, keyboardType, placeholder, isPassword, containerStyle, iconColor, inputStyles, newContainerStyle,
  name,
  error,
  onChange,
  register = () => {},
  ...props
}) => {
    const [isInputTextShow, setisInputTextShow] = useState(isPassword)
  return (
    <View style={[{marginVertical: 10, width: "100%"}, newContainerStyle]}>
    <View style={[styles.inputContainer(error), containerStyle]}>
      <FontAwesome style={{marginRight: 10, minWidth: 20, textAlign: "center"}} name={iconName} size={20} color={iconColor || "#fff"} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={inputStyles?.placeholderTextColor || '#fff'}
        style={[styles.inputField, inputStyles]}
        secureTextEntry={isInputTextShow}
        keyboardType={keyboardType || "default"}
        // disabled={disabled}
        autoCapitalize='none'
        editable={isEditable}
        {...register(name)}
        onChangeText={onChange}
        {...props}
      />

      {isPassword && <TouchableOpacity style={{marginLeft: 10}} onPress={() => setisInputTextShow(!isInputTextShow)}>
        {isInputTextShow ? <FontAwesome name="eye-slash" size={20} color="rgba(255,255,255, 0.5)" />
        : <FontAwesome name="eye" size={20} color="rgba(255,255,255, 0.5)" />}
      </TouchableOpacity>}
    </View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

export default InputField;
