import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import GridBox from "./GridBox";
import SendDoc from "../SendDocs/SendDoc";
import { StatusBar } from "expo-status-bar";
import ModalView from "../../constants/ModalView";

const sendTextImage = require("../../assets/chat.png");
const sendAudioImage = require("../../assets/microphone.png");
const sendDocumentImage = require("../../assets/folder.png");
const sendPhotoImage = require("../../assets/diaphragm.png");

const GridPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [whichFeature, setWhichFeature] = useState();

  const openModal = (text) => {
    setModalVisible(true);
    setWhichFeature(text);
    console.log(whichFeature);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => openModal("TEXT_PAGE")}
        >
          <GridBox image={sendTextImage} label={"Text"}></GridBox>
        </TouchableOpacity>
        <View style={styles.plusColumn} />
        <View style={styles.row}>
          <SendDoc image={sendDocumentImage} />
        </View>
      </View>

      <View style={styles.plusRow} />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("SendPicture")}
        >
          <GridBox image={sendPhotoImage} label={"Camera"}></GridBox>
        </TouchableOpacity>
        <View style={styles.plusColumn} />

        <TouchableOpacity
          style={styles.row}
          onPress={() => openModal("AUDIO_PAGE")}
        >
          <GridBox image={sendAudioImage} label={"Audio"}></GridBox>
        </TouchableOpacity>
      </View>
      <ModalView
        modalVisible={modalVisible}
        closeModal={closeModal}
        whichFeature={whichFeature}
      />
      <StatusBar style="inverted"></StatusBar>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    backgroundColor: "#fff",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  plusRow: {
    height: StyleSheet.hairlineWidth * 20,
    backgroundColor: "#f6f7f6",
    alignSelf: "stretch",
  },
  plusColumn: {
    width: StyleSheet.hairlineWidth * 20,
    backgroundColor: "#f6f7f6",
    alignSelf: "stretch",
    marginHorizontal: 0,
  },
});

export default GridPage;
