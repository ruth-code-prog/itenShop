import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import FIREBASE from '../../../config/FIREBASE';
import {
  Tombol,
} from '../..';

const VideoPlayer = ({ link, visible, onClose }) => {
  const scrollRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  let listener;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video Selesai!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.container}>
        <YoutubePlayer
          height={Dimensions.get("screen").height / 4}
          play={playing}
          videoId={link}
          onChangeState={onStateChange}
        />

        <Tombol type="text3" title={playing ? "Pause" : "Putar Video"} onPress={togglePlaying}/>
        <TouchableOpacity
          onPress={() => {
            setPlaying(false);
            FIREBASE.database()
              .ref("video/" + link)
              .off("value", listener);
            onClose && onClose();
          }}
          style={styles.btnClose}
        >
          <Text style={styles.btnCloseText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#a4f9ef7F",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    height: Dimensions.get("screen").height / 3,
    backgroundColor: "#FFFFFF",
  },
  btnClose: {
    height: 46,
    borderRadius: 20,
    backgroundColor: "#F97B35",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  btnPlay: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#34D5B5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  btnCloseText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
  },
});