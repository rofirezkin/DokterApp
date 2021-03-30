import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FotoBlog } from "../../assets";
import { Gap, HealthInfo, UpdateStatus } from "../../components";
import { colors } from "../../utils";

const Artikel = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Artikel Anda</Text>
      <View style={styles.wrapperSection}>
        <View style={styles.centerArtikel}>
          <Image source={FotoBlog} style={styles.image} />
        </View>
        <Gap height={30} />
        <UpdateStatus onPress={() => navigation.navigate("UpdateStatus")} />
        <Gap height={25} />
        <Text style={styles.titleArtikel}>Artikel Yang anda dibuat</Text>
      </View>
      <HealthInfo />
      <HealthInfo />
      <HealthInfo />
    </View>
  );
};

export default Artikel;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 30,
    textAlign: "center",
  },
  wrapperSection: {
    paddingHorizontal: 18,
  },
  image: {
    width: 320,
    height: 134,
  },
  centerArtikel: {
    marginTop: 19,
    alignItems: "center",
  },
  titleArtikel: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.text.default,
  },
});
