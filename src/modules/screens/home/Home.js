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
import Colors from "../../../constants/colors";
import RecentlyPlayed from "../../../global/components/RecentlyPlayed";
import Songs from "../../../global/components/Songs";
import colors from "../../../constants/colors";

const data1 = [
  { id: "1", name: "Suggested" },
  { id: "2", name: "Songs" },
  { id: "3", name: "Artist" },
  { id: "4", name: "Album" },
  { id: "5", name: "Favorites" },
];

const Home = () => {
  const [selectedItemId, setSelectedItemId] = useState("1");

  const renderItem1 = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedItemId(item.id)}
      style={[styles.item, selectedItemId === item.id && styles.selectedItem]}
    >
      <Text
        style={[
          styles.itemText,
          selectedItemId === item.id && styles.selectedText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.body}>
      <View>
        <FlatList
          horizontal={true}
          data={data1}
          renderItem={renderItem1}
          keyExtractor={(item) => item.id}
        />
      </View>
      {selectedItemId == "1" && (
        <>
          <RecentlyPlayed recently={"Recently Played"} />
          <RecentlyPlayed imageStyle artist={"Artist"} />
          <RecentlyPlayed mostPlayed={"Most Played"} />
        </>
      )}
      {selectedItemId == "2" && (
        <>
          <Songs recently={"Recently Played"} />
        </>
      )}
      {selectedItemId == "3" && (
        <>
          <Songs text={'Date Added'} imageStyle={{borderRadius:50}}  recently={"85 Artist"} />
        </>
      )}
    </ScrollView>
  );
};

export default Home;

export const styles = StyleSheet.create({
  body: {
    backgroundColor: "black",
  },
  item: {
    marginLeft: wp("3%"),
    paddingVertical: 8,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  selectedItem: {
    borderBottomColor: Colors.yellow,
    color: Colors.yellow,
  },
  itemText: {
    fontSize: 16,
    color: "gray",
    textAlign: "justify",
  },
  selectedText: {
    fontSize: 16,
    color: Colors.yellow,
  },
  button: {
    backgroundColor: Colors.yellow,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
