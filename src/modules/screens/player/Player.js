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
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../constants/colors";
import { headings } from "../../../constants/spacers";

const Player = ({ artist, recently, mostPlayed, imageStyle, text }) => {
    
  return (
    <View style={{ backgroundColor: Colors.black, flex: 1 }}>
      <View style={styles.recent}>
        <View style={styles.imgContainer}>
          <Image
            source={require("../../../assets/images/download.png")}
            style={styles.img}
          />
          <View style={styles.imgTitle}>
            <Text style={styles.songName}>Ariana Grande</Text>
            <Text style={styles.songDesc}>The Weekend . Daft bunk</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}></View>

        <View></View>
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  songName: {
    fontSize: headings.xLarge,
    color: Colors.white,
    textAlign: "center",
  },
  songDesc: {
    fontSize: headings.small,
    color: Colors.white,
    textAlign: "center",
    marginTop: hp("1%"),
    color: Colors.gray,
  },

  img: { width: wp("80%"), height: hp("35%"), borderRadius: 10 },
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
