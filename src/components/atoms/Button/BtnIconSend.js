import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BtnIconNotActive, BtnIconActive } from "../../../assets";
import { colors } from "../../../utils";

const BtnIconSend = ({ disable, onPress }) => {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        <Image source={BtnIconNotActive} style={styles.button} />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container(disable)}>
      <Image source={BtnIconActive} style={styles.button} />
    </TouchableOpacity>
  );
};

export default BtnIconSend;

const styles = StyleSheet.create({
  container: (disable) => ({
    backgroundColor: disable ? colors.inPutChat : colors.send,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 10,
    alignItems: "center",
  }),
  button: { width: 36, height: 36 },
});
