import { Modal, View, StyleSheet } from "react-native";
import AudioBottomSheet from "../components/Audio/AudioBottomSheet";

const ModalView = ({ modalVisible, closeModal }) => {
  return (
    <Modal
      style={styles.extra}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.extra}>
        <View style={styles.bgContainer} />
        <View style={styles.modalContainer}>
          <AudioBottomSheet />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  extra: {
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
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
    
    flex: 0.4,
  },
});

export default ModalView;
