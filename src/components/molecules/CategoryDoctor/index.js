import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ICAnak, ICBedah, ICGizi, ICUmum } from "../../../assets";
import { colors } from "../../../utils";
const CategoryDoctor = ({ category, onPress }) => {
  const Icon = () => {
    if (category === "dokter umum") {
      return <Image source={ICUmum} style={styles.illustration} />;
    }
    if (category === "Spesialis Gizi") {
      return <Image source={ICGizi} style={styles.illustration} />;
    }
    if (category === "Dokter Anak") {
      return <Image source={ICAnak} style={styles.illustration} />;
    }
    if (category === "Dokter Bedah") {
      return <Image source={ICBedah} style={styles.illustration} />;
    }
    return <Image source={ICBedah} style={styles.illustration} />;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon />
      <Text style={styles.text}>{category}</Text>
    </TouchableOpacity>
  );
};

export default CategoryDoctor;

const styles = StyleSheet.create({
  container: {
    width: 66,
    height: 83,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  illustration: {
    width: 46,
    height: 46,
  },
  text: {
    marginTop: 3,
    fontSize: 8,
  },
});
