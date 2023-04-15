import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../constants/colors";
import { headings } from "../../../constants/spacers";
import SongsItem from "../../../global/SongsItem";
// import Button from '../../../global/components/Button'
import ButtonCompo from "../../../global/components/ButtonCompo";

const Favorites = ({ artist, recently, mostPlayed, imageStyle, text }) => {
  const data2 = [
    {
      id: "1",
      title: "Shades",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "2",
      title: "Without",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "3",
      title: "Item 3",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "4",
      title: "Without",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "5",
      title: "Item 3",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "6",
      title: "Without",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "7",
      title: "Item 3",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "8",
      title: "Item 3",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "9",
      title: "Without",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
    {
      id: "10",
      title: "Item 3",
      image: require("../../../assets/images/download.png"),
      desc: "Muslim  | ",
      time: "3:58mins",
    },
  ];

  //   console.log("image style ", imageStyle);

  return (
    <View style={{ backgroundColor: Colors.black, flex: 1 }}>
      <View style={styles.recent}>
        <View style={{ flexDirection: "row" }}>
          <ButtonCompo icon={"shuffle"} title={"shuffle"} />
          <ButtonCompo icon={"play"} title={"Play"} />
        </View>

        <ScrollView>
          <View>
            <View style={styles.favSongContainer}>
              <Text style={{ color: Colors.white }}>175 favorites</Text>
              <Text style={{ color: Colors.yellow }}> Date Added</Text>
            </View>
            {data2.map((item) => {
              return <SongsItem imageStyle={imageStyle} item={item} />;
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  favSongContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  img: { width: wp("50%"), height: hp("20%"), borderRadius: 10 },
  imgContainer: {
    width: wp("60"),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  imgTitle: {
    marginVertical: 10,
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
    borderRadius: "30%",
    marginBottom: 8,
  },
});
