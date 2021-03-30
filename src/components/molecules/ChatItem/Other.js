import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { User } from "../../../assets";
import { colors } from "../../../utils";

const Other = () => {
  return (
    <View style={styles.container}>
      <Image source={User} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>
            Ibu dokter, apakah memakan jeruk tiap hari itu buruk?
          </Text>
        </View>
        <Text style={styles.date}>4.20 AM</Text>
      </View>
    </View>
  );
};

export default Other;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginBottom: 20,
    paddingLeft: 16,
    flexDirection: "row",
  },
  chatContent: {
    padding: 12,
    paddingLeft: 18,
    backgroundColor: colors.cardGreen,
    maxWidth: "80%",
    borderRadius: 10,
    borderBottomLeftRadius: 0,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.white,
  },
  avatar: { width: 30, height: 30, borderRadius: 30 / 2, marginRight: 12 },
  date: {
    fontSize: 11,
    fontWeight: "400",
    color: colors.text.secondary,
    marginTop: 8,
  },
});
