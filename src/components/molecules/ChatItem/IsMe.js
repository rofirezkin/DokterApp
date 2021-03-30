import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../utils";

const IsMe = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>
          Ibu dokter, apakah memakan jeruk tiap hari itu buruk?
        </Text>
      </View>
      <Text style={styles.date}>4.20 AM</Text>
    </View>
  );
};

export default IsMe;

const styles = StyleSheet.create({
  container: { marginBottom: 20, alignItems: "flex-end", paddingRight: 16 },
  chatContent: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.cardLight,
    maxWidth: "70%",
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.text.default,
  },
  date: {
    fontSize: 11,
    fontWeight: "400",
    color: colors.text.secondary,
    marginTop: 8,
  },
});
