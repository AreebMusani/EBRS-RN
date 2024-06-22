import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './style';
import SongImg from '../../assets/images/RP1.jpg';
import colors from '../../configs/colors';
import Feather from "react-native-vector-icons/Feather";

const PlayListItem = ({songName, songCategory, containerStyles}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.playlistItemContainer, containerStyles]}>
      <Image
        style={styles.playlistItemImg}
        source={SongImg}
      />
      <View style={{flexGrow: 1, flexShrink: 1, gap: 3}}>
        <Text style={styles.playlistItemHead} numberOfLines={1}>
          {songName}
        </Text>
        <Text style={styles.playlistItemSubHead}>{songCategory}</Text>
      </View>
      <TouchableOpacity>
        <Feather name="bar-chart-2" color={colors.TEXT} size={25} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlayListItem;
