import React, { useState, useEffect } from "react";

import { Alert, StyleSheet, Text, View } from "react-native";

import { List } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const Messages = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [chatEmpty, setChatEmpty] = useState(false);
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

            data.push({
              id: key,
              detailUser: detailUser.val(),
              ...oldData[key],
            });
          });
          await Promise.all(promises);
          if (!unmounted) {
            console.log("detail user", data);
            setHistoryChat(data);
            setChatEmpty(false);
          }
        }
      });

    return () => {
      unmounted = true;
      setChatEmpty(true);
    };
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };

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

        //onlongpress
        const handlerLongClick = () => {
          //handler for Long Click
          Alert.alert(
            "Hapus Pesan",
            "Apakah kamu akan Hapus pesan ?",
            [
              {
                text: "YA",
                onPress: handlerClick,
                style: "cancel",
              },
            ],
            {
              cancelable: true,
              // onDismiss: () =>
              //   Alert.alert(
              //     'This alert was dismissed by tapping outside of the alert dialog.',
              //   ),
            }
          );
        };

        const handlerClick = () => {
          Fire.database()
            .ref(`messages/${user.uid}/${chat.uidPartner}_${user.uid}`)
            .remove();
          Fire.database()
            .ref(`chatting/${user.uid}/${chat.uidPartner}_${user.uid}`)
            .remove();

          //handler for Long Click
          console.log("data", chat.lastContentChat);
        };
        //endonlongpress

        return (
          <List
            onPress={() => navigation.navigate("Chatting", dataDoctor)}
            key={chat.id}
            profile={{ uri: chat.detailUser.photo }}
            name={chat.detailUser.fullName}
            desc={fixedDesc}
            date={chat.lastChatDate}
            onLongPress={handlerLongClick}
            activeOpacity={0.6}
            active={true}
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
