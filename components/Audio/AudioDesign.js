import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "react-native";

export default function AudioDesign() {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={{ flex: 0.2, alignSelf: "center" }}>
        <TouchableOpacity onPress={() => console.log("hello")} style={styles.button}>
          <View style={styles.iconContainer}>
            <Button title="hello"></Button>
            <FontAwesome5 name="record-vinyl" size={80} color="#4284f5" />
            <Image source={require('../../assets/icons8-record-90.png')} style={styles.iconImage} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    marginLeft: 8, // Adjust the margin as needed
  },
});
