import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";


export default function GridBox({ image, label }) {
  return (
    
    <View style={styles.component}>
      <Image source={image} style={styles.image} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    flexGrow:1
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
    tintColor: "#4284f5",
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});
