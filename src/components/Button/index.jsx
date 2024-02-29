import {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import styles from './style';

const Button = ({text, width, onPress}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={[styles.container, {width: width || "100%"}]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
