import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { News3 } from "../../assets";
import { Header } from "../../components";
import { colors } from "../../utils";

const index = ({ route, navigation }) => {
  const dataArtikel = route.params;
  console.log("data artikel page", dataArtikel);
  return (
    <View style={styles.page}>
      <ScrollView>
        <Header title="Artikel" onPress={() => navigation.goBack()} />

        <View style={styles.container}>
          <Text style={styles.title}>
            Tempat Belajar Sudah Tidak Daring Lagi
          </Text>
          <Text style={styles.penulis}>Penulis : Dr. Subhan</Text>
          <Text style={styles.date}>publish : 2021-02-02</Text>
          <Image source={News3} style={styles.gambar} />
          <View>
            <Text style={styles.desc}>
              Tangerang (ANTARA) - Kebakaran terjadi di sebuah toko bahan
              bangunan yang berada di Jalan Raya Serang-Balaraja, Desa Cangkudu,
              Kecamatan Balaraja, Kabupaten Tangerang, Banten Selasa malam
              menghanguskan beberapa barang-barang yang ada di dalamnya termasuk
              enam unit mobil. Willy (26), salah satu karyawan toko bahan
              bangunan, di Tangerang menjelaskan, bahwa awal mula kebakaran
              tersebut dari korsleting listrik di sebuah gardu yang ada di dalam
              tokonya. Baca juga: 8 mobil damkar dikerahkan atasi kebakaran toko
              material di Tangerang Bahkan, dirinya sempat mendengar beberapa
              kali ledakan sebelum kobaran api itu membesar dan menghanguskan
              semua isi di dalamnya. "Sekitar jam 21.30 WIB. Saya mau tidur
              waktu itu, cuman sebelumnya dengar suara ledakan kaya petasan di
              arah gardu listrik toko," katanya. Ia mengungkapkan, sekitar satu
              jam kemudian api terus membesar dan merembet ke arah gudang
              penyimpanan bahan bangunan yang berisi bahan tiner dan cat.
              Kemudian, api juga telah menghanguskan 6 unit mobil milik toko
              tersebut. "Di dalam memang ada gudang penyimpanan cat, dan ada 6
              unit mobil termasuk mobil pribadi," tuturnya. Selang beberapa jam
              kemudian, satu unit mobil pemadam kebakaran dari BPBD Kabupaten
              Tangerang datang dan langsung berusaha memadamkan api di
              sekitarnya. Akibat dari peristiwa kebakaran itu, menyebabkan
              kemacetan di sekitar jalur arah Balaraja-Serang dan begitu juga
              sebaliknya.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

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
    height: 170,
    alignSelf: "center",
  },
});
