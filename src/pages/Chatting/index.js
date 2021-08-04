import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  setDateChatMessage,
  showError,
} from "../../utils";
import { Fire } from "../../config";
import { showMessage } from "react-native-flash-message";

const Chatting = ({ navigation, route }) => {
  const scrollViewRef = useRef();
  const dataDoctor = route.params;
  const statusKonsul = dataDoctor.statusKonsul;
  const lihatDataAR = dataDoctor.lihatDataPasien;

  //chatt
  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);
  //modals
  const [showWarning, SetshowWarning] = useState(false);
  const [showCatatan, setShowCatatan] = useState(false);
  const [showWarning1, SetshowWarning1] = useState(false);
  //catatan
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");

  console.log("data dpklter", dataDoctor);

  if (lihatDataAR === "data belum dilihat") {
    useEffect(() => {
      SetshowWarning1(true);
    }, []);
  } else {
    useEffect(() => {
      SetshowWarning1(false);
    }, []);
  }

  if (statusKonsul === undefined) {
  } else {
    const oldData = statusKonsul;
    const data = [];
    Object.keys(oldData).map((key) => {
      data.push({
        id: key,
        data: oldData[key],
      });
    });

    if (data !== "") {
      if (data !== "sukses") {
        const datafilter = data.filter(
          (uid) =>
            uid.data.uidDokter === dataDoctor.uidDokter &&
            uid.data.status === "sukses"
        );
        var dataKonsul = datafilter[0];
      }
    } else {
    }
  }
  console.log("status konsusasasaasasl", dataKonsul);

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
  const onPressHandlerCatatan = () => {
    setShowCatatan(true);
  };
  //endmodals

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
    const urlMessagePartner = `messages/${dataDoctor.data.uid}/${chatID}`;

    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: setDateChatMessage(today),
      uidPartner: user.uid,
      uidTime: `${getUidTime(today)}`,
    };
    if (chatData.length > 0) {
      console.log("data dilihat");
      const dataHistoryChatForUser = {
        lastContentChat: chatContent,
        lastChatDate: setDateChatMessage(today),
        uidPartner: dataDoctor.data.uid,
        uidTime: `${getUidTime(today)}`,
      };
      Fire.database().ref(urlMessageUser).update(dataHistoryChatForUser);
    } else {
      console.log("data belum dilihat");
      const dataHistoryChatForUser = {
        lastContentChat: chatContent,
        lastChatDate: setDateChatMessage(today),
        uidPartner: dataDoctor.data.uid,
        uidTime: `${getUidTime(today)}`,
        lihatData: "data belum dilihat",
      };
      Fire.database().ref(urlMessageUser).set(dataHistoryChatForUser);
    }

    Fire.database()
      .ref(urlFirebaseforUser)
      .push(data)
      .then(() => {
        Fire.database().ref(urlFirebaseforPartner).push(data);
        // set history for user
        Fire.database().ref(urlMessagePartner).set(dataHistoryChatForDoctor);
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  const dataResep = {
    uidPartner: dataDoctor.data.uid,
    uidUser: user.uid,
  };
  const KirimCatatan = () => {
    const today = new Date();
    const chatID = `${dataDoctor.data.uid}_${user.uid}`;

    const urlFirebaseforUser = `chatting/${
      user.uid
    }/${chatID}/allChat/${setDateChat(today)}`;

    //for partner
    const urlFirebaseforPartner = `chatting/${
      dataDoctor.data.uid
    }/${chatID}/allChat/${setDateChat(today)}`;

    const kirimData = {
      dataCatatan: {
        statement: "lihat Catatan",
        symptoms: symptoms,
        diagnosis: diagnosis,
        advice: advice,
        namaDokter: user.fullName,
      },
      sendBy: user.uid,
    };
    if (
      kirimData.dataCatatan.symptoms !== "" &&
      kirimData.dataCatatan.diagnosis !== "" &&
      kirimData.dataCatatan.advice !== ""
    ) {
      Fire.database()
        .ref(urlFirebaseforUser)
        .push(kirimData)
        .then(() => {
          Fire.database().ref(urlFirebaseforPartner).push(kirimData);
          Fire.database()
            .ref(`catatanUser/${dataDoctor.data.uid}`)
            .push(kirimData);
          setShowCatatan(false);
        })
        .catch((err) => {
          showError(err.message);
        });
    } else {
      showMessage({
        message: "sepertinya anda kurang input data",
        type: "default",
        backgroundColor: colors.error,
        color: colors.white,
      });
    }
  };
  const GotoData = () => {
    const kirimData = {
      dataUid: dataDoctor.data.uid,
      urlMessages: `messages/${user.uid}/${dataDoctor.data.uid}_${user.uid}`,
    };
    SetshowWarning1(false);
    navigation.navigate("DataHistory", kirimData);
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
        visible={showWarning}
        dataDoctor={dataDoctor}
        user={user}
        type="tutup"
        onRequestClose={() => SetshowWarning(false)}
        showWarningFalse={() => SetshowWarning(false)}
        navigation={navigation}
      />
      <Modals
        visible={showCatatan}
        dataDoctor={dataDoctor}
        user={user}
        type="catatan"
        onRequestClose={() => setShowCatatan(false)}
        showWarningFalse={() => setShowCatatan(false)}
        navigation={navigation}
        setSymptoms={(value) => setSymptoms(value)}
        symptoms={symptoms}
        setDiagnosis={(value) => setDiagnosis(value)}
        diagnosis={diagnosis}
        setAdvice={(value) => setAdvice(value)}
        advice={advice}
        onPress={KirimCatatan}
      />
      <Modals
        visible={showWarning1}
        type="lihat data"
        onRequestClose={() => SetshowWarning1(false)}
        showWarningFalse={() => SetshowWarning1(false)}
        navigation={navigation}
        onPress={GotoData}
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

                  return (
                    <View key={itemChat.id}>
                      {isMe && (
                        <View>
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
      {statusKonsul === undefined && (
        <View style={styles.pesanTerkunci}>
          {/* <Button
              disable
              text="secondary"
              type="secondary"
              title="Pesan Terkunci"
            /> */}
        </View>
      )}
      {dataDoctor.pembayaran === "Berbayar" ? (
        <View>
          {statusKonsul !== undefined ? (
            <View>
              {dataKonsul !== undefined ? (
                <View>
                  {dataKonsul.data.status === "sukses" ? (
                    <View>
                      <View style={styles.tutupkonsul}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(
                              "DataHistory",
                              dataDoctor.data.uid
                            )
                          }
                        >
                          <Text style={styles.textAR}>Lihat data </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressHandlerCatatan}>
                          <Text style={styles.textAR}>Catatan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ResepObat", dataResep)
                          }
                        >
                          <Text style={styles.textAR}>Resep</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressHandler}>
                          <Text style={styles.textAR}>Tutup </Text>
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
          <View>
            <View style={styles.tutupkonsul}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DataHistory", dataDoctor.data.uid)
                }
              >
                <Text style={styles.textAR}>Lihat data </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressHandlerCatatan}>
                <Text style={styles.textAR}>Catatan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("ResepObat", dataResep)}
              >
                <Text style={styles.textAR}>Resep</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    fontSize: 16,
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
});
