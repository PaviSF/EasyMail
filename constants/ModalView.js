import { Modal, View, StyleSheet } from "react-native";
import AudioBottomSheet from "../components/Audio/AudioBottomSheet";

const ModalView = ({ modalVisible, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.bgLayout}>
        <View style={styles.bgContainer} />
        <View style={styles.modalContainer}>
          <AudioBottomSheet />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bgLayout: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 30,
  },
  bgContainer: {
    flex: 0.7,
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
    // Translucent background color
  },
  modalContainer: {
    flex: 0.4,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
  },
});

export default ModalView;
