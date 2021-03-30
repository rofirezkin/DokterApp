import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BtnIconNotActive, BtnIconActive } from "../../../assets";
import { colors } from "../../../utils";

const BtnIconSend = ({ disable }) => {
  return (
    <View style={styles.container(disable)}>
      {disable && <Image source={BtnIconNotActive} style={styles.button} />}
      {!disable && <Image source={BtnIconActive} style={styles.button} />}
    </View>
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
