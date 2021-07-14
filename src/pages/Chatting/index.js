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
  getUidTime,
  setDateChat,
  setDateChatMessage,
  showError,
} from "../../utils";
import { Fire } from "../../config";
import { Modal } from "react-native";

const Chatting = ({ navigation, route }) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);
  const [showWarning, SetshowWarning] = useState(false);
  useEffect(() => {
    let unmounted = false;
    getDataUserFromLocal();
    const chatID = `${dataDoctor.data.uid}_${user.uid}`;
    const urlFirebase = `chatting/${user.uid}/${chatID}/allChat/`;
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
          if (!unmounted) {
            setChatData(allDataChat);
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      console.log("user login", res);
      setUser(res);
    });
  };

  //modals
  const onPressHandler = () => {
    SetshowWarning(true);
  };
  //endmodals
  console.log("data doctor", dataDoctor);

  const KirimDataAkhirKonsultasi = () => {
    const kirimData = {
      status: "feedback",
    };
    Fire.database().ref(`admin/${dataDoctor.data.uid}/`).update(kirimData);
    Fire.database()
      .ref(`users/${dataDoctor.data.uid}/statusKonsultasi/`)
      .update(kirimData);
    navigation.reset({
      index: 0,
      routes: [{ name: "Success" }],
    });
  };
  const chatSend = () => {
    const today = new Date();
    setChatContent("");
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${dataDoctor.data.uid}_${user.uid}`;

    //for user
    const urlFirebaseforUser = `chatting/${
      user.uid
    }/${chatID}/allChat/${setDateChat(today)}`;

    //for partner
    const urlFirebaseforPartner = `chatting/${
      dataDoctor.data.uid
    }/${chatID}/allChat/${setDateChat(today)}`;

    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: setDateChatMessage(today),
      uidPartner: dataDoctor.data.uid,
      uidTime: `${getUidTime(today)}`,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: setDateChatMessage(today),
      uidPartner: user.uid,
      uidTime: `${getUidTime(today)}`,
    };
    Fire.database()
      .ref(urlFirebaseforUser)
      .push(data)
      .then(() => {
        Fire.database().ref(urlFirebaseforPartner).push(data);
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
      <Modal
        visible={showWarning}
        transparent
        onRequestClose={() => SetshowWarning(false)}
        animationType="slide"
        hardwareAccelerated
      >
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.warning_title}>
              <Text style={styles.text}>PERINGATAN!</Text>
            </View>
            <View style={styles.warning_body}>
              <Text style={styles.text}>
                Jika anda menutup konsultasi dengan pasien, sesi konsultasi di
                tutup dan pasien tidak bisa mengirim pesan.
              </Text>
              <Text style={styles.text}>
                apakah anda ingin mengakhiri Konsultasi dengan pasien anda ?
              </Text>
            </View>
            <View style={styles.modalsButton}>
              <TouchableOpacity
                onPress={() => SetshowWarning(false)}
                style={styles.warning_button}
              >
                <Text style={styles.textModals}>Cencel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={KirimDataAkhirKonsultasi}
                style={styles.warning_button}
              >
                <Text style={styles.textModals}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
      {dataDoctor.data.statusKonsultasi.status === "" && (
        <View style={styles.pesanTerkunci}>
          {/* <Button
              disable
              text="secondary"
              type="secondary"
              title="Pesan Terkunci"
            /> */}
        </View>
      )}
      {user.pembayaran === "Berbayar" ? (
        <View>
          {dataDoctor.data.statusKonsultasi.status === "sukses" &&
          dataDoctor.data.statusKonsultasi.uidDokter === user.uid ? (
            <View>
              <View style={styles.tutupkonsul}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DataHistory", dataDoctor.data.uid)
                  }
                >
                  <Text style={styles.textAR}>Lihat data </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressHandler}>
                  <Text style={styles.textAR}>Tutup Konsultasi</Text>
                </TouchableOpacity>
              </View>
              <InputChat
                value={chatContent}
                onChangeText={(value) => setChatContent(value)}
                onButtonPress={chatSend}
                targetChat={dataDoctor}
              />
            </View>
          ) : (
            <View style={styles.pesanTerkunci}>
              <Button
                disable
                text="secondary"
                type="secondary"
                title="Pesan Terkunci"
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("DataHistory", dataDoctor.data.uid)
            }
          >
            <Text style={styles.textAR}>Lihat data Medical Checkup</Text>
          </TouchableOpacity>
          <InputChat
            value={chatContent}
            onChangeText={(value) => setChatContent(value)}
            onButtonPress={chatSend}
            targetChat={dataDoctor}
          />
        </View>
      )}
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
    textDecorationLine: "underline",
    color: colors.primary,
    textDecorationLine: "underline",
    fontSize: 17,
  },
  tutupkonsul: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  pesanTerkunci: {
    alignItems: "center",
    padding: 15,
  },
  //datamodals
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",

    borderRadius: 10,
  },
  warning_title: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E494",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  warning_body: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  warning_button: {
    backgroundColor: colors.primary,
    width: 100,
    borderRadius: 10,
  },
  text: {
    color: "#000000",
    fontSize: 13,
    margin: 10,
    textAlign: "center",
  },
  textModals: {
    color: colors.white,
    fontSize: 13,
    margin: 10,
    textAlign: "center",
  },
  button: {
    width: 150,
    height: 50,
    alignItems: "center",
  },
  modalsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
});
