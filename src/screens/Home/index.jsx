import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
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

const Home = () => {
  const [isShowModal, setisShowModal] = useState(true);

  // useEffect(() => {
  //   setisShowModal(true);
  // }, [])
  
  return (
    <View style={[globalStyles.container, styles.container]}>
      <StatusBar backgroundColor={'#322251'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header name={'Areeb'} />

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
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            data={recentlyPlayed}
            renderItem={({item, index}) => <SongItem key={index} item={item} />}
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
              <SongItem key={index} item={item} style={{height: 220}} />
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
              <SongItem key={index} item={item} style={{height: 220}} />
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
                key={index}
                item={item}
                style={{height: 200, borderRadius: 100}}
                titleStyle={{textAlign: 'center', marginHorizontal: 20}}
              />
            )}
          />
        </View>
        </View>
      </ScrollView>
      <FaceScan visible={isShowModal} onClose={() => setisShowModal(false)} />

    </View>
  );
};

export default Home;
