import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { Header, Gap, ListPembayaran } from "../../components";
import { Fire } from "../../config";

const DetailPembayaranAdmin = ({ route, navigation }) => {
  const dataPembayaran = route.params;
  const uidUser = dataPembayaran.uidPasien;
  const uidDoctor = dataPembayaran.uidDokter;

  const dataCek = dataPembayaran.dataSemua;

  const [dataPasien, setDataPasien] = useState({});
  const [dataDokterResult, setDataDokterResult] = useState({});

  useEffect(() => {
    let unmounted = false;
    Fire.database()
      .ref(`users/${uidUser}/`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (!unmounted) {
            setDataPasien(data);
          }
        }
      });
    Fire.database()
      .ref(`doctors/${uidDoctor}/`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (!unmounted) {
            setDataDokterResult(data);
          }
        }
      });
  }, [uidUser, uidDoctor]);

  const SendVerifikasi = () => {
    const konfirmasi = {
      status: "sukses",
    };
    const kirimDataSuccess = {
      data: "Anda Berhasil Konfirmasi Pembayaran",
    };

    Fire.database()
      .ref(`users/${dataCek.uidPasien}/statusKonsultasi/${dataCek.uidDokter}/`)
      .update(konfirmasi)
      .then((data) => {
        Fire.database()
          .ref(`verifikasi/${dataCek.uidDokter}_${dataCek.uidPasien}`)
          .update(konfirmasi);
        navigation.reset({
          index: 0,
          routes: [{ name: "Success", params: kirimDataSuccess }],
        });
      })
      .catch((err) => {});
  };

  return (
    <View style={styles.page}>
      <Header
        text="Dokter yang di pesan pasien"
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Gap height={15} />

          <ListPembayaran data={dataPasien} />
          <Text style={styles.textKonsul}>ingin berkonsultasi dengan</Text>
          <View>
            <Gap height={15} />
            <View>
              <ListPembayaran data={dataDokterResult} />
            </View>
            <Text
              style={styles.label}
            >{`Nama Pengirim  : ${dataCek.namaPengirim}`}</Text>
            <Text
              style={styles.label}
            >{`Nama Bank Pengirim : ${dataCek.namaBank}`}</Text>
            <Text
              style={styles.label}
            >{`Nama Rek. Pengirim : ${dataCek.noRekening}`}</Text>
            <Text
              style={styles.label}
            >{`Total Pembayaran : ${dataCek.totalPembayaran}`}</Text>
            <Text
              style={styles.label}
            >{`Status Konfirmasi : ${dataCek.status}`}</Text>
            <Gap height={20} />
            <Text style={styles.label}>Bukti Pengiriman</Text>

            <Image
              source={{ uri: dataCek.buktiPembayaran }}
              style={styles.avatar}
            />
            <Gap height={20} />
            <View>
              <TouchableOpacity onPress={SendVerifikasi} style={styles.Button}>
                <Text style={styles.textButton}>Konfirmasi Pembayaran</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Gap height={20} />
      </ScrollView>
    </View>
  );
};

export default DetailPembayaranAdmin;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  textKonsul: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    color: "#808080",
    marginVertical: 13,
  },
  avatar: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    marginRight: 12,
  },
  Button: {
    paddingVertical: 15,
    width: "100%",
    backgroundColor: "#33B9B2",
    borderRadius: 8,
    alignSelf: "center",
  },
  textButton: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  label: { fontSize: 16, color: "#7D8797", marginBottom: 6 },
});
