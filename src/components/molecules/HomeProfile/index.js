import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DummyDoctor1, User } from "../../../assets";
import { colors } from "../../../utils";

const HomeProfile = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={DummyDoctor1} style={styles.avatar} />
      <View>
        <Text style={styles.name}>Shayna Melinda</Text>
        <Text style={styles.profession}>Dokter Umum</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: { width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600", color: colors.text.default },
  profession: { fontSize: 12, fontFamily: "400", color: colors.text.secondary },
});
