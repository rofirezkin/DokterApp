import React, { useEffect, useState } from "react";
import ImagePicker from "react-native-image-picker";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";

import { Button, Gap, Header, Input, RatedDoctor } from "../../components";
import { colors, getData } from "../../utils";
import { showMessage } from "react-native-flash-message";
import { Fire } from "../../config";
import fotoStatus from "./uploadphoto.png";

const Pembayaran = ({ navigation, route }) => {
  const allData = route.params;
  const detailDoctor = allData.data;

  const [showWarning, SetshowWarning] = useState(false);
  const [pembayaran, setPembayaran] = useState({
    namaPengirim: "",
    totalPembayaran: "15.000",
    namaBank: "",
    noRekening: "",
    tanggalBayar: "",
    uidDokter: detailDoctor.data.uid,
    buktiPembayaran: "",
    uidPasien: "",
    status: "Belum dikonfirmasi",
  });

  const [photo, setPhoto] = useState("");
  const [photoForDB, setPhotoForDB] = useState("");
  const [user, setUser] = useState({});

  //modals

  //end modals
  useEffect(() => {
    getData("user").then((res) => {
      setUser(res);
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
      } else if (response.type === "video/mp4") {
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

  const changeText = (key, value) => {
    setPembayaran({
      ...pembayaran,
      [key]: value,
    });
  };

  const kirimPembayaran = () => {
    const data = pembayaran;
    data.buktiPembayaran = photoForDB;
    data.uidPasien = user.uid;

    const sendToAdmin = {
      status: data.status,
      uidDokter: data.uidDokter,
      dataDokter: {
        fullName: detailDoctor.data.fullName,
        photo: detailDoctor.data.photo,
        experience: detailDoctor.data.pengalaman,
        category: detailDoctor.data.category,
        rate: detailDoctor.data.rate,
        uid: detailDoctor.data.uid,
      },
      uidPasien: user.uid,
    };
    if (
      data.buktiPembayaran !== "" &&
      data.namaBank !== "" &&
      data.namaPengirim !== "" &&
      data.tanggalBayar !== "" &&
      data.noRekening !== ""
    ) {
      Fire.database()
        .ref(`verifikasi/${data.uidDokter}_${user.uid}/`)
        .set(data);
      Fire.database()
        .ref(`users/${user.uid}/statusKonsultasi/${data.uidDokter}/`)
        .set(sendToAdmin);
      const kirimDataSuccess = {
        data: "Anda Berhasil Melakukan Pembayaran",
      };
      navigation.reset({
        index: 0,
        routes: [{ name: "Success", params: kirimDataSuccess }],
      });
    } else {
      showMessage({
        message: "sepertinya ada data yang tidak diinputkan",
        type: "default",
        backgroundColor: colors.error,
        color: colors.white,
      });
      SetshowWarning(false);
    }
  };
  return (
    <View style={styles.pages}>
      <Header onPress={() => navigation.goBack()} title="Pembayaran" />

      <ScrollView>
        <View style={styles.container}>
          <Gap height={30} />
          <View style={styles.detail}>
            <RatedDoctor
              metodePembayaran={true}
              name={detailDoctor.data.fullName}
              avatar={detailDoctor.data.photo}
              experience={detailDoctor.data.pengalaman}
              desc={detailDoctor.data.category}
              rate={detailDoctor.data.rate}
            />
          </View>
          <Gap height={20} />
          <View>
            <View>
              <Text style={styles.label}>Total Pembayaran</Text>
              <Text style={styles.highlight}>Rp15.000</Text>
            </View>
            <Gap height={15} />
            <View>
              <Text style={styles.label}>Transfer ke : </Text>
              <Text style={styles.highlight}>798787878788</Text>
            </View>
            <Gap height={15} />

            <View>
              <Text style={styles.labelBold}>Konfirmasi Pembayaran</Text>
              <Gap height={15} />
              <Text style={styles.label}>Rekening Tujuan : BNI</Text>
            </View>
            <Gap height={15} />
            <Text style={styles.label}>Rekening Pengirim</Text>
            <View style={styles.rekening}>
              <TextInput
                style={styles.input}
                placeholder="Nama Bank"
                value={pembayaran.namaBank}
                onChangeText={(value) => changeText("namaBank", value)}
              />

              <TextInput
                value={pembayaran.noRekening}
                onChangeText={(value) => changeText("noRekening", value)}
                style={styles.inputNo}
                placeholder="No. Rekening"
              />
            </View>
            <Gap height={15} />
            <Input
              value={pembayaran.namaPengirim}
              onChangeText={(value) => changeText("namaPengirim", value)}
              placeholder="Nama"
              label="Nama Pengirim (sesuai di Rekening)"
            />
            <Gap height={15} />
            <Input
              value={pembayaran.tanggalBayar}
              onChangeText={(value) => changeText("tanggalBayar", value)}
              label="Tanggal Bayar "
              placeholder="misal : 12-03-2021"
            />
            <Gap height={15} />
            <View>
              <Text style={styles.label}>Upload Bukti Pembayaran</Text>
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
            <Gap height={15} />
            <Button
              title="Kirim Bukti Pembayaran"
              text="secondary"
              type="secondary"
              onPress={kirimPembayaran}
            />
            <Gap height={15} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Pembayaran;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 18,
  },
  highlight: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  pembayaranBukti: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3F3F3",
    padding: 20,
  },
  rekening: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bukti: {
    width: 300,
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
    alignSelf: "center",
    alignItems: "center",
  },
  input: {
    width: "30%",
    backgroundColor: "#F3F3F3",
    borderRadius: 7,
  },
  label: { fontSize: 16, color: "#7D8797", marginBottom: 6 },
  inputNo: {
    backgroundColor: "#F3F3F3",
    width: "60%",
    borderRadius: 7,
  },
  labelBold: { fontSize: 18, color: colors.text.default },
  //datamodals
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",

    borderRadius: 10,
  },
  warning_title: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E494",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  warning_body: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  warning_button: {
    backgroundColor: colors.primary,
    width: 100,
    borderRadius: 10,
  },
  text: {
    color: "#000000",
    fontSize: 13,
    margin: 10,
    textAlign: "center",
  },
  foto: {
    width: 71,
    height: 54,
  },
  textModals: {
    color: colors.white,
    fontSize: 13,
    margin: 10,
    textAlign: "center",
  },
  button: {
    width: 150,
    height: 50,
    alignItems: "center",
  },
  modalsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
