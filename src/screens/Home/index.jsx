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
import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';

const Home = ({navigation}) => {
  const [isShowModal, setisShowModal] = useState(false);
  const state = useSelector(state => state);
  const {name} = state?.user?.user || {};

  return (
    <ImageBackground source={require('../../assets/images/bg1.png')} style={[globalStyles.container, styles.container]}>
      <StatusBar backgroundColor={'#322251'} />
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <Header name={name} />

        <View style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 20}}>
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
        </View>

        <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>RECOMMMENDATION</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{marginVertical: 30}}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            data={recommendData}
            renderItem={({item, index}) => (
               <SongItem navigation={navigation} key={index} item={item} style={{width: wp('42%'), height: hp('25%')}} />
            )}
          />
        </View>

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
        </View>
      </ScrollView>
      <FaceScan visible={isShowModal} onClose={() => setisShowModal(false)} />

    </ImageBackground>
  );
};

export default Home;
