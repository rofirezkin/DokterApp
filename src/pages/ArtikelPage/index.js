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
          <Text style={styles.title}>{dataArtikel.title}</Text>
          <Text style={styles.penulis}>{`Penulis ${dataArtikel.nama}`}</Text>
          <Text style={styles.date}>{`Publish : ${dataArtikel.date}`}</Text>
          <Image source={{ uri: dataArtikel.image }} style={styles.gambar} />
          <View>
            <Text style={styles.desc}>{dataArtikel.body}</Text>
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
