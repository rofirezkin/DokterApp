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
import { NullPhoto } from "../../assets";

import { Button, Gap, Header } from "../../components";
import { Fire } from "../../config";

import { colors, getData } from "../../utils";

const EditArtikel = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const editData = route.params;
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState({});

  const [artikel, setArtikel] = useState({
    title: "",
    body: "",
    photoForDB: editData.artikelData.image,
  });

  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : NullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;

      setProfile(data);
    });
    setArtikel(editData.artikelData);
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
        setArtikel({
          ...artikel,
          image: `data:${response.type};base64, ${response.data}`,
        });
        setPhoto(source);
      }
    });
  };

  const editDataArtikel = () => {
    const data = artikel;

    dispatch({ type: "SET_LOADING", value: true });
    const today = new Date();

    Fire.database()
      .ref("news/" + data.uid + "/")
      .update(data)
      .then((data) => {
        dispatch({ type: "SET_LOADING", value: false });
        navigation.replace("MainApp");
      });

    Fire.database()
      .ref(`doctors/${profile.uid}/artikel/${data.uid}/`)
      .update(data);
  };

  const changeText = (key, value) => {
    setArtikel({
      ...artikel,
      [key]: value,
    });
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
                onChangeText={(value) => changeText("title", value)}
                value={artikel.title}
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
                onChangeText={(value) => changeText("body", value)}
                value={artikel.body}
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
                <View>
                  <Image source={{ uri: artikel.image }} style={styles.bukti} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Gap height={10} />
          <Button
            onPress={editDataArtikel}
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

export default EditArtikel;

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
