import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { User } from "../../../assets";

const UpdateStatus = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={User} style={styles.avatar} />
        <View style={styles.boxStatus}>
          <Text style={styles.text}>Buat Artikel ?</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UpdateStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  avatar: { width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12 },
  boxStatus: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C8C8C8",
    borderRadius: 25,
    justifyContent: "center",
  },
  text: {
    marginLeft: 29,
    fontSize: 15,
  },
});
