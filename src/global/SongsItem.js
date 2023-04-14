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
import Colors from "../constants/colors";
import { headings } from "../constants/spacers";
// import colors from "../constants/colors";

const SongsItem = ({ item, imageStyle }) => {
  //   console.log("check Item ======", imageStyle);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.deepInnerContainer}>
          {imageStyle ? (
            <Image
              source={item.image}
              style={[styles.itemImage, { borderRadius: 50 }]}
            />
          ) : (
            <Image
              source={item.image}
              style={[styles.itemImage, { borderRadius: 8 }]}
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.desc}>
              {item.desc} {item.time}
            </Text>
          </View>
        </TouchableOpacity>
        {imageStyle ? null : (
          <View style={styles.icons}>
            <TouchableOpacity>
              <AntDesign name="play" size={25} color={Colors.yellow} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default SongsItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: hp("1%"),
    width: wp("100%"),
    justifyContent: "center",
  },
  itemImage: {
    width: wp("18%"),
    height: hp("9%"),
    // borderRadius: 8,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: headings.small,
    textAlign: "center",
    color: Colors.white,
    marginTop: hp("1%"),
    textAlign: "left",
  },
  desc: {
    fontSize: headings.xSize,
    textAlign: "center",
    color: Colors.gray,
    height: hp("5%"),
    textAlign: "left",
    marginTop: hp("1%"),
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
  icons: {
    width: wp("20%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginRight: wp("2%"),
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp("5%"),
  },
  deepInnerContainer: { flexDirection: "row", justifyContent: "space-between" },
  titleContainer: { marginLeft: wp("4%"), justifyContent: "center" },
});
