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
import React, {useEffect, useState} from 'react';
import styles from './style';
import globalStyles from '../../configs/globalStyle';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData, removeLoginData} from '../../redux/slices/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import PlayListItem from '../../components/PlayListItem';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../configs/colors';
import { Images } from '../../utils/images';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import withAlert from '../../components/AlertBox/withAlert';
import api from '../../api/api';
import { getSongsData } from '../../redux/slices/songs';

const { UserIcon } = Images;

const UserProfile = ({navigation, showAlert}) => {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const songsData = useSelector(getSongsData);

  const [isSongPlay, setisSongPlay] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const userDetails = useSelector(getUserData);
  const [likesData, setlikesData] = useState([]);

  const onLogout = async () => {
    try{
      setisLoading(true);
      if(userDetails?.loginType === "google"){
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();  
      }
      dispatch(removeLoginData());  
    }catch(error){
      showAlert('Error', error?.message || error.toString());
    }finally{
      setisLoading(false);
    }
  } 

  const getLikesData = async () => {
    try{
      setisLoading(true)
      const response = await api.getFavouriteSongs({userId: userDetails?._id});
      console.log("reso", response);
      setlikesData(response?.data)
    }catch(error){
      console.log(error);
      showAlert('Error', error?.message || error.toString());
    }finally{
      setisLoading(false)
    }
  } 

  useEffect(() => {
    getLikesData();
  }, [])

  return (
    <ImageBackground
      style={[styles.container]}
      source={require('../../assets/images/bg1.png')}>
      <StatusBar backgroundColor={'#322251'} />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setisSongPlay(!isSongPlay)}
          style={styles.songToggle}>
          <FontAwesome
            name={isSongPlay ? 'pause' : 'play'}
            color={colors.TEXT}
            size={hp('3%')}
          />
        </TouchableOpacity>
        <View style={styles.headerTopContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color={colors.TEXT} size={25} />
          </TouchableOpacity>

          <View style={{position: 'relative'}}>
            <TouchableOpacity onPress={() => setshowMenu(!showMenu)}>
              <Entypo
                name="dots-three-vertical"
                color={colors.TEXT}
                size={25}
              />
            </TouchableOpacity>

            {showMenu && <View style={styles.menu}>
              <TouchableOpacity onPress={onLogout} style={styles.menuItem}>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </View>}
          </View>
        </View>

        <View style={styles.headerMainContainer}>
          <Image
            style={styles.profileImage}
            source={userDetails?.avatar ? {uri: userDetails?.avatar} : UserIcon}
          />

          <View style={styles.rightSideHeader}>
            <Text numberOfLines={1} style={styles.profileName}>
              {userDetails?.username}
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 20,
              }}>
              <View>
                <Text style={[styles.lightText]}>{likesData?.length}</Text>
                <Text style={styles.lightText}>Favourite</Text>
              </View>

              <View>
                <Text style={[styles.lightText]}>{songsData?.length}</Text>
                <Text style={styles.lightText}>Total Songs</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{flexGrow: 1, padding: 20}}
        showsVerticalScrollIndicator={false}>
        {/* <View>
          <Text style={styles.heading}>Likes</Text>
          <View style={{gap: 26}}>
            <PlayListItem songName={'Grainy Day'} songCategory={'Moody'} />
            <PlayListItem songName={'Grainy Day'} songCategory={'Moody'} />
          </View>
        </View> */}

        <View style={{marginTop: 26}}>
          <Text style={styles.heading}>Favourite</Text>
          <View style={{gap: 26}}>
            {likesData?.map((item, index) => (
              <PlayListItem songName={item?.song?.Name} songCategory={item?.song?.Emotion} />
            ))}
            {/* <PlayListItem songName={'Grainy Day'} songCategory={'Moody'} /> */}
          </View>
        </View>
      </ScrollView>

      {/* <BackButton navigation={navigation} /> */}

      {isLoading && (
        <View style={{...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)"}}>
          <ActivityIndicator color={"#fff"} size={"large"} />
        </View>
      )}
    </ImageBackground>
  );
};

export default withAlert(UserProfile);
