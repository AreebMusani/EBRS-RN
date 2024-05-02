import React from 'react';
import { View, Text, Image, StatusBar, ImageBackground } from 'react-native';

import style from './style';
import globalStyle from '../../configs/globalStyle';
import Button from '../../components/Button';
import colors from '../../configs/colors';

const GettingStarted = ({navigation}) => {
  return (
    <ImageBackground source={require("../../assets/images/bg.png")} style={[globalStyle.container, style.container]}>
      <StatusBar  backgroundColor={'#25274D'} />
      <Image 
        source={require("../../assets/images/Headphones.png")}
        style={style.headImg}
      />

      <View style={style.headContainer}>
        <Text style={style.head}>Getting Started</Text>
        <Text style={style.lowText}>Getting Started Getting</Text>
      </View>

      <Button 
        text="Let's go"
        width={"50%"}
        onPress={() => navigation.navigate("Login")}
      />

      <View style={style.footer}>
        <Text style={style.footerText}>Staca</Text>
        <Text style={{color: colors.TEXT}}>Rest music app</Text>
      </View>
    </ImageBackground>
  );
};

export default GettingStarted;
