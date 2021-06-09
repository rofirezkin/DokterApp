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
import {
  colors,
  getChatTime,
  getData,
  getUidTime,
  setDateChat,
  showError,
} from "../../utils";

const UpdateStatus = ({ navigation }) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(TambahGambar);
  const [photoForDB, setPhotoForDB] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getData("user").then((res) => {
      console.log("data untuk ddaSHBOAR ", res);
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;
      setProfile(res);
    });
  }, []);

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
        }
      }
    );
  };

  const uploadAndContinue = () => {
    console.log("photo For ", photoForDB);
    if (title.length > 0 && description.length > 0 && photoForDB.length > 0) {
      dispatch({ type: "SET_LOADING", value: true });
      const today = new Date();
      const uidArtikel = `${getUidTime(today)}`;
      console.log("datamasuk", description);
      const formArtikel = {
        title: title,
        body: description,
        image: photoForDB,
        nama: profile.fullName,
        date: uidArtikel,
      };

      console.log("data mau di kirim firebhase", formArtikel);
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
  console.log("dATA photo", photo);
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
            <TouchableOpacity onPress={getImage}>
              <View style={styles.tambahFoto}>
                <Text>Tambah Foto</Text>
                <Image source={photo} style={styles.avatar} />
              </View>
            </TouchableOpacity>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,

    alignSelf: "center",
    alignItems: "center",
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
