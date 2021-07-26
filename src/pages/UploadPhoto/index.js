import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import { AddPhoto, NullPhoto, RemovePhoto } from "../../assets";
import { Button, Gap, Header, Link } from "../../components";
import { colors, storeData } from "../../utils";
import { showMessage } from "react-native-flash-message";
import { Fire } from "../../config";

const UploadPhoto = ({ navigation, route }) => {
  const { fullName, category, uid } = route.params;
  const [photoForDB, setPhotoForDB] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(NullPhoto);

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      { quality: 0.5, maxWidth: 200, maxHeight: 200 },
      (response) => {
        console.log("poto", response);
        if (response.didCancel || response.error) {
          showMessage({
            message: "opps, sepertinya anda tidak memilih fotonya?",
            type: "default",
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          console.log("response getImage", response);
          const source = { uri: response.uri };
          setPhotoForDB(`data:${response.type};base64, ${response.data}`);

          setPhoto(source);
          setHasPhoto(true);
        }
      }
    );
  };
  const uploadAndContinue = () => {
    Fire.database()
      .ref("doctors/" + uid + "/")
      .update({ photo: photoForDB });

    const data = route.params;
    data.photo = photoForDB;

    storeData("user", data);
    navigation.reset({
      index: 0,
      routes: [{ name: "SelamatDatang" }],
    });
  };
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <Image source={RemovePhoto} style={styles.AddPhoto} />}
            {!hasPhoto && <Image source={AddPhoto} style={styles.AddPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{category}</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            text="secondary"
            type="secondary"
            title="Upload and Continue"
            onPress={uploadAndContinue}
          />
          <Gap height={30} />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 60,
    flex: 1,
    justifyContent: "space-between",
  },
  profile: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  AddPhoto: { position: "absolute", bottom: 8, right: 6 },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  profession: {
    fontSize: 18,
    textAlign: "center",
    color: colors.text.secondary,
  },
});
