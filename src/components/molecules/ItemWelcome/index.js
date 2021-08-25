import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  IconDokter,
  IconKoneksiAlat,
  IconMonitor,
  IconWelcomeArtikel,
  IconWelcomeAugmented,
  IconWelcomeDokter,
  IconWelcomeIntegrated,
  IconWelcomeKonsul,
  IconWelcomeMonitor,
} from "../../../assets";
import { Gap } from "../../atoms";

const ItemWelcome = ({ gambar, title }) => {
  const Icon = ({ width, height }) => {
    if (gambar === "iconArtikel") {
      return <Image source={IconWelcomeArtikel} style={styles.iconWelcome} />;
    } else if (gambar === "iconKonsul") {
      return <Image source={IconWelcomeKonsul} style={styles.iconWelcome} />;
    } else if (gambar === "iconMonitor") {
      return <Image source={IconWelcomeMonitor} style={styles.iconWelcome} />;
    } else if (gambar === "iconAugmented") {
      return <Image source={IconWelcomeAugmented} style={styles.iconWelcome} />;
    } else if (gambar === "iconDokter") {
      return <Image source={IconWelcomeDokter} style={styles.iconWelcome} />;
    } else if (gambar === "iconIntegrated") {
      return (
        <Image source={IconWelcomeIntegrated} style={styles.iconWelcome} />
      );
    }
    return <Image source={IconWelcomeArtikel} style={styles.iconWelcome} />;
  };
  return (
    <View style={styles.container}>
      <Icon />
      <Gap height={5} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default ItemWelcome;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 100,
    backgroundColor: "#A6E1DC",
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#6E4E4E",
  },
  iconWelcome: {
    width: 37,
    height: 37,
  },
});
