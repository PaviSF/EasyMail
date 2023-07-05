import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { Audio } from "expo-av";
import * as MailComposer from "expo-mail-composer";
import { useSelector } from "react-redux";
import {
  AntDesign,
  Feather,
  Foundation,
  FontAwesome,
} from "@expo/vector-icons";
import { notifyMessage } from "../../constants/NotificationUtils";
import ModalViewAlignment from "../../constants/ModalViewAlignment";

export default function AudioBottomSheet() {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [recordState, setRecordState] = useState("NOT_STARTED");
  const [pauseRecord, setPauseRecord] = useState("PAUSE");

  const user = useSelector((state) => state.user.value);

  const buttonSize = 80;
  const buttonColor = "#4284f5";

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setRecordState("STARTED");
    } catch (error) {
      const errorMessage = "Failed to record sound" + error;
      notifyMessage(errorMessage);    }
  };

  const stopRecording = async () => {
    setPauseRecord("PAUSE");
    setRecordState("STOPPED");
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setRecording(recording);
  };

  const discard = async () => {
    if (recording) {
      setRecording(undefined);
      setSound(undefined);
      setRecordState("NOT_STARTED");
    }
  };

  const loadAndPlayRecordedVoice = async () => {
    if (!sound) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync({ uri: recording.getURI() });
        playRecordedVoice(sound);
      } catch (error) {
        const errorMessage = "Failed to load sound" + error;
        notifyMessage(errorMessage);
      }
    } else {
      playRecordedVoice(sound);
    }
  };

  const playRecordedVoice = async (audio) => {
    setPauseRecord("PLAY");

    audio.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        // Audio playback has finished
        setPauseRecord("PAUSE");
        setSound(null); // Reset the sound object
      }
    });

    await audio.playAsync();
    setSound(audio);
  };

  const pauseRecordedVoice = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
        setSound(sound);
        setPauseRecord("PAUSE");
      } catch (error) {
        const errorMessage = "Failed to pause sound" + error;
        notifyMessage(errorMessage);
      }
    }
  };

  const sendRecord = () => {
    MailComposer.composeAsync({
      recipients: [user.isPrimary ? user.primaryEmail : user.secondaryEmail],
      attachments: [recording.getURI()],
    });
  };

  if (recordState === "NOT_STARTED") {
    return (
      <ModalViewAlignment recordState={recordState}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => startRecording()}
        >
          <Foundation
            name="record"
            size={buttonSize + 17}
            color={buttonColor}
          />
        </TouchableOpacity>
      </ModalViewAlignment>
    );
  } else if (recordState === "STARTED") {
    return (
      <ModalViewAlignment recordState={recordState}>
        <TouchableOpacity style={styles.button} onPress={() => stopRecording()}>
          <FontAwesome
            name="stop-circle"
            size={buttonSize + 8}
            color={buttonColor}
          />
        </TouchableOpacity>
      </ModalViewAlignment>
    );
  } else if (recordState === "STOPPED") {
    return (
      <ModalViewAlignment recordState={pauseRecord} sound={sound}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              discard();
            }}
          >
            <AntDesign
              name="delete"
              size={buttonSize - 35}
              color={buttonColor}
            />
          </TouchableOpacity>
          {pauseRecord === "PLAY" ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => pauseRecordedVoice()}
            >
              <AntDesign
                name="pausecircle"
                size={buttonSize}
                color={buttonColor}
              />
            </TouchableOpacity>
          ) : pauseRecord === "PAUSE" ? (
            <TouchableOpacity
              style={[styles.button, styles.centerButton]}
              onPress={() => loadAndPlayRecordedVoice()}
            >
              <AntDesign name="play" size={buttonSize} color={buttonColor} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={() => sendRecord()}>
            <Feather name="send" size={buttonSize - 35} color={buttonColor} />
          </TouchableOpacity>
        </View>
      </ModalViewAlignment>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    marginHorizontal: 30,
  },
  centerButton: {},
});
