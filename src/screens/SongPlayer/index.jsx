import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import globalStyle from '../../configs/globalStyle';
import styles from './style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../configs/colors';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AudioPlayer from '../../components/AudioPlayer';

const SongPlayer = ({navigation, route}) => {
  const [isSongLiked, setisSongLiked] = useState(false);
  const [isSongPlay, setisSongPlay] = useState(true);
  console.log(route?.params);
  // ref
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [hp('23%'), hp('50%')], []);


  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <ImageBackground source={require('../../assets/images/bg1.png')} style={[globalStyle.container, styles.container]}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#25274D'} />
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: hp('5%')}}>
          <FontAwesome name="chevron-left" color={colors.TEXT} size={25} />
        </TouchableOpacity>
        <Image
          style={styles.wallpaper}
          // source={require('../../assets/images/RP2.jpg')}
          source={{uri: route?.params?.data?.Image}}
        />
        <TouchableOpacity style={{marginTop: hp('5%')}}>
          <Entypo name="dots-three-vertical" color={colors.TEXT} size={25} />
        </TouchableOpacity>
      </View>

      {/* <AudioPlayer /> */}
      <View style={{alignItems: 'center', marginTop: hp('3%'), gap: 20}}>
        <Text style={styles.timer}>3.54</Text>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <Text style={styles.itemName}>Grainy Day</Text>
          <TouchableOpacity onPress={() => setisSongLiked(!isSongLiked)}>
            <FontAwesome
              name={isSongLiked ? 'heart' : 'heart-o'}
              color={colors.TEXT}
              size={hp('3%')}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controllerContainer}>
        <TouchableOpacity>
          <FontAwesome name="retweet" color={colors.TEXT} size={hp('3%')} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-back" color={colors.TEXT} size={hp('3.5%')} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setisSongPlay(!isSongPlay)}
          style={styles.songToggle}>
          <FontAwesome
            name={isSongPlay ? 'pause' : 'play'}
            color={colors.TEXT}
            size={hp('3%')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            name="play-skip-forward-sharp"
            color={colors.TEXT}
            size={hp('3.5%')}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <FontAwesome name="download" color={colors.TEXT} size={hp('3%')} />
        </TouchableOpacity>
      </View>


      <BottomSheet
        snapPoints={snapPoints}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{backgroundColor: "#fff"}}
        style={{zIndex: 9999999999}}
        backgroundStyle={{backgroundColor: 'rgb(50, 49, 99)'}}>
        <BottomSheetView style={styles.bottomContentContainer}>
          <View style={styles.playlistItemContainer}>
            <Image
              style={styles.playlistItemImg}
              source={require('../../assets/images/RP1.jpg')}
            />
            <View style={{flexGrow: 1, flexShrink: 1, gap: 3}}>
              <Text style={styles.playlistItemHead} numberOfLines={1}>
                Grainy Day
              </Text>
              <Text style={styles.playlistItemSubHead}>Moody</Text>
            </View>
            <TouchableOpacity>
              <Feather name="bar-chart-2" color={colors.TEXT} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.playlistItemContainer}>
            <Image
              style={styles.playlistItemImg}
              source={require('../../assets/images/RP1.jpg')}
            />
            <View style={{flexGrow: 1, flexShrink: 1, gap: 3}}>
              <Text style={styles.playlistItemHead} numberOfLines={1}>
                Grainy Day
              </Text>
              <Text style={styles.playlistItemSubHead}>Moody</Text>
            </View>
            <TouchableOpacity>
              <Feather name="bar-chart-2" color={colors.TEXT} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.playlistItemContainer}>
            <Image
              style={styles.playlistItemImg}
              source={require('../../assets/images/RP1.jpg')}
            />
            <View style={{flexGrow: 1, flexShrink: 1, gap: 3}}>
              <Text style={styles.playlistItemHead} numberOfLines={1}>
                Grainy Day
              </Text>
              <Text style={styles.playlistItemSubHead}>Moody</Text>
            </View>
            <TouchableOpacity>
              <Feather name="bar-chart-2" color={colors.TEXT} size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.playlistItemContainer}>
            <Image
              style={styles.playlistItemImg}
              source={require('../../assets/images/RP1.jpg')}
            />
            <View style={{flexGrow: 1, flexShrink: 1, gap: 3}}>
              <Text style={styles.playlistItemHead} numberOfLines={1}>
                Grainy Day
              </Text>
              <Text style={styles.playlistItemSubHead}>Moody</Text>
            </View>
            <TouchableOpacity>
              <Feather name="bar-chart-2" color={colors.TEXT} size={25} />
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
      

      

      {/* <View style={styles.playlistItemContainer}>
        <Image
          style={styles.playlistItemImg}
          source={require('../../assets/images/RP1.jpg')}
        />        
        <View style={{flexGrow: 1, flexShrink: 1, gap: 3}}>
          <Text style={styles.playlistItemHead} numberOfLines={1}>Grainy Day</Text>
          <Text style={styles.playlistItemSubHead}>Moody</Text>
        </View>
        <TouchableOpacity>
          <Feather name="bar-chart-2" color={colors.TEXT} size={25} />
        </TouchableOpacity>        
      </View> */}
    </ImageBackground>
  );
};

export default SongPlayer;
