import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from "../../assets";
import { List } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const Messages = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory);

    Fire.database()
      .ref(urlHistory)
      .on("value", async (snapshot) => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data = [];
          const promises = await Object.keys(oldData).map(async (key) => {
            const urlUidUSer = `users/${oldData[key].uidPartner}`;
            const detailUser = await rootDB.child(urlUidUSer).once("value");
            console.log("detail; doctor", detailUser.val());
            data.push({
              id: key,
              detailUser: detailUser.val(),
              ...oldData[key],
            });
          });
          await Promise.all(promises);

          setHistoryChat(data);
        }
      });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      console.log("dat untuk user uid", res);
      setUser(res);
    });
  };
  console.log("messages", historyChat);
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Messages</Text>
      {historyChat.map((chat) => {
        const dataDoctor = {
          id: chat.detailUser.uid,
          data: chat.detailUser,
        };
        return (
          <List
            onPress={() => navigation.navigate("Chatting", dataDoctor)}
            key={chat.id}
            profile={{ uri: chat.detailUser.photo }}
            name={chat.detailUser.fullName}
            desc={chat.lastContentChat}
          />
        );
      })}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 30,
    textAlign: "center",
  },
});
