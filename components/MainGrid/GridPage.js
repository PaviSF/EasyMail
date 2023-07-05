import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, BackHandler, Alert } from "react-native";
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

  useEffect(() => {
    const backAction = () => {
      // Check if the current route is GridPage
      if (navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const openModal = (text) => {
    setModalVisible(true);
    setWhichFeature(text);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
    </View>
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
