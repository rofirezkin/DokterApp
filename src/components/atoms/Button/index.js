import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BtnIconSend from "./BtnIconSend";
import ButtonPasien from "./ButtonPasien";
import { colors } from "../../../utils";

const Button = ({ text, type, title, onPress, pasien, disable }) => {
  if (type === "btn-icon-send") {
    return <BtnIconSend disable={disable} onPress={onPress} />;
  }
  if (pasien) {
    return <ButtonPasien title={title} onPress={onPress} />;
  }
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(text)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (type) => ({
    paddingVertical: 15,
    width: "100%",
    backgroundColor: type === "secondary" ? "#33B9B2" : "white",
    borderRadius: 8,
    alignSelf: "center",
  }),
  disableBg: {
    width: "100%",
    borderRadius: 20,
    paddingVertical: 10,
    backgroundColor: colors.button.disable.background,
  },
  text: (text) => ({
    fontSize: 15,
    fontWeight: "600",
    color: text === "secondary" ? "white" : "#33B9B2",
    textAlign: "center",
  }),
  disableText: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: colors.button.disable.text,
  },
});
