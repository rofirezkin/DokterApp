import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, Gap, Header } from "../../components";
import { Fire } from "../../config";
import { colors, setDateChat } from "../../utils";
import { useDispatch } from "react-redux";
import ImagePicker from "react-native-image-picker";
import { NullPhoto } from "../../assets";
import fotoStatus from "./uploadphoto.png";

const ResepObat = ({ navigation, route }) => {
  const dataPengiriman = route.params;
  const dispatch = useDispatch();
  const [advice, setAdvice] = useState("");

  //photo
  const [photoForDB, setPhotoForDB] = useState("");
  const [photo, setPhoto] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  //add multiple input
  const [inputs, setInputs] = useState([{ key: "", value: "" }]);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: "", value: "" });
    setInputs(_inputs);
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key + 1;
    setInputs(_inputs);
  };

  // launch camera
  const getImage = () => {
    ImagePicker.launchImageLibrary({ quality: 1 }, (response) => {
      console.log("poto", response);
      if (response.didCancel || response.error) {
        showMessage({
          message: "opps, sepertinya anda tidak memilih fotonya?",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else if (response.type === "video/mp4") {
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
        setWidth(response.width);
        setHeight(response.height);
        setPhoto(source);
      }
    });
  };

  //kirim catatan
  const KirimResep = () => {
    const today = new Date();
    const chatID = `${dataPengiriman.uidPartner}_${dataPengiriman.uidUser}`;

    const urlFirebaseforUser = `chatting/${
      dataPengiriman.uidUser
    }/${chatID}/allChat/${setDateChat(today)}`;

    //for partner
    const urlFirebaseforPartner = `chatting/${
      dataPengiriman.uidPartner
    }/${chatID}/allChat/${setDateChat(today)}`;

    const kirimData = {
      dataCatatan: {
        resep: inputs,
        catatan: advice,
        photoResep: photoForDB,
        statement: "Lihat Resep Obat",
      },
      sendBy: dataPengiriman.uidUser,
    };
    const kirimPhoto = {
      dataCatatan: {
        photoResep: photoForDB,
        catatan: advice,
        statement: "Lihat Resep Obat",
      },
      sendBy: dataPengiriman.uidUser,
    };

    const coba = kirimData.dataCatatan.resep.filter((res) => res.value !== "");

    if (coba.length === kirimData.dataCatatan.resep.length) {
      dispatch({ type: "SET_LOADING", value: true });

      Fire.database()
        .ref(urlFirebaseforUser)
        .push(kirimData)
        .then(() => {
          Fire.database().ref(urlFirebaseforPartner).push(kirimData);
          Fire.database()
            .ref(`resepUser/${dataPengiriman.uidPartner}`)
            .push(kirimData);
          dispatch({ type: "SET_LOADING", value: false });
          navigation.goBack();
        })
        .catch((err) => {
          showError(err.message);
        });
    } else if (photoForDB !== "") {
      dispatch({ type: "SET_LOADING", value: true });
      Fire.database()
        .ref(urlFirebaseforUser)
        .push(kirimPhoto)
        .then(() => {
          Fire.database().ref(urlFirebaseforPartner).push(kirimPhoto);
          Fire.database()
            .ref(`resepUser/${dataPengiriman.uidPartner}`)
            .push(kirimPhoto);
          dispatch({ type: "SET_LOADING", value: false });
          navigation.goBack();
        })
        .catch((err) => {
          showError(err.message);
        });
    } else {
      showMessage({
        message: "anda kurang memasukan data",
        type: "default",
        backgroundColor: colors.error,
        color: colors.white,
      });
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Buat Resep Obat" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.titleCard}>
              <Text style={styles.titleText}>Resep Obat Digital</Text>
            </View>
            <View style={styles.bodyCard}>
              {inputs.map((input, key) => (
                <View key={key} style={styles.inputContainer}>
                  <TextInput
                    style={styles.inputForm}
                    placeholder={"Tulis Resep Obat"}
                    value={input.value}
                    onChangeText={(text) => inputHandler(text, key)}
                  />
                  <TouchableOpacity onPress={() => deleteHandler(key)}>
                    <Text style={{ color: "red", fontSize: 13 }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <Gap height={13} />

              <TouchableOpacity
                style={styles.buttonTambahResep}
                onPress={addHandler}
              >
                <Text style={styles.textTambahResep}>Tambah Resep Obat</Text>
              </TouchableOpacity>
              <Gap height={13} />
              <View>
                <Text>Catatan Untuk Resep Obat</Text>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="opsional"
                  placeholderTextColor="grey"
                  numberOfLines={4}
                  multiline={true}
                  onChangeText={(value) => setAdvice(value)}
                  value={advice}
                />
              </View>
            </View>
          </View>
          <Gap height={15} />
          <Text>Opsional Resep Obat dengan Foto</Text>
          <View>
            <TouchableOpacity onPress={getImage} style={styles.pembayaranBukti}>
              {photo === "" && (
                <View>
                  <Image source={fotoStatus} style={styles.foto} />
                </View>
              )}
              {photo !== "" && (
                <View>
                  <Image source={photo} style={styles.bukti(width, height)} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Gap height={15} />
          <Button
            type="secondary"
            text="secondary"
            title="Kirim kepada pasien"
            onPress={KirimResep}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ResepObat;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    margin: 18,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  titleCard: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 13,
  },
  bodyCard: {
    margin: 13,
  },
  inputsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    width: "100%",
  },
  inputForm: {
    maxWidth: "75%",
  },
  buttonTambahResep: {
    paddingVertical: 10,
    width: "100%",
    backgroundColor: "#6495ED",
    borderRadius: 8,
    alignSelf: "center",
  },
  textTambahResep: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  textArea: {
    borderRadius: 4,
    backgroundColor: "#F3F3F3",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    height: 100,
  },

  //styles photo

  pembayaranBukti: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3F3F3",
    padding: 20,
  },
  bukti: (width, height) => ({
    width: 300,
    height: 350,
    resizeMode: "contain",

    borderRadius: 10,

    alignSelf: "center",
    alignItems: "center",
  }),
  foto: {
    width: 71,
    height: 54,
  },
});
