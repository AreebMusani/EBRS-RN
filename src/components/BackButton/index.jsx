import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from './style';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowBack}>
        <FontAwesome name="arrow-left" color="#fff" size={20} />
    </TouchableOpacity>
  )
}

export default BackButton