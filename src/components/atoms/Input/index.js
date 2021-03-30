import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../utils";

const Input = ({ label, value, onChangeText, secureTextEntry }) => {
  const [border, setBorder] = useState(colors.inputBorder);
  const onFocusForm = () => {
    setBorder(colors.send);
  };
  const onBLurForm = () => {
    setBorder(colors.inputBorder);
  };
  return (
    <View>
      <Text style={styles.label}> {label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBLurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (border) => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 13,
    padding: 10,
  }),
  label: { fontSize: 16, color: "#7D8797", marginBottom: 6 },
});
