import {useState} from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';

import styles from './style';

const Button = ({text, width, onPress, style, isLoading = false, children}) => {
  return (
    <TouchableOpacity 
    onPress={isLoading ? () => {} : onPress}
    style={[styles.container, {width: width || "100%"}, style]}>
      {isLoading ? 
        <ActivityIndicator color={'#fff'} size={"small"} /> : 
        (children ? children : <Text style={styles.text}>{text}</Text>)
      }
    </TouchableOpacity>
  );
};

export default Button;
