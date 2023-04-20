import React, { useState, useEffect } from "react";
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
import axios from "axios";

const data1 = [
  { id: "1", name: "Suggested" },
  { id: "2", name: "Songs" },
  { id: "3", name: "Artist" },
  { id: "4", name: "Album" },
  { id: "5", name: "Favorites" },
];

//  Api key
const API_KEY = "ef402f25a2d3539f737919169192f846";

const Home = () => {
  const [selectedItemId, setSelectedItemId] = useState("1");
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  // console.log('here is top artist ============ : ',topArtists)

  // items to be render
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

  //  Api call
  // top tracks
  useEffect(() => {
    fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=rj&api_key=ef402f25a2d3539f737919169192f846&format=json`
      // `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=${API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log("songs tracks ===============> ====================>  :: ", data.toptracks.track);
        setTopTracks(data.toptracks.track);
      })
      .catch((error) => console.error(error));
  }, []);

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
          <RecentlyPlayed data={topTracks} recently={"Recently Played"} />
          <RecentlyPlayed data={topTracks} imageStyle artist={"Artist"} />
          <RecentlyPlayed data={topTracks} mostPlayed={"Most Played"} />
        </>
      )}
      {selectedItemId == "2" && (
        <>
          <Songs data={topTracks} recently={"Songs"} />
        </>
      )}
      {selectedItemId == "3" && (
        <>
          <Songs
            text={"Date Added"}
            imageStyle={{ borderRadius: 50 }}
            recently={"85 Artist"}
          />
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
