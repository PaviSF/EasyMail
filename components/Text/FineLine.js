import React from "react";
import { View, StyleSheet } from "react-native";

const FineLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    width:'95%',
    height: 0.3,
    backgroundColor: "grey",
    marginBottom: 20, 
  },
});

export default FineLine;