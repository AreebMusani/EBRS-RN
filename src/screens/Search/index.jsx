import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './style'
import globalStyle from '../../configs/globalStyle';
import InputField from '../../components/InputField';
import Feather from 'react-native-vector-icons/Feather'
import BackButton from '../../components/BackButton';
import FaceScan from '../../components/FaceScan';

const Search = () => {
    const [isShowModal, setisShowModal] = useState(false);
    const topGenre = [
        {
            id: 1,
            name: "Pop",
            image: require("../../assets/images/R2.jpg")
        },

        {
            id: 2,
            name: "Indie",
            image: require("../../assets/images/R2.jpg")
        },
        {
            id: 3,
            name: "Pop",
            image: require("../../assets/images/R2.jpg")
        },

        {
            id: 4,
            name: "Indie",
            image: require("../../assets/images/R2.jpg")
        },
    ]

    const podcastCategories = [
        {
            id: 1,
            name: "Comedy",
            image: require("../../assets/images/R2.jpg")
        },
        {
            id: 2,
            name: "News & Politics",
            image: require("../../assets/images/R2.jpg")
        },
        {
            id: 3,
            name: "Comedy",
            image: require("../../assets/images/R2.jpg")
        },
        {
            id: 4,
            name: "News & Politics",
            image: require("../../assets/images/R2.jpg")
        },
    ]

    const allCategories = [
        {
            id: 1,
            name: "Pop",
            image: require("../../assets/images/R2.jpg")
        },
        {
            id: 2,
            name: "Podcast",
            image: require("../../assets/images/R2.jpg")
        },
        {
            id: 3,
            name: "Comedy",
            image: require("../../assets/images/R2.jpg")
        },
        {
            id: 4,
            name: "Charts",
            image: require("../../assets/images/R2.jpg")
        },
    ]

    const OnRender = ({item, index}) => (
        <TouchableOpacity key={index} style={styles.itemContainer}>
            <Text style={styles.itemHead}>{item.name}</Text>
            <Image style={styles.roundImg} source={item.image} />
          </TouchableOpacity>
    )

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[globalStyle.container, styles.container]}>
        <BackButton style={{position: "relative", top: 0, left: 0, size: 20, marginVertical: 10}} />
        <View style={styles.row}>
          <InputField
            keyboardType={'email-address'}
            placeholder={'Artists, songs, or podcasts'}
            iconName={'search'}
            containerStyle={{width: "auto", marginVertical: 0, backgroundColor: "rgba(50, 34, 81, 0.5)", borderWidth: 0, paddingVertical: 6, borderRadius: 20}}
          />

          <TouchableOpacity onPress={() => setisShowModal(true)}>
              <Feather name="camera" color={"#472E78"} size={30} />
          </TouchableOpacity>      
        </View>  

        <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>Your Top Genre</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{marginVertical: 30, marginRight: -20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            data={topGenre}
            renderItem={OnRender}
          />
        </View>

        <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>Popular Podcast Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          
          <FlatList
            style={{marginVertical: 30, marginRight: -20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            data={podcastCategories}
            renderItem={OnRender}
          />
        </View>

        <View style={{marginTop: 20}}>
          <View style={styles.rowBetween}>
            <Text style={styles.heading}>Browse All</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          
          {/* <FlatList
            style={{marginVertical: 30, marginRight: -20}}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 20}}></View>}
            data={allCategories}
            renderItem={OnRender}
          /> */}
          <View style={{marginVertical: 30, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 15}}>
              {allCategories.map((item, index) => <OnRender key={index} item={item} index={index} /> )}
          </View>
        </View>

      <FaceScan visible={isShowModal} onClose={() => setisShowModal(false)} />
    </ScrollView>
  )
}

export default Search