import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { News1 } from "../../../assets";
import { colors } from "../../../utils";

const HealthInfo = ({ title, body, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{body}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
};

export default HealthInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNews,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "600",
    color: colors.text.default,
    maxWidth: "90%",
  },
  desc: {
    fontSize: 12,
    fontFamily: colors.text.secondary,
    marginTop: 4,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
  },
});
