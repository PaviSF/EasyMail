import GridBox from "../MainGrid/GridBox";
import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";
import { TouchableOpacity } from "react-native";

const sendMail = (uri) => {
  MailComposer.composeAsync({
    recipients: ["pavithraos123@gmail.com"],
    attachments: [uri],
  });
};

const SendDoc = ({ image }) => {
  const pickDocument = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({});

      if (document.type === "success") {
        sendMail(document.uri);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <TouchableOpacity onPress={pickDocument}>
      <GridBox image={image} label={"File Upload"}></GridBox>
    </TouchableOpacity>
  );
};

export default SendDoc;
