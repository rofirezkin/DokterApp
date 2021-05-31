import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, ChatItem, Header, InputChat } from "../../components";
import {
  colors,
  getChatTime,
  getData,
  setDateChat,
  showError,
} from "../../utils";
import { Fire } from "../../config";

const Chatting = ({ navigation, route }) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const chatID = `${dataDoctor.data.uid}_${user.uid}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;
    Fire.database()
      .ref(urlFirebase)
      .on("value", (snapshot) => {
        console.log("data chat", snapshot.val());
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot).map((key) => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];
            Object.keys(dataChat).map((itemChat) => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });
            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          console.log("all data chat ", allDataChat);
          setChatData(allDataChat);
        }
      });
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      console.log("user login", res);
      setUser(res);
    });
  };

  console.log("data doctor", dataDoctor);

  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${dataDoctor.data.uid}_${user.uid}`;

    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };
    Fire.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent("");
        // set history for user
        Fire.database().ref(urlMessageUser).set(dataHistoryChatForUser);

        // set history for dataDoctor
        Fire.database().ref(urlMessageDoctor).set(dataHistoryChatForDoctor);
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="chatting-pasien"
        desc={dataDoctor.data.category}
        photo={{ uri: dataDoctor.data.photo }}
        title={dataDoctor.data.fullName}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView>
          {chatData.map((chat) => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map((itemChat) => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : { uri: dataDoctor.data.photo }}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AR", dataDoctor.monitoring)}
      >
        <Text style={styles.textAR}>Lihat data medical Check Up</Text>
      </TouchableOpacity>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={chatSend}
        targetChat={dataDoctor}
      />
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
  textAR: {
    textAlign: "center",
  },
});
