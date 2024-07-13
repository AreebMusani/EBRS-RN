import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'
import img from '../../assets/images/RP1.jpg';

const SongItem = ({item, style, titleStyle, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SongPlayer", {
      data: item
    })} style={[styles.container, style]}>
      {item?.Image && <Image source={{uri: item?.Image}} style={styles.img} />}
      <View style={styles.details}>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          
        <Text numberOfLines={1} style={[styles.head1, titleStyle]}>{item.Name}</Text>
        <Text style={styles.head2}>{item.Emotion}</Text>
        </View>

        <Text style={{color: "black", fontWeight: "bold"}}>{item?.Rating}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SongItem
