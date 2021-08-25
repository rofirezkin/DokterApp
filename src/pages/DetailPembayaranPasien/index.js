import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Feedback, Gap, Header, RatedDoctor } from "../../components";
import { colors } from "../../utils";

const DetailPembayaranPasien = ({ route, navigation }) => {
  const data = route.params;
  const dataFilter = data.dataVerifikasi;
  const status = data.status;
  const dataMedical = data.dataMedical;
  //   const dataFilterVerifikasi = dataFilter.filter(
  //     (element) => element.data.status === "Belum dikonfirmasi"
  //   );

  //   const dataFilterSukses = dataFilter.filter(
  //     (element) => element.data.status === "sukses"
  //   );
  //   const dataFilterFeedback = dataFilter.filter(
  //     (element) => element.data.status === "feedback"
  //   );
  console.log("data", dataFilter);
  return (
    <View style={styles.pages}>
      <Header title={status} onPress={() => navigation.goBack()} />
      {status === "Belum dikonfirmasi" && (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 5 }}>
              <Gap height={20} />
              {dataFilter.map((res) => {
                const shortData = res.data.dataDokter;
                console.log("dataasohr", shortData.experience);
                return (
                  <View key={res.id}>
                    <View>
                      <Text style={styles.wait}>Menunggu Konfirmasi</Text>
                    </View>
                    <RatedDoctor
                      metodePembayaran={true}
                      name={shortData.fullName}
                      avatar={shortData.photo}
                      experienced={shortData.experience}
                      desc={shortData.category}
                      rate={shortData.rate.ratePersentasi}
                    />
                  </View>
                );
              })}
              <View>
                <Text style={styles.warning}>
                  Tunggu Konfirmasi Pembayaran 1x10 menit, jika tidak ada
                  konfirmasi pembayaran akan di refund
                </Text>
              </View>
              <Gap height={15} />
            </View>
          </ScrollView>
        </View>
      )}
      {status === "Pembayaran berhasil" && (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 5 }}>
              <Gap height={20} />

              {dataFilter.map((res) => {
                const shortData = res.data.dataDokter;
                const sendToChatting = {
                  data: res.data.dataDokter,
                  status: res.data.status,
                  uidDokter: res.data.uidDokter,
                  dataMedical: dataMedical,
                };

                return (
                  <View key={res.id}>
                    <View>
                      <Text style={styles.success}>Pembayaran Berhasil</Text>
                    </View>
                    <RatedDoctor
                      metodePembayaran={true}
                      name={shortData.fullName}
                      avatar={shortData.photo}
                      experienced={shortData.experience}
                      desc={shortData.category}
                      rate={shortData.rate.ratePersentasi}
                    />
                    <Gap height={10} />
                    <View>
                      <Button
                        title="Lakukan Konsultasi"
                        type="secondary"
                        text="secondary"
                        onPress={() =>
                          navigation.navigate("ChattingPasien", sendToChatting)
                        }
                      />
                    </View>
                    <Gap height={15} />
                  </View>
                );
              })}
            </View>
            <Gap height={70} />
          </ScrollView>
        </View>
      )}
      {status === "Feedback Dokter" && (
        <View style={styles.container}>
          <ScrollView>
            <View style={{ paddingHorizontal: 5 }}>
              {dataFilter.map((res) => {
                const shortData = res.data.dataDokter;
                return (
                  <View key={res.id}>
                    <Gap height={20} />
                    <View>
                      <Text style={styles.success}>Feedback Dokter</Text>
                    </View>
                    <RatedDoctor
                      metodePembayaran={true}
                      name={shortData.fullName}
                      avatar={shortData.photo}
                      experienced={shortData.experience}
                      desc={shortData.category}
                      rate={shortData.rate.ratePersentasi}
                    />
                    <View />
                    <Gap height={15} />
                    <Feedback
                      uidPasien={res.data.uidPasien}
                      navigation={navigation}
                      uidDokter={shortData.uid}
                      rate={shortData.rate}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DetailPembayaranPasien;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 18,
  },
  success: {
    color: "#2CB763",
    fontSize: 15,
  },
  wait: {
    color: colors.text.secondary,
  },
  warning: {
    color: colors.text.secondary,
  },
});
