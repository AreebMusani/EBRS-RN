import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import styles from './style';
import img from '../../assets/images/RP1.jpg';
import fontSizes from '../../configs/fontSizes';
import TrackPlayer from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../configs/colors';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import { getSongsData } from '../../redux/slices/songs';
import { useSelector } from 'react-redux';

const SongItem = ({checkQueue, item, style, titleStyle, navigation, key}) => {
  const songsData = useSelector(getSongsData);

  return (
    <TouchableOpacity
      onPress={async() => {
        if(checkQueue()){
          await TrackPlayer.reset();
          await TrackPlayer.add(songsData);
        }
        TrackPlayer.skip(item?.key).then(() => {
          navigation.navigate('SongPlayer', {
            data: item,
          });
        });
        // navigation.navigate('SongPlayer', {
        //   data: item,
        // })
        // console.log(item?.key);
        // handleTrackSelection(item?.key)
      }}
      style={[styles.container, style]}>
      {item?.artwork && (
        <Image source={{uri: item?.artwork}} style={styles.img} />
      )}
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="earth" color={colors.TEXT} size={15} />
              <Text style={[styles.head1]}>{item.Rating}</Text>
            </View>
          {/* <Text style={[styles.head1]}>{item.Rating}</Text> */}
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={[
              styles.head1,
              {
                // color: 'black',
                fontWeight: 'bold',
                fontSize: 12,
                elevation: 4,
              },
            ]}>
            {item?.Emotion}
          </Text>
          {item.Ratings?.length > 0 && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="person" color={colors.TEXT} size={15} />
              <Text style={[styles.head1]}>{item.Ratings?.[0]?.rating}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;
