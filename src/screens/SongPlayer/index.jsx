import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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
import TrackPlayer, {useIsPlaying, useProgress, useActiveTrack, Event} from 'react-native-track-player';
import { useIsFocused } from '@react-navigation/native';
import { PlayerProgressBar } from '../../components/PlayerProgressBar';
import { ModalComponent } from '../../components/modal/Modal';
import api from '../../api/api';
import { useSelector } from 'react-redux';
import { getUserData } from '../../redux/slices/user';
import withAlert from '../../components/AlertBox/withAlert';
import Toast from 'react-native-toast-message';

const SongPlayer = ({navigation, route, showAlert}) => {
  const userDetails = useSelector(getUserData);
  const progress = useProgress();
  const activeItem = useActiveTrack();
  const [isLoading, setisLoading] = useState(false);

  const [isSongLiked, setisSongLiked] = useState(false);
  const [isFeedbackModalOpen, setisFeedbackModalOpen] = useState(false);
  const [rating, setRating] = useState(null);
  const isPlay = useIsPlaying();
  const [isSongPlay, setisSongPlay] = useState(false);
  // console.log(route?.params?.data);
  const [selectedSong, setselectedSong] = useState(route?.params?.data);
  const {_id, key, artwork, title, Category, Emotion, Rating, Ratings} = selectedSong || {};
  // ref
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [hp('23%'), hp('50%')], []);

  useEffect(() => {
    // if(isPlay.playing){
      setisSongPlay(isPlay.playing);
    // }
  }, [isPlay.playing])

  // useEffect(() => {
  //   console.warn(key);
  //   (async () => {
  //     const data = await TrackPlayer.getQueue();
  //     console.log("QUEUE", data);
  //   })()
  // })

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (data) => {
      // console.log("Event.PlaybackActiveTrackChanged ", data);
      setselectedSong(data?.track);
    })
  })

  // useEffect(() => {
  //   console.log(activeItem, " activeItem");
  //   if(selectedSong?.title !== activeItem?.title){
  //     setselectedSong(activeItem);
  //   }else{
  //     setselectedSong(route?.params?.data);
  //   }
  // }, [activeItem]);

  // useEffect(() => {
  //   if(key !== activeItem?.key){
  //     handleTrackSelection(key);
  //   }
  // }, [])

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleTrackSelection = async (trackId) => {    
    await TrackPlayer.pause();
    await TrackPlayer.skip(trackId);
    await TrackPlayer.seekTo(0);
    await TrackPlayer.play();
  };

  const playSong = async () => {
    await TrackPlayer.play();
  }
  const pauseSong = async () => {
    await TrackPlayer.pause();
  }

  const playNextSong = async () => {
    await TrackPlayer.skipToNext();
    setselectedSong(activeItem);
  }

  const playPreviousSong = async () => {
    await TrackPlayer.skipToPrevious();
  }

  const toggleButton = () => {
    if(isSongPlay){
      setisSongPlay(false)
      pauseSong()
    }else{
      setisSongPlay(true)
      playSong()
    }
  }

  const giveSongRating = async () => {
    setisFeedbackModalOpen(false);
    try{
      setisLoading(true);
      if(!rating){
        throw Error("please give us rating for this song...")
      }
      const payload = {
        body: {
            userId: userDetails?._id,  
            rating: rating
        }, 
        songId: _id
      }
      console.log(payload);

      const response = await api.giveRatingToSong({body: payload?.body, songId: payload?.songId});
      console.log(response);
      Toast.show({
        type: 'success',
        text1: response?.message,
      });
    }catch(error) {
      console.log('error', error)
      showAlert('Error', error?.message || error.toString());
    }finally{
      setisLoading(false);
    }
  }

  return (
    <ImageBackground source={require('../../assets/images/bg1.png')} style={[globalStyle.container, styles.container]}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#25274D'} />
      
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginTop: hp('5%')}}>
          <FontAwesome name="chevron-left" color={colors.TEXT} size={25} />
        </TouchableOpacity>
        {/* <Image
          style={styles.wallpaper}
          // source={require('../../assets/images/RP2.jpg')}
          source={{uri: artwork}}
        /> */}
        <TouchableOpacity style={{marginTop: hp('5%')}}>
          <Entypo name="dots-three-vertical" color={colors.TEXT} size={25} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, justifyContent: "center"}}>
      <View style={{alignItems: 'center', marginTop: hp("3%"), marginHorizontal: 20}}>
        <Image 
          style={{width: "100%", height: hp("30%"), resizeMode: "stretch", borderRadius: 20}}
          resizeMethod='scale'
          source={{uri: artwork}}
        />
      </View>

      {/* <AudioPlayer /> */}
      <View style={{
          alignItems: 'center', 
          marginTop: hp('3%'), 
          gap: 20
          }}>
        {/* <Text style={styles.timer}>3.54</Text> */}
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <Text style={styles.itemName}>{title}</Text>
          {/* <TouchableOpacity onPress={() => setisSongLiked(!isSongLiked)}>
            <FontAwesome
              name={isSongLiked ? 'heart' : 'heart-o'}
              color={colors.TEXT}
              size={hp('3%')}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View>
          <Text style={styles.songDetails}>{Emotion}</Text>
        </View>

        <View style={{gap: 2}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
              <Ionicons name="earth" color={colors.TEXT} size={hp('2.5%')} />
              <Text style={styles.songDetails}>{`: ${Rating} `}</Text>
              <FontAwesome
                    name={'star'}
                    color={colors.TEXT}
                    size={hp('2.5%')}
                  />
          </View>

          {Ratings?.length > 0 && <View style={{flexDirection: "row", alignItems: "center"}}>
            <Ionicons name="person" color={colors.TEXT} size={hp('2.5%')} />
              <Text style={styles.songDetails}>{`: ${Ratings?.[0]?.rating} `}</Text>
              <FontAwesome
                    name={'star'}
                    color={colors.TEXT}
                    size={hp('2.5%')}
                  />
          </View>}

        </View>
      </View>

      {/* <View>
                <Text>{progress.position}</Text>
                <ProgressBar
                    progress={progress.position}
                    buffered={progress.buffered}
                />
            </View> */}

            <PlayerProgressBar style={{width: "100%", paddingHorizontal: 20, marginTop: hp("4%")}} />

      <View style={styles.controllerContainer}>
        <TouchableOpacity onPress={() => setisFeedbackModalOpen(true)}>
          <Entypo name="new-message" color={colors.TEXT} size={hp('3%')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPreviousSong}>
          <Ionicons name="play-skip-back" color={colors.TEXT} size={hp('3.5%')} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleButton}
          style={styles.songToggle}>
          <FontAwesome
            name={isSongPlay ? 'pause' : 'play'}
            color={colors.TEXT}
            size={hp('3%')}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNextSong}>
          <Ionicons
            name="play-skip-forward-sharp"
            color={colors.TEXT}
            size={hp('3.5%')}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <FontAwesome name="download" color={colors.TEXT} size={hp('3%')} />
        </TouchableOpacity> */}
        <TouchableOpacity 
          // onPress={() => setisSongLiked(!isSongLiked)}
          onPress={() => onLikeSong()}
          >
            <FontAwesome
              name={isSongLiked ? 'heart' : 'heart-o'}
              color={colors.TEXT}
              size={hp('3%')}
            />
          </TouchableOpacity>
      </View>

      </View>


      {/* <BottomSheet 
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
      </BottomSheet>*/}
      

      

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

      <ModalComponent 
        open={isFeedbackModalOpen}
        setOpen={setisFeedbackModalOpen}
        justifyContent="flex-end"
        marginHorizontail={0}
        childern={(
          <View style={{padding: 30, backgroundColor: "gray", borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              {[1,2,3,4,5].map((item, index) => (
                <TouchableOpacity key={index} onPress={() => setRating(item)}>
                  <FontAwesome
                    name={(Number(rating) <= Number(index)) ? 'star-o' : 'star'}
                    color={colors.TEXT}
                    size={hp('4%')}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={{marginTop: 20, flexDirection: "row", gap: 20}}>
              <TouchableOpacity onPress={() => setisFeedbackModalOpen(false)} style={{flex: 1, height: 40, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 20, justifyContent: "center"}}>
                <Text style={{color: colors.TEXT, textAlign: "center"}}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={giveSongRating} style={{flex: 1, height: 40, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: 20, justifyContent: "center"}}>
                <Text style={{color: colors.TEXT, textAlign: "center"}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {isLoading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <ActivityIndicator color={'#fff'} size={'large'} />
        </View>
      )}
    </ImageBackground>
  );
};

export default withAlert(SongPlayer);
