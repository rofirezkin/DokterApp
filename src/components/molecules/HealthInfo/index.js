import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { News1 } from "../../../assets";
import { colors } from "../../../utils";

const HealthInfo = ({
  title,
  onLongPress,
  activeOpacity,
  body,
  image,
  onPress,
}) => {
  const shortDesc = title;
  shortDesc.toString();
  let fixedDesc = "";
  if (shortDesc.length > 30) {
    fixedDesc = shortDesc.substring(0, 28) + "...";
  } else {
    fixedDesc = shortDesc;
  }
  const shortBody = body;
  shortBody.toString();
  let fixedBody = "";
  if (shortBody.length > 30) {
    fixedBody = shortBody.substring(0, 28) + "...";
  } else {
    fixedBody = shortBody;
  }

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{fixedDesc}</Text>
          <Text style={styles.desc}>{fixedBody}</Text>
        </View>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    </TouchableOpacity>
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
