import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from './style';

const BackButton = ({navigation, style, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress ? onPress : () => navigation.goBack()} style={[styles.arrowBack, style]}>
        <FontAwesome name="arrow-left" color="#fff" size={style?.size || 20} />
    </TouchableOpacity>
  )
}

export default BackButton