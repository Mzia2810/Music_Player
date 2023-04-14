import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../constants/colors";
import { headings } from "../../constants/spacers";
import colors from "../../constants/colors";



const RecentlyPlayed = ({artist,recently,mostPlayed,imageStyle}) => {


    const data2 = [
        {
          id: "1",
          title: "Shades of Love ",
          image: require("../../assets/images/download.png"),
        },
        {
          id: "2",
          title: "Without You-The kid lory ",
          image: require("../../assets/images/download.png"),
        },
        {
          id: "3",
          title: "Item 3",
          image: require("../../assets/images/download.png"),
        },
        {
          id: "4",
          title: "Item 4",
          image: require("../../assets/images/download.png"),
        },
        {
          id: "5",
          title: "Item 5",
          image: require("../../assets/images/download.png"),
        },
      ];

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={ [styles.itemImage,{borderRadius:imageStyle ? 50 :8}]} />
      <Text style={styles.itemTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.recent}>
      <View style={styles.recently}>
        <Text style={styles.recentlyText}>{artist || artist || recently || recently || mostPlayed || mostPlayed}</Text>
        <TouchableOpacity>
          <Text style={{ color: colors.yellow }}>See All</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          horizontal={true}
          data={data2}
          renderItem={renderItem2}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default RecentlyPlayed;

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: wp("2%"),
    marginTop: hp("1%"),
    marginLeft: wp("5%"),
    width: wp("30%"),
    justifyContent: "center",
  },
  itemImage: {
    width: wp("30%"),
    height: hp("15%"),
    // borderRadius:  8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: headings.small,
    textAlign: "center",
    color: Colors.white,
    height: hp("5%"),
  },
  recently: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp("5%"),
  },
  recentlyText: { color: Colors.white },
  recent: { marginTop: hp("2%") },
  imgStyle: {
    width: wp("30%"),
    height: hp("15%"),
    borderRadius:"30%",
    marginBottom: 8,
  },
});
