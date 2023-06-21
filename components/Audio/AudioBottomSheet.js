import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio, Permissions } from "expo-av";
import * as MailComposer from "expo-mail-composer";


export default function AudioBottomSheet() {
  const [recording, setRecording] = useState();
  const [uri, setUri] = useState();
  const [recordState, setRecordState] = useState("NOT_STARTED");
  const [pauseRecord, setPauseRecord] = useState(false);

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
    setUri(recording.getURI());
    setRecording(recording);
    console.log("Recording stopped and stored at", uri);
  };

  const discard = async () => {
    if (recording) {
      console.log(recording);
      setRecording(null);
      setRecordState("NOT_STARTED");
      console.log(recording);
      console.log("Recording discarded");
    }
  };

  const playRecordedVoice = async () => {
    console.log("Loading Sound");
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({ uri: uri });
      console.log("Playing Sound");
      await sound.playAsync();
    } catch (error) {
      console.error("Failed to load or play sound", error);
    }
  };

  const pauseRecordedVoice = async () => {
    if (recording) {
      try {
        await recording.pauseAsync();
        setPauseRecord(false);
      } catch (error) {
        console.error("Failed to pause recording", error);
      }
    }
  };


  const sendRecord = () => {
    MailComposer.composeAsync({
      recipients: ["pavithraos123@gmail.com"],
      attachments: [uri],
    });
  };

  if (recordState === "NOT_STARTED") {
    return <Button title="record" onPress={() => startRecording()} />;
  } else if (recordState === "STARTED") {
    return (
      <View>
        <Button
          title="stop"
          onPress={() => {
            stopRecording();
          }}
        />
      </View>
    );
  } else if (recordState === "STOPPED") {
    return (
      <View>
        <Button
          title="discard"
          onPress={() => {
            discard();
          }}
        />
        {pauseRecord ? (
          <Button title="pause" onPress={() => pauseRecordedVoice()} />
        ) : (
          <Button title="play" onPress={() => playRecordedVoice()} />
        )}
        <Button title="send" onPress={() => sendRecord()} />
      </View>
    );
  }
}
