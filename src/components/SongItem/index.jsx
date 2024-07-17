import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './style';
import img from '../../assets/images/RP1.jpg';
import fontSizes from '../../configs/fontSizes';
import TrackPlayer from 'react-native-track-player';

const SongItem = ({item, style, titleStyle, navigation, key}) => {
  return (
    <TouchableOpacity
      onPress={() =>{
        TrackPlayer.skip(item?.key).then(( ) => {
          navigation.navigate('SongPlayer', {
            data: item,
          })
        })
        // navigation.navigate('SongPlayer', {
        //   data: item,
        // })
        // console.log(item?.key);
        // handleTrackSelection(item?.key)
      }}
      style={[styles.container, style]}>
      {item?.artwork && <Image source={{uri: item?.artwork}} style={styles.img} />}
      <View style={styles.details}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={[styles.head1, titleStyle, {flexShrink: 1}]}>
            {item?.title}
          </Text>
          <Text style={[styles.head1]}>{item.Rating}</Text>
        </View>

        <Text
          style={[styles.head1, {
            // color: 'black',
            fontWeight: 'bold',
            fontSize: 12,
            elevation: 4
          }]}>
          {item?.Emotion}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;
