import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, ChatItem, Gap, Header, InputChat } from "../../components";
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
import { showMessage } from "react-native-flash-message";

const Chatting = ({ navigation, route }) => {
  const scrollViewRef = useRef();
  const dataDoctor = route.params;
  const statusKonsul = dataDoctor.statusKonsul;

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
  const [chatContent, setChatContent] = useState("");
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);
  const [showWarning, SetshowWarning] = useState(false);
  const [showCatatan, setShowCatatan] = useState(false);

  //catatan
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");

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

  const KirimDataAkhirKonsultasi = () => {
    const kirimData = {
      status: "feedback",
    };
    Fire.database()
      .ref(
        `users/${dataDoctor.data.uid}/statusKonsultasi/${dataDoctor.uidDokter}`
      )
      .update(kirimData);
    Fire.database()
      .ref(`verifikasi/${dataDoctor.uidDokter}_${dataDoctor.id}`)
      .remove();
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
      <Modal
        visible={showCatatan}
        transparent
        onRequestClose={() => setShowCatatan(false)}
        animationType="slide"
        hardwareAccelerated
      >
        <View style={styles.centered_view}>
          <View style={styles.warning_modal_catatan}>
            <View style={styles.warning_title_cttn}>
              <Text style={styles.text}>Buat Catatan</Text>
            </View>
            <View style={styles.warning_body_catatan}>
              <Gap height={8} />
              <Text>Symptoms</Text>
              <TextInput
                onChangeText={(value) => setSymptoms(value)}
                value={symptoms}
                style={styles.judul}
                placeholder="patient symptoms"
              />
              <Gap height={8} />
              <Text>Possible Diagnosis</Text>
              <TextInput
                onChangeText={(value) => setDiagnosis(value)}
                value={diagnosis}
                style={styles.judul}
                placeholder="patient diagnosis"
              />
              <Gap height={8} />
              <Text>Advice</Text>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="advice for patients"
                placeholderTextColor="grey"
                numberOfLines={2}
                multiline={true}
                onChangeText={(value) => setAdvice(value)}
                value={advice}
              />
            </View>
            <View style={styles.modalsButton}>
              <TouchableOpacity
                onPress={() => setShowCatatan(false)}
                style={styles.warning_button}
              >
                <Text style={styles.textModals}>Cencel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={KirimCatatan}
                style={styles.warning_button}
              >
                <Text style={styles.textModals}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  warning_modal_catatan: {
    width: 300,
    height: 400,
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

  warning_title_cttn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  warning_body: {
    height: 200,

    paddingHorizontal: 14,
  },
  warning_body_catatan: {
    height: 300,

    paddingHorizontal: 14,
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

  //catatan
  judul: {
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
  },
  textArea: {
    borderRadius: 4,
    backgroundColor: "#F3F3F3",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    height: 100,
  },
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
