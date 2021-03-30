import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { Arrow, User } from "../../../assets";
import { colors } from "../../../utils";
import { Button } from "../../atoms";

const PasienChatting = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={Arrow} width={20} />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.name}>Reina Melinda</Text>
        <Text style={styles.desc}>Desain Interior</Text>
      </View>
      <Image source={User} style={styles.avatar} />
    </View>
  );
};

export default PasienChatting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    flexDirection: "row",
  },
  content: {
    flex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    fontWeight: "300",
    marginTop: 6,
    textAlign: "center",
    color: colors.subTitle,
  },
});
