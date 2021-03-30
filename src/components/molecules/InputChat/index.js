import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../utils";
import { Button } from "../../atoms";

const InputChat = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder=" Tulis Pesan Untuk Nairobi"
      />
      <Button disable={false} type="btn-icon-send" disable />
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
  container: { padding: 16, flexDirection: "row" },
});
