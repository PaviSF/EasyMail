import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as MailComposer from "expo-mail-composer";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function SendPicture() {
  let cameraRef = useRef();
  const user = useSelector((state) => state.user.value);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  const sendMail = (uri) => {
    MailComposer.composeAsync({
      recipients: [user.isPrimary ? user.primaryEmail : user.secondaryEmail],
      attachments: [uri],
    });
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text></Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = async () => {
      sendMail(photo.uri);
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        notifyMessage("Photo saved");
      });
    };

    let discardPhoto = () => {
      setPhoto(undefined);
      notifyMessage("Photo discarded");
    };

    function notifyMessage(msg) {
      if (Platform.OS === "android") {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      } else {
        AlertIOS.alert(msg);
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View
          style={{
            flex: 0.15,
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "black",
            paddingTop: 30,
            paddingLeft: 50,
          }}
        >
          {hasMediaLibraryPermission ? (
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={savePhoto}>
                <Ionicons name="save" size={50} color="white" />
              </TouchableOpacity>
            </View>
          ) : undefined}
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={sharePic}>
              <FontAwesome name="send" size={50} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => discardPhoto()}>
              <AntDesign name="delete" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Camera style={styles.container} ref={cameraRef}></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePic}>
          <Ionicons name="radio-button-on" size={80} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 30,
    alignSelf: "center",
    color: "black",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  buttonSize: {},
});
