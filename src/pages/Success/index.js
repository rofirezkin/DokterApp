import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SuccessPhoto } from "../../assets/icons/profile";
import { Button, Gap } from "../../components";
import { colors, getData } from "../../utils";
const Success = ({ navigation, route }) => {
  const dataSuccess = route.params;

  const GotoBerhasil = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainAppPasien" }],
    });
  };
  return (
    <>
      {dataSuccess ? (
        <View style={styles.page}>
          {dataSuccess.data === "Anda Berhasil Mengirimkan Feedback" && (
            <View style={styles.container}>
              <View style={styles.succes}>
                <Image source={SuccessPhoto} style={styles.avatar} />
              </View>
              <View>
                <Gap height={25} />
                <Text style={styles.berhasil}>
                  Anda Berhasil Mengirimkan Feeback
                </Text>
                <Gap height={10} />

                <Gap height={25} />
                <Button
                  title="Kembali ke Dashboard"
                  type="secondary"
                  text="secondary"
                  onPress={GotoBerhasil}
                />
              </View>
            </View>
          )}
          {dataSuccess.data === "Anda Berhasil Melakukan Pembayaran" && (
            <View style={styles.container}>
              <View style={styles.succes}>
                <Image source={SuccessPhoto} style={styles.avatar} />
              </View>
              <View>
                <Gap height={25} />
                <Text style={styles.berhasil}>
                  Anda Berhasil Melakukan Pembayaran
                </Text>
                <Gap height={10} />
                <Text style={styles.admin}>
                  Admin Akan Konfirmasi Pesanan Konsultasi Anda dalam waktu 1x10
                  Menit
                </Text>
                <Text style={styles.admin}>
                  {"Lihat pesanan anda dengan klik Profile > Pembayaran"}
                </Text>
                <Gap height={25} />
                <Button
                  title="Kembali ke Dashboard"
                  type="secondary"
                  text="secondary"
                  onPress={GotoBerhasil}
                />
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.page}>
          <View style={styles.container}>
            <View style={styles.succes}>
              <Image source={SuccessPhoto} style={styles.avatar} />
            </View>
            <View>
              <Gap height={25} />
              <Text style={styles.berhasil}>
                Anda Telah Selesai Memberikan Konsultasi kepada Pasien
              </Text>
              <Gap height={10} />

              <Text style={styles.admin}>
                Ayo Lakukan Konsultasi selanjutnya dengan Pasien Yang
                membutuhkan Pertolongan anda
              </Text>
              <Gap height={25} />
              <Button
                title="Kembali ke Dashboard"
                type="secondary"
                text="secondary"
                onPress={GotoBerhasil}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Success;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 20,
  },
  succes: {
    alignSelf: "center",
    backgroundColor: "#D6F1F0",
    padding: 50,
    borderRadius: 150,
  },
  berhasil: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  admin: {
    textAlign: "center",
    color: colors.text.secondary,
    fontSize: 13,
  },
  avatar: {
    width: 193,
    height: 177,
  },
});
