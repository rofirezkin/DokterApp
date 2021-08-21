import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../../../utils";
import { Gap } from "../../atoms";

const FiturUser = ({ img, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <Gap height={10} />
      <Image style={styles.image} source={img} />
    </TouchableOpacity>
  );
};

export default FiturUser;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 150,
    backgroundColor: colors.white,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  image: {
    alignSelf: "flex-end",
    width: 77,
    height: 47,
  },
  text: {
    width: 131,
    fontSize: 12,
    fontFamily: "Nunito-Regular",
  },
});
