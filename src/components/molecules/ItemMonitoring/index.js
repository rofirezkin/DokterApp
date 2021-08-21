import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Tekanan,
  IconBMI,
  Jantung,
  ICBMI,
  ICTinggiBadan,
  ICBeratBadan,
  ICJantung,
  ICSuhu,
  ICTekanan,
} from "../../../assets";
import { colors } from "../../../utils";

const ItemMonitoring = ({ title, data, gambar, type, satuan }) => {
  const Icon = ({ width, height }) => {
    if (gambar === "detakJantung") {
      return <Image source={ICJantung} style={styles.detakJantung} />;
    } else if (gambar === "suhu") {
      return <Image source={ICSuhu} style={styles.suhu} />;
    } else if (gambar === "tinggi") {
      return <Image source={ICTinggiBadan} style={styles.tinggiBadan} />;
    } else if (gambar === "berat") {
      return <Image source={ICBeratBadan} style={styles.beratBadan} />;
    } else if (gambar === "tekanan") {
      return <Image source={ICTekanan} style={styles.tekananDarah} />;
    } else if (gambar === "bmi") {
      return <Image source={ICBMI} style={styles.BMI} />;
    }
    return <Image source={ICJantung} style={styles.beratBadan} />;
  };
  return (
    <>
      {!type && (
        <View style={styles.container(type)}>
          <Icon width={60} height={60} />
          <Text style={styles.title(type)}>{title}</Text>
          <Text style={styles.data(type)}>{`${data} ${satuan}`}</Text>
        </View>
      )}
      {type && (
        <View style={styles.container(type)}>
          <Icon width={36} height={36} />
          <Text style={styles.title(type)}>{title}</Text>
          <Text style={styles.data(type)}>{`${data} ${satuan}`}</Text>
        </View>
      )}
    </>
  );
};

export default ItemMonitoring;

const styles = StyleSheet.create({
  container: (type) => ({
    width: type ? 92 : 140,
    height: type ? 110 : 145,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  }),

  title: (type) => ({
    fontSize: type ? 8 : 15,
    color: "#567A78",
  }),
  data: (type) => ({
    fontSize: type ? 16 : 25,
    fontWeight: "bold",
    color: "#567A78",
    paddingHorizontal: 10,
  }),
  tinggiBadan: {
    height: 36,
    width: 34,
  },
  beratBadan: {
    height: 34,
    width: 30,
  },
  BMI: {
    width: 43,
    height: 41,
  },
  suhu: {
    width: 37,
    height: 53,
  },
  tekananDarah: {
    width: 45,
    height: 42,
  },
  detakJantung: {
    width: 43,
    height: 40,
  },
});
