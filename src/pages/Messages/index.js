import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from "../../assets";
import { List } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const Messages = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [short, setShort] = useState("");
  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory);
    let unmounted = false;
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
          if (!unmounted) {
            setHistoryChat(data);
          }
        }
      });
    return () => {
      unmounted = true;
    };
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
        const shortDesc = chat.lastContentChat;
        shortDesc.toString();
        let fixedDesc = "";
        if (shortDesc.length > 30) {
          fixedDesc = shortDesc.substring(0, 28) + "...";
        } else {
          fixedDesc = shortDesc;
        }

        return (
          <List
            onPress={() => navigation.navigate("Chatting", dataDoctor)}
            key={chat.id}
            profile={{ uri: chat.detailUser.photo }}
            name={chat.detailUser.fullName}
            desc={fixedDesc}
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
