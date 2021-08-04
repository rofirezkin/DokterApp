import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Gap, Header } from "../../components";

import { colors } from "../../utils";

const Catatan = ({ navigation, route }) => {
  const dataPasien = route.params;

  console.log("halocatatam", dataPasien);
  return (
    <View style={styles.page}>
      <Header
        title={dataPasien.statement}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.titleCard}>
              <Text
                style={styles.titleText}
              >{`${dataPasien.statement} Digital Dokter`}</Text>
            </View>
            {dataPasien.statement === "lihat Catatan" && (
              <View style={styles.bodyCard}>
                <Text style={styles.bodyTextTitle}>Symptoms : </Text>
                <Text style={styles.bodyText}>{dataPasien.symptoms}</Text>
                <Gap height={15} />
                <Text style={styles.bodyTextTitle}>Possible Diagnosis : </Text>
                <Text style={styles.bodyText}>{dataPasien.diagnosis}</Text>
                <Gap height={15} />
                <Text style={styles.bodyTextTitle}>Advice : </Text>
                <Text style={styles.bodyText}>{dataPasien.advice}</Text>
              </View>
            )}
            {dataPasien.statement === "Lihat Resep Obat" && dataPasien.resep && (
              <View style={styles.bodyCard}>
                {dataPasien.resep.map((res) => {
                  return (
                    <View key={res.key}>
                      <Text
                        style={styles.bodyTextTitle}
                      >{`Resep ${res.key}`}</Text>
                      <Text style={styles.bodyText}>{res.value}</Text>
                      <Gap height={15} />
                    </View>
                  );
                })}
                <View>
                  <Text style={styles.bodyTextTitle}>Catatan Resep : </Text>
                  <Text style={styles.bodyText}>{dataPasien.catatan}</Text>
                </View>
                {dataPasien.photoResep !== "" && (
                  <View>
                    <Image
                      source={{ uri: dataPasien.photoResep }}
                      style={styles.gambar}
                    />
                  </View>
                )}
              </View>
            )}
            {dataPasien.photoResep !== undefined &&
              dataPasien.resep == undefined && (
                <View style={styles.bodyCard}>
                  <Image
                    source={{ uri: dataPasien.photoResep }}
                    style={styles.gambar}
                  />
                </View>
              )}
          </View>
        </View>
        <Gap height={15} />
      </ScrollView>
    </View>
  );
};

export default Catatan;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    marginTop: 20,
    marginHorizontal: 18,
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
  titleText: {
    fontSize: 18,
  },
  titleCard: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 13,
  },
  bodyCard: {
    margin: 13,
  },
  bodyText: {
    fontSize: 18,
  },
  bodyTextTitle: {
    fontSize: 15,
  },
  gambar: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
});
