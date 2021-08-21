import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  ChatItem,
  Gap,
  Header,
  InputChat,
  Modals,
} from "../../components";
import {
  colors,
  getChatTime,
  getData,
  getUidTime,
  setDateChat,
  setDateChatMessages,
  showError,
} from "../../utils";
import { Fire } from "../../config";

const ChattingPasien = ({ navigation, route }) => {
  const scrollViewRef = useRef();
  const dataDoctor = route.params;
  const statusKonsultasi = dataDoctor;
  const statusMessage = dataDoctor.status;
  const dataMedical = dataDoctor.dataMedical;
  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  const [showWarning1, SetshowWarning1] = useState(false);

  if (statusMessage !== "") {
    if (statusMessage !== "sukses") {
      const datafilter = statusMessage.filter(
        (uid) =>
          uid.data.uidDokter === dataDoctor.data.uid &&
          uid.data.status === "sukses"
      );
      const datafilterBuy = statusMessage.filter(
        (uid) =>
          uid.data.uidDokter === dataDoctor.data.uid &&
          uid.data.status === "feedback"
      );

      var dataKonsul = datafilter[0];
    }
  } else {
  }

  useEffect(() => {
    let unmounted = false;
    getDataUserFromLocal();
    if (dataMedical === "") {
      SetshowWarning1(true);
    } else {
      SetshowWarning1(false);
    }

    const chatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${user.uid}/${chatID}/allChat/`;

    Fire.database()
      .ref(urlFirebase)
      .on("value", (snapshot) => {
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
          if (!unmounted) {
            setChatData(allDataChat);
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, [dataDoctor.data.uid, user.uid, dataMedical, statusMessage]);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();
    const data = {
      sendBy: user.uid,
      chatDate: new Date().getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatID = `${user.uid}_${dataDoctor.data.uid}`;

    //for user
    const urlFirebaseForUser = `chatting/${
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
      lastChatDate: setDateChatMessages(today),
      uidPartner: dataDoctor.data.uid,
      uidTime: `${getUidTime(today)}`,
    };

    if (chatData.length > 0) {
      const dataHistoryChatForDoctor = {
        lastContentChat: chatContent,
        lastChatDate: setDateChatMessages(today),
        uidPartner: user.uid,
        uidTime: `${getUidTime(today)}`,
      };
      Fire.database().ref(urlMessageDoctor).update(dataHistoryChatForDoctor);
    } else {
      const dataHistoryChatForDoctor = {
        lastContentChat: chatContent,
        lastChatDate: setDateChatMessages(today),
        uidPartner: user.uid,
        uidTime: `${getUidTime(today)}`,
        lihatData: "data belum dilihat",
      };
      Fire.database().ref(urlMessageDoctor).set(dataHistoryChatForDoctor);
    }

    setChatContent("");
    //kirim ke database
    Fire.database()
      .ref(urlFirebaseForUser)
      .push(data)
      .then((res) => {
        Fire.database().ref(urlFirebaseforPartner).push(data);
        //set data history for user
        Fire.database().ref(urlMessageUser).set(dataHistoryChatForUser);
        //set history for datadoctor
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const GoToMedical = () => {
    SetshowWarning1(false);
    navigation.navigate("KoneksiAlat");
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
      <Modals
        type="medical checkup"
        visible={showWarning1}
        onRequestClose={() => SetshowWarning1(false)}
        showWarningFalse={() => SetshowWarning1(false)}
        onPress={GoToMedical}
      />

      <View style={styles.content}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {chatData.map((chat) => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map((itemChat) => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  const isDoctor = itemChat.data.sendBy === dataDoctor.data.uid;
                  return (
                    <View key={itemChat.id}>
                      {isDoctor && (
                        <View style={styles.catatanHasil}>
                          {itemChat.data.dataCatatan !== undefined && (
                            <View style={styles.catatanHasil}>
                              <TouchableOpacity
                                style={styles.buttonCatatanHasil}
                                onPress={() =>
                                  navigation.navigate(
                                    "Catatan",
                                    itemChat.data.dataCatatan
                                  )
                                }
                              >
                                <Text style={styles.textHasilCatatan}>
                                  {itemChat.data.dataCatatan.statement}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          )}
                          <Gap height={13} />
                        </View>
                      )}
                      {itemChat.data.chatContent && (
                        <ChatItem
                          isMe={isMe}
                          text={itemChat.data.chatContent}
                          date={itemChat.data.chatTime}
                          photo={isMe ? null : { uri: dataDoctor.data.photo }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {dataDoctor.data.pembayaran === "Berbayar" ? (
        <View>
          {(statusKonsultasi.status === "sukses" &&
            statusKonsultasi.uidDokter === dataDoctor.data.uid) ||
          dataKonsul ? (
            <InputChat
              placeholder={`tulis pesan untuk ${dataDoctor.data.fullName}`}
              value={chatContent}
              onChangeText={(value) => setChatContent(value)}
              onButtonPress={chatSend}
            />
          ) : (
            <View style={styles.pesanTerkunci}>
              <Button
                disable
                text="secondary"
                type="secondary"
                title="Pesan Terkunci"
              />
              {/* <View>
                <Modals
                  type="bayar"
                  visible={showWarningBuy}
                  onRequestClose={() => SetshowWarningBuy(false)}
                  showWarningFalse={() => SetshowWarningBuy(false)}
                  onPress={GoToBuy}
                />
              </View> */}
            </View>
          )}
        </View>
      ) : (
        <InputChat
          placeholder={`tulis pesan untuk ${dataDoctor.data.fullName}`}
          value={chatContent}
          onChangeText={(value) => setChatContent(value)}
          onButtonPress={chatSend}
        />
      )}
    </View>
  );
};

export default ChattingPasien;

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
  pesanTerkunci: {
    alignItems: "center",
    padding: 15,
  },
  textKunci: {
    color: colors.white,
    fontSize: 17,
  },
  //catatan
  catatanHasil: {
    paddingHorizontal: 18,
  },
  buttonCatatanHasil: {
    backgroundColor: colors.border,
    borderRadius: 8,
  },
  textHasilCatatan: {
    textAlign: "center",
    padding: 15,
    color: colors.primary,
  },
});
