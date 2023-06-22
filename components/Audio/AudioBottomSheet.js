import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as MailComposer from "expo-mail-composer";
import { AntDesign, Feather, Foundation } from "@expo/vector-icons";
import ModalViewAlignment from "../../constants/ModalViewAlignment";

export default function AudioBottomSheet() {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [recordState, setRecordState] = useState("NOT_STARTED");
  const [pauseRecord, setPauseRecord] = useState(false);

  const buttonSize = 80;

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setRecordState("STARTED");
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    setPauseRecord(false);
    setRecordState("STOPPED");
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    setRecording(recording);
    console.log("Recording stopped and stored at", recording.getURI());
  };

  const discard = async () => {
    if (recording) {
      setRecording(undefined);
      setSound(undefined);
      console.log(recording);
      setRecordState("NOT_STARTED");
      console.log("Recording discarded");
    }
  };

  const loadAndPlayRecordedVoice = async () => {
    if (!sound) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync({ uri: recording.getURI() });
        console.log("Loading Sound");
        playRecordedVoice(sound);
        console.log(sound);
      } catch (error) {
        console.error("Failed to load sound", error);
      }
    } else {
      playRecordedVoice(sound);
      console.log(sound);
    }
  };

  const playRecordedVoice = async (audio) => {
    await audio.playAsync();
    setPauseRecord(true);
    setSound(audio);
  };

  const pauseRecordedVoice = async () => {
    if (sound) {
      try {
        await sound.pauseAsync();
        setSound(sound);
        setPauseRecord(false);
      } catch (error) {
        console.error("Failed to pause recording", error);
      }
    }
  };

  const sendRecord = () => {
    MailComposer.composeAsync({
      recipients: ["pavithraos123@gmail.com"],
      attachments: [recording.getURI()],
    });
  };

  if (recordState === "NOT_STARTED") {
    return (
      <ModalViewAlignment>
        <TouchableOpacity
          style={styles.button}
          onPress={() => startRecording()}
        >
          <Foundation name="record" size={buttonSize + 17} color="black" />
        </TouchableOpacity>
      </ModalViewAlignment>
    );
  } else if (recordState === "STARTED") {
    return (
      <ModalViewAlignment>
        <TouchableOpacity style={styles.button} onPress={() => stopRecording()}>
          <Feather name="stop-circle" size={buttonSize + 8} color="black" />
        </TouchableOpacity>
      </ModalViewAlignment>
    );
  } else if (recordState === "STOPPED") {
    return (
      <ModalViewAlignment>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              discard();
            }}
          >
            <AntDesign name="delete" size={buttonSize - 35} color="black" />
          </TouchableOpacity>
          {pauseRecord ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => pauseRecordedVoice()}
            >
              <AntDesign name="pausecircle" size={buttonSize} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => loadAndPlayRecordedVoice()}
            >
              <AntDesign name="play" size={buttonSize} color="black" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => sendRecord()}>
            <Feather name="send" size={buttonSize - 35} color="black" />
          </TouchableOpacity>
        </View>
      </ModalViewAlignment>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: "blue",
  },
  bottom: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  button: {
    marginHorizontal: 30,
  },
});
