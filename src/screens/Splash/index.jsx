import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyle from '../../configs/globalStyle';
import styles from './style';
import colors from '../../configs/colors';

const Splash = () => {
  return (
    <ImageBackground source={require('../../assets/images/bg.png')} style={[globalStyle.container, styles.container]}>
      <StatusBar backgroundColor={colors.PRIMARY}/>
      <View>
        <Image 
            style={styles.logoImg}
            source={require('../../assets/images/logoNew.png')} />
        <Text style={styles.logoText}>Emusic</Text>
      </View>
    </ImageBackground>
  )
}

export default Splash;