import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconWelcome } from "../../assets";
import { Gap, ItemWelcome } from "../../components";
import { colors } from "../../utils";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={20} />
        <Text style={styles.titleHeader}>
          Selamat Datang di Aplikasi Adadokter
        </Text>
        <Text style={styles.desc}>
          Aplikasi yang membuat konsultasi anda dengan dokter menjadi lebih
          dekat
        </Text>
        <Gap height={20} />
        <View style={styles.boxHeader}>
          <IconWelcome />
        </View>
        <View style={styles.header} />
        <View style={styles.container}>
          <Gap height={40} />
          <View>
            <Text style={styles.titleHeader}>
              Fitur yang akan Membantu anda
            </Text>
            <Gap height={20} />
            <View style={styles.componentItem}>
              <ItemWelcome gambar="iconKoneksi" title="Koneksi Alat" />
              <ItemWelcome gambar="iconKonsul" title="Konsultasi" />
            </View>
            <Gap height={20} />
            <View style={styles.componentItem}>
              <ItemWelcome gambar="iconMonitor" title="Monitoring Data" />
              <ItemWelcome gambar="iconDokter" title="Pilih Dokter" />
            </View>
            <Gap height={20} />
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PanduanSingkat")}
                style={styles.buttonNext}
              >
                <Text style={styles.textNext}>Next</Text>
              </TouchableOpacity>
            </View>
            <Gap height={20} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  boxHeader: {
    alignSelf: "center",
  },
  titleHeader: {
    fontFamily: "Nunito-Bold",
    fontSize: 17,
    textAlign: "center",
  },
  buttonNext: {
    backgroundColor: colors.primary,
    marginHorizontal: 40,
    padding: 15,
    borderRadius: 15 / 2,
  },
  textNext: {
    color: colors.white,
    textAlign: "center",
  },
  desc: {
    fontFamily: "Nunito-SemiBold",
    textAlign: "center",
    fontSize: 14,
  },
  componentItem: {
    marginHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-end",
  },
});
