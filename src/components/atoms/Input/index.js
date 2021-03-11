import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({ label }) => {
  return (
    <View>
      <Text style={styles.label}> {label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: 13,
    padding: 10,
  },
  label: { fontSize: 16, color: "#7D8797", marginBottom: 6 },
});
