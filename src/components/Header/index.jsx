import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../configs/colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Header = ({name}) => {
  return (
    <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={styles.name}>Hello, {name}</Text>
        </View>
        <View style={styles.rightSide}>
            <TouchableOpacity>
                <Ionicons name="notifications" color={colors.TEXT} size={wp('6%')} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="settings-sharp" color={colors.TEXT} size={wp('6%')} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image source={require("../../assets/images/profile.jpg")} style={styles.userIcon} />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Header
