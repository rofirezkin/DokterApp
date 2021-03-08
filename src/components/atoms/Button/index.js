import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Button = ({ type, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (type) => ({
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: type === "secondary" ? "red" : "white",
    borderRadius: 20,
  }),
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: "#33B9B2",
    textAlign: "center",
    
  },
});
