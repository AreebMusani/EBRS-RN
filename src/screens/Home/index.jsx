import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './style';
import globalStyles from '../../configs/globalStyle';
import Header from '../../components/Header';
import SongItem from '../../components/SongItem';
import {
  recentlyPlayed,
  recommendData,
  todayHitsData,
  topArtist,
} from '../../utils/data';
import colors from '../../configs/colors';
import FaceScan from '../../components/FaceScan';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../api/api';
import { getUserData } from '../../redux/slices/user';
import { getSongsData, setSongs } from '../../redux/slices/songs';

const Home = ({navigation, route}) => {
  const userDetails = useSelector(getUserData);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const songsData = useSelector(getSongsData);
  const emotion = route?.params?.emotion;
  const [isFirstTimeOpen, setisFirstTimeOpen] = useState(false);
  const [isShowModal, setisShowModal] = useState(false);
  const state = useSelector(state => state);
  const {username} = state?.user?.user || {};

  useEffect(() => {
    if(!isFirstTimeOpen){
      setisFirstTimeOpen(true);
      setisShowModal(true);
    }
  }, [])

  useEffect(() => {
    getSongsByCategory();
  }, [isShowModal])

  const getSongsByCategory = useCallback(async () => {
    try{
      setloading(true);
      console.log(userDetails?._id);
      console.log(emotion);
      const response = await api.getSongs({
        userId: userDetails?._id,
        category: emotion
      })
      console.log(response);
      dispatch(setSongs({setSongs: response}))
    }catch(error){
      console.log(error.toString());
    }finally{
      setloading(false);
    }
  }, [emotion])


  return (
    <ImageBackground source={require('../../assets/images/bg1.png')} style={[globalStyles.container, styles.container]}>
      <StatusBar backgroundColor={'#322251'} />
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <Header name={username} />

        <View style={{paddingHorizontal: 20}}>
        {/* <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>RECENTLY PLAYED</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{marginVertical: 30}}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: wp('6%')}}></View>}
            data={recentlyPlayed}
            renderItem={({item, index}) => <SongItem navigation={navigation} key={index} item={item} style={{width: wp('42%'), height: hp('25%')}} />}
          />
        </View> */}

        <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>RECOMMMENDATION</Text>
            {/* <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity> */}
          </View>
          <FlatList
            style={{marginVertical: 30}}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 20}}></View>}
            // data={recommendData}
            data={songsData}
            renderItem={({item, index}) => (
               <SongItem navigation={navigation} key={index} item={item} style={{width: "100%", height: hp('30%')}} />
            )}
          />
        </View>

        {/*  
        <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>TODAY'S BIGGEST HITS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{marginVertical: 30}}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            data={todayHitsData}
            renderItem={({item, index}) => (
               <SongItem navigation={navigation} key={index} item={item} style={{width: wp('42%'), height: hp('25%')}} />
            )}
          />
        </View>

        <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>TOP ARTIST</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{marginVertical: 30}}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            data={topArtist}
            renderItem={({item, index}) => (
              <SongItem
                navigation={navigation}
                key={index}
                item={item}
                style={{width: wp('42%'), height: wp('42%'), borderRadius: 100}}
                titleStyle={{textAlign: 'center', marginHorizontal: 20}}
              />
            )}
          />
        </View>

        */}
        </View>
      </ScrollView>
      <FaceScan navigation={navigation} visible={isShowModal} onClose={() => setisShowModal(false)} />

    </ImageBackground>
  );
};

export default Home;
