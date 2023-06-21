import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as MailComposer from "expo-mail-composer";

const sendMail = (uri) => {
  MailComposer.composeAsync({
    recipients: ["pavithraos123@gmail.com"],
    attachments: [uri],
  });
};

export default function SendPicture() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

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
    return <Text>Requesting permissions...</Text>;
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
      //setPhoto(undefined);
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View style={{ flex: 0.15, flexDirection: "row", justifyContent:"space-around" }}>
          {hasMediaLibraryPermission ? (
            <Pressable style={{flex:1}} onPress={savePhoto}>
              <Image
                style={styles.buttonSize}
                source={require("../../assets/diskette.png")}
              />
            </Pressable>
          ) : undefined}
          <Pressable style={{flex:1}} onPress={sharePic}>
          <Image
              style={styles.buttonSize}
              source={require("../../assets/send.png")}
            />
          </Pressable>
          <Pressable style={{flex:1}} onPress={() => setPhoto(undefined)}>
            <Image
              style={styles.buttonSize}
              source={require("../../assets/x-mark.png")}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.container} ref={cameraRef}></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePic}>
          <Image
            style={styles.buttonSize}
            source={require("../../assets/oval.png")}
          />
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
    color:'black'
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  buttonSize: {
    height: 60,
    width: 60,
  },
});
