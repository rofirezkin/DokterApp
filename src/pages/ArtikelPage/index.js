import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { News3 } from "../../assets";
import { Gap, Header } from "../../components";
import { Fire } from "../../config";
import { colors, getData, showSuccess } from "../../utils";

const ArtikelPage = ({ route, navigation }) => {
  const [profile, setProfile] = useState({});
  const allData = route.params;
  const dataArtikel = allData.dataArtikel;
  const editable = allData.edit;

  const edit = () => {
    const data = {
      artikelData: dataArtikel,
      editData: editable,
    };
    navigation.navigate("EditArtikel", data);
  };

  useEffect(() => {
    getData("user").then((res) => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : NullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;

      setProfile(data);
    });
  }, []);

  const deleteArtikel = () => {
    Fire.database()
      .ref(`doctors/${profile.uid}/artikel/${dataArtikel.uid}`)
      .remove();
    Fire.database().ref(`news/${dataArtikel.uid}`).remove();
    showMessage({
      message: "Penghapusan Berhasil",
      type: "default",
      backgroundColor: "#27DE3A",
      color: colors.white,
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "MainApp" }],
    });
  };
  return (
    <View style={styles.page}>
      <ScrollView>
        <Header title="Artikel" onPress={() => navigation.goBack()} />

        <View style={styles.container}>
          <Text style={styles.title}>{dataArtikel.title}</Text>
          <Text style={styles.penulis}>{`Penulis ${dataArtikel.nama}`}</Text>
          <Text style={styles.date}>{`Publish : ${dataArtikel.date}`}</Text>
          <Image source={{ uri: dataArtikel.image }} style={styles.gambar} />
          <View>
            <Text style={styles.desc}>{dataArtikel.body}</Text>
          </View>

          <View>
            {editable && (
              <View style={styles.componentEdit}>
                <TouchableOpacity
                  onPress={deleteArtikel}
                  style={styles.buttonEditHapus}
                >
                  <Text style={styles.editText}>Hapus</Text>
                </TouchableOpacity>
                <Gap width={7} />
                <TouchableOpacity onPress={edit} style={styles.buttonEdit}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ArtikelPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 30,
    color: colors.text.default,
  },
  penulis: {
    marginTop: 10,
    color: "#799291",
  },
  date: {
    marginVertical: 4,
    color: "#799291",
  },
  desc: {
    color: "#799291",
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  gambar: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    resizeMode: "contain",
  },
  componentEdit: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  buttonEdit: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    alignSelf: "flex-end",
    borderRadius: 8,
  },
  buttonEditHapus: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.error,
    alignSelf: "flex-end",
    borderRadius: 8,
  },
  editText: {
    color: "white",
  },
});
