import GridBox from "../MainGrid/GridBox";
import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { notifyMessage } from "../../constants/NotificationUtils";

const SendDoc = ({ image }) => {
  const user = useSelector((state) => state.user.value);

  const sendMail = (uri) => {
    MailComposer.composeAsync({
      recipients: [user.isPrimary ? user.primaryEmail : user.secondaryEmail],
      attachments: [uri],
    });
  };

  const pickDocument = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({});

      if (document.type === "success") {
        sendMail(document.uri);
      }
    } catch (error) {
      const errorMessage = "Failed to send the mail" + error;
      notifyMessage(errorMessage);
    }
  };

  return (
    <TouchableOpacity style={{flex:1}} onPress={pickDocument}>
      <GridBox image={image} label={"File Upload"}></GridBox>
    </TouchableOpacity>
  );
};

export default SendDoc;
