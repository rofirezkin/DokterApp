import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ButtonPasien = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonPasien;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#33B9B2",
    textDecorationLine: "underline",
    textDecorationColor: "#33B9B2",
  },
});
