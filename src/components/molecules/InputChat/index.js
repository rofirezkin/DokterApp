import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../utils";
import { Button } from "../../atoms";

const InputChat = ({ onButtonPress, value, onChangeText, targetChat }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Tulis Pesan Untuk ${targetChat.data.fullName}`}
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        disable={value.length < 1}
        type="btn-icon-send"
        onPress={onButtonPress}
      />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inPutChat,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 20,
    fontSize: 14,
    fontWeight: "300",
    maxHeight: 45,
  },
  container: {
    padding: 16,
    flexDirection: "row",
    backgroundColor: colors.white,
  },
});
