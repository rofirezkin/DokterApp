import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DummyDoctor1, NullPhoto, User } from "../../../assets";
import { colors, getData } from "../../../utils";

const HomeProfile = ({ onPress, profile }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.profession}>{profile.category}</Text>
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
  name: {
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.default,
  },
  profession: {
    fontSize: 12,
    textTransform: "capitalize",
    fontFamily: "400",
    color: colors.text.secondary,
  },
});
