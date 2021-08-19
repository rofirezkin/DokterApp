import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import ImagePicker from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { AddPhoto, RemovePhoto, TambahGambar } from "../../assets";
import { Button, Gap, Header } from "../../components";
import { Fire } from "../../config";
import fotoStatus from "./uploadphoto.png";
import {
  colors,
  getChatTime,
  getData,
  getDelay,
  getUidTime,
  setDateChat,
  setDateChatMessage,
  showError,
} from "../../utils";

const UpdateStatus = ({ navigation }) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");
  const [photoForDB, setPhotoForDB] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : NullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;

      setProfile(data);
    });
  }, []);

  const getImage = () => {
    ImagePicker.launchImageLibrary({ quality: 1 }, (response) => {
      if (response.didCancel || response.error) {
        showMessage({
          message: "opps, sepertinya anda tidak memilih fotonya?",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        const source = { uri: response.uri };
        setPhotoForDB(`data:${response.type};base64, ${response.data}`);

        setPhoto(source);
      }
    });
  };

  const uploadAndContinue = () => {
    if (title.length > 0 && description.length > 0 && photoForDB.length > 0) {
      dispatch({ type: "SET_LOADING", value: true });
      const today = new Date();
      const uidArtikel = `${getUidTime(today)}`;
      const dateArtikel = `${setDateChatMessage(today)}- ${getChatTime(today)}`;

      const formArtikel = {
        title: title,
        body: description,
        image: photoForDB,
        nama: profile.fullName,
        date: dateArtikel,
        uid: uidArtikel,
      };

      Fire.database()
        .ref("news/" + uidArtikel + "/")
        .update(formArtikel)
        .then((data) => {
          dispatch({ type: "SET_LOADING", value: false });
          navigation.replace("MainApp");
        });

      Fire.database()
        .ref(`doctors/${profile.uid}/artikel/${uidArtikel}`)
        .update(formArtikel);
    } else {
      return showMessage({
        message: "upss sepertinya anda kurang memasukan data",
        type: "default",
        backgroundColor: colors.error,
        color: colors.white,
      });
    }
  };

  return (
    <View style={styles.page1}>
      <Header title="Buat Artikel" onPress={() => navigation.goBack()} />

      <View style={styles.page}>
        <Gap height={30} />
        <View style={styles.container}>
          <View>
            <View style={styles.textAreaContainer}>
              <TextInput
                onChangeText={(value) => setTitle(value)}
                value={title}
                style={styles.judul}
                placeholder="Judul Artikel"
              />
              <Gap height={10} />
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Tulis Artikel Anda disini"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(value) => setDescription(value)}
                value={description}
              />
            </View>
            <Gap height={15} />
            <Text>Upload Thumbnail</Text>
            <Gap height={8} />
            <View>
              <TouchableOpacity
                onPress={getImage}
                style={styles.pembayaranBukti}
              >
                {photo === "" && (
                  <View>
                    <Image source={fotoStatus} style={styles.foto} />
                  </View>
                )}
                {photo !== "" && (
                  <View>
                    <Image source={photo} style={styles.bukti} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity onPress={getImage}>
              <View style={styles.tambahFoto}>
                <Text>Tambah Foto</Text>
                <Image source={photo} style={styles.avatar} />
              </View>
            </TouchableOpacity> */}
          </View>
          <Gap height={10} />
          <Button
            onPress={uploadAndContinue}
            title="Update Status"
            type="secondary"
            text="secondary"
          />
          <Gap height={10} />
        </View>
      </View>
    </View>
  );
};

export default UpdateStatus;

const styles = StyleSheet.create({
  page1: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    paddingHorizontal: 20,
  },
  pembayaranBukti: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3F3F3",
    padding: 20,
  },
  bukti: {
    width: 200,
    height: 200,
    borderRadius: 10,

    alignSelf: "center",
    alignItems: "center",
  },
  foto: {
    width: 71,
    height: 54,
  },

  textAreaContainer: {
    padding: 5,
  },

  textArea: {
    borderRadius: 8,
    height: 200,
    backgroundColor: "#F3F3F3",
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  container: {
    justifyContent: "space-between",
  },
  tambahFoto: {
    borderRadius: 10,
    padding: 4,
    backgroundColor: colors.border,
    alignSelf: "center",
    alignItems: "center",
  },
  judul: {
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    fontWeight: "bold",
    fontSize: 17,
  },
});
