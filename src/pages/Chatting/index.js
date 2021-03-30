import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ChatItem, Header, InputChat } from "../../components";
import { colors } from "../../utils";

const Chatting = () => {
  return (
    <View style={styles.page}>
      <Header type="chatting-pasien" title="Nairobi Putri Hayza" />
      <View style={styles.content}>
        <Text style={styles.chatDate}>Senin, 21 Maret, 2021</Text>
        <ChatItem isMe />
        <ChatItem />
        <ChatItem isMe />
      </View>
      <Button title="Lihat Data Medical Check-up" pasien={true} />
      <InputChat />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  page: { backgroundColor: colors.white, flex: 1 },
  chatDate: {
    fontSize: 11,
    fontWeight: "400",
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: "center",
  },
});
