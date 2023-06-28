import { View, StyleSheet } from "react-native";
import AudioTimer from "../components/Audio/AudioTimer";

const ModalViewAlignment = ({ children, recordState }) => {
  return (
    <>
      <View style={styles.top} />
      <View style={styles.bottom}>
        <AudioTimer recordState={recordState}></AudioTimer>
        <View>{children}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
  },
  bottom: {
    flex: 0.4,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default ModalViewAlignment;
