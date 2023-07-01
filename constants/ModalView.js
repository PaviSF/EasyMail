import { View, StyleSheet } from "react-native";
import AudioBottomSheet from "../components/Audio/AudioBottomSheet";
import TextPage from "../components/Text/TextPage";
import Profile from "../components/Profile/Profile";
import AudioTimer from "../components/Audio/AudioTimer";
import Modal from "react-native-modal";

const ModalView = ({ modalVisible, closeModal, whichFeature }) => {
  return (
    <Modal
      style={{ flex: 1, margin: 0 }}
      coverScreen={true}
      animationType="slide"
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.6}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => closeModal()}
    >
      <View style={styles.modalContainer}>
        {whichFeature === "TEXT_PAGE" ? <TextPage/> : whichFeature ==="AUDIO_PAGE" ? <AudioBottomSheet /> : <Profile/>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
  },
  bgContainer: {
    flex: 0.7,
  },
  modalContainer: {
    flex: 0.4,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#FFFFFF",
    paddingBottom: 25,
    position: "absolute",
    bottom: 0,
    height: 350,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default ModalView;
