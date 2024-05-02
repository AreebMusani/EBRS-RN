import {useState} from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';

import styles from './style';

const Button = ({text, width, onPress, style, isLoading = false}) => {
  return (
    <TouchableOpacity 
    onPress={isLoading ? () => {} : onPress}
    style={[styles.container, style, {width: width || "100%"}]}>
      {isLoading ? 
        <ActivityIndicator color={'#fff'} size={"small"} /> : 
        <Text style={styles.text}>{text}</Text>
      }
    </TouchableOpacity>
  );
};

export default Button;
