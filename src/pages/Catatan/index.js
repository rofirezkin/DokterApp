import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gap, Header } from "../../components";
import { Fire } from "../../config";
import { colors } from "../../utils";

const Catatan = ({ navigation, route }) => {
  const dataPasien = route.params;

  console.log("halocatatam", dataPasien);
  return (
    <View style={styles.page}>
      <Header title="Lihat Catatan" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.titleCard}>
            <Text style={styles.titleText}>Catatan Dokter</Text>
          </View>
          <View style={styles.bodyCard}>
            <Text style={styles.bodyText}>Symptoms : </Text>
            <Text style={styles.bodyText}>{dataPasien.symptoms}</Text>
            <Gap height={15} />
            <Text style={styles.bodyText}>Possible Diagnosis : </Text>
            <Text style={styles.bodyText}>{dataPasien.diagnosis}</Text>
            <Gap height={15} />
            <Text style={styles.bodyText}>Advice : </Text>
            <Text style={styles.bodyText}>{dataPasien.advice}</Text>
          </View>
        </View>
      </View>
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
  titleCard: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 13,
  },
  bodyCard: {
    margin: 13,
  },
});
