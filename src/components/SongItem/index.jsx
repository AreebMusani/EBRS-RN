import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import styles from './style'

const SongItem = ({item, style, titleStyle}) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      {item?.image && <Image source={item.image} style={styles.img} />}
      <View style={styles.details}>
        <Text numberOfLines={1} style={[styles.head1, titleStyle]}>{item.title}</Text>
        <Text style={styles.head2}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SongItem
