/** @format */
/** @format */
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from "expo-av";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("window");

import Slider from "@react-native-community/slider";
import { Colors, headings } from "../../../constants";

class PlaylistItem {
  constructor(name, uri, image) {
    this.name = name;
    this.uri = uri;
    // this.image = image;
  }
}

const PLAYLIST = [
  new PlaylistItem(
    "Comfort Fit - “Sorry”",
    "https://sample-music.netlify.app/death%20bed.mp3"
  ),
  new PlaylistItem(
    "Mildred Bailey – “All Of Me”",
    "https://sample-music.netlify.app/Bad%20Liar.mp3"
  ),
  new PlaylistItem(
    "Hamlet - Act V",
    "https://sample-music.netlify.app/Faded.mp3"
  ),
  new PlaylistItem(
    "Hamlet - Act V",
    "https://sample-music.netlify.app/Solo.mp3"
  ),
  new PlaylistItem(
    "Hamlet - Act V",
    "https://sample-music.netlify.app/Hate%20Me.mp3"
  ),
];

// const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const LOADING_STRING = "Loading...";
const BUFFERING_STRING = "Buffering...";
const RATE_SCALE = 3.0;

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      playbackInstanceName: LOADING_STRING,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      volume: 1.0,
      rate: 1.0,
      portrait: null,
      showValumeBox: false,
      duration: "00:00:00",
      timeElapsed: "00:00:00",
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    (async () => {
      await Font.loadAsync({});
      this.setState({ fontLoaded: true });
    })();

    this._loadNewPlaybackInstance(false);
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = { uri: PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      volume: this.state.volume,
    };

    const { sound, status } = await Audio.Sound.create(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;

    this._updateScreenForLoading(false);
  }

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
        playbackInstanceName: PLAYLIST[this.index].name,
        portrait: PLAYLIST[this.index].image,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        volume: status.volume,
      });
      if (status.didJustFinish) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };
  handleVolumeBox = () => {
    this.setState({ showValumeBox: !this.state.showValumeBox });
  };

  _onVolumeSliderValueChange = (value) => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async (value) => {
    this._trySetRate(value * RATE_SCALE);
  };

  _onSeekSliderValueChange = () => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async (value) => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )}       ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  // _getTimestamp() {
  //   if (
  //     this.playbackInstance != null &&
  //     this.state.playbackInstancePosition != null &&
  //     this.state.playbackInstanceDuration != null
  //   ) {
  //     return `${this._getMMSSFromMillis(
  //       this.state.playbackInstancePosition
  //     )}
  //       ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
  //   }
  //   //   return "";
  // }

  _getTimeStart() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.playbackInstancePosition)}`;
    }
    return "";
  }
  _getTimeEnd() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  render() {
    return (
      <View style={{ backgroundColor: Colors.black, flex: 1 }}>
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
        <View style={styles.SliderArea}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Slider
              style={[styles.progressSlider]}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={Colors.yellow}
              maximumTrackTintColor={Colors.yellow}
              thumbStyle={{ width: 20, height: 20, borderRadius: 10 }}
              trackStyle={{ height: 10, borderRadius: 5 }}
              thumbTintColor={Colors.yellow}
              value={this._getSeekSliderPosition()}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              disabled={this.state.isLoading}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: wp("90%"),
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white" }}>{this._getTimeStart()}</Text>
            <Text style={{ color: "white" }}> {this._getTimeEnd()}</Text>
          </View>

          {/* <View style={styles.detailsContainer}>
            <View style={styles.songTime}>
              <Text style={[styles.text, { marginRight: 20 }]}>
                {this._getTimeStart()}
              </Text>
              <Text style={styles.text}>{this.state.playbackInstanceName}</Text>
              <Text style={[styles.text, { marginLeft: 20 }]}>
                {this._getTimeEnd()}
              </Text>
            </View>
          </View> */}

          {/* ............................Player.............. */}
          <View style={styles.playerContainer}>
            <View style={styles.playerButtons}>
              <TouchableOpacity>
                <View>
                  <AntDesign
                    name="stepbackward"
                    size={25}
                    color={Colors.white}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onBackPressed}>
                <View>
                  <AntDesign name="banckward" size={25} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onPlayPausePressed}>
                <View>
                  {this.state.isPlaying ? (
                    <AntDesign
                      name="pausecircleo"
                      size={40}
                      color={Colors.white}
                    />
                  ) : (
                    <AntDesign
                      name="playcircleo"
                      size={40}
                      color={Colors.yellow}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onForwardPressed}>
                <View>
                  <AntDesign name="forward" size={25} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <AntDesign
                    name="stepforward"
                    size={25}
                    color={Colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* ............................... */}
          <View style={[styles.playerContainer, { marginTop: 15 }]}>
            <View style={styles.playerButtons}>
              <TouchableOpacity>
                <View>
                  <SimpleLineIcons
                    name="speedometer"
                    size={25}
                    color={Colors.white}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onBackPressed}>
                <View>
                  <Fontisto name="stopwatch" size={25} color={Colors.white} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this._onForwardPressed}>
                <View>
                  <Foundation
                    name="mobile-signal"
                    size={25}
                    color={Colors.white}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View>
                  <SimpleLineIcons
                    name="options-vertical"
                    size={25}
                    color={Colors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* End Aracbic */}
          <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" ,marginTop:30}}>
            <FontAwesome name="angle-up" size={25}  color={Colors.white}/>
            <Text style={{ color: Colors.white, textAlign: "center" }}>
              Lyrics
            </Text>
          </TouchableOpacity>
          {/* ................. */}
        </View>
      </View>
    );
  }
}

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

  img: { width: wp("80%"), height: hp("45%"), borderRadius: 10 },
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
  songTime: {
    alignSelf: "center",
    height: "60%",
    flexDirection: "row",
  },
  progressSlider: { width: wp("100%"), height: hp("4%"), marginBottom: 2 },

  playerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp("85%"),
    alignSelf: "center",
  },
  playerContainer: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsContainer: {
    height: 30,
    alignSelf: "center",
    width: wp("70%"),
  },
  text: {
    fontSize: 15,
    minHeight: 15,
    alignSelf: "center",
    color: Colors.white,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#ffffff",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    color: "#ffffff",
    textTransform: "capitalize",
  },

  albumCover: {
    width: 250,
    height: 250,
  },
  trackInfo: {
    padding: 40,
    backgroundColor: "#fff",
  },
  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "#550088",
  },
  largeText: {
    fontSize: 22,
  },
  smallText: {
    fontSize: 16,
  },
  control: {
    margin: 20,
  },
  controls: {
    flexDirection: "row",
  },
});
