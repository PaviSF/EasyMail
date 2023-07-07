import React from "react";
import { View, StyleSheet } from "react-native";

const CardView = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    padding: 16,
    paddingVertical: 30,
    margin: 16,
  },
});

export default CardView;
