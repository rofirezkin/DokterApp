import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Button = ({ type, title }) => {
  return (
    <View style={styles.container(type)}>
      <Text style={styles.text}>{title}</Text>
    </View>
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
