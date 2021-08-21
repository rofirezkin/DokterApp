import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Gap, List } from "../../components";
import { colors, getData, getDelay } from "../../utils";
import { Fire } from "../../config";

const MessagesPasien = ({ navigation }) => {
  const [user, setUser] = useState({});

  const [historyChat, setHistoryChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [dataMedical, setDataMedical] = useState("");
  const [statusKonsultasi, setStatusKonsultasi] = useState("");
  useEffect(() => {
    setLoading(true);
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    let unmounted = false;
    Fire.database()
      .ref(urlHistory)
      .on("value", async (snapshot) => {
        setLoading(false);
        setEmpty(true);
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data = [];
          const promises = await Object.keys(oldData).map(async (key) => {
            const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
            const detailDoctor = await rootDB.child(urlUidDoctor).once("value");
            data.push({
              id: key,
              detailDoctor: detailDoctor.val(),
              ...oldData[key],
            });
          });
          if (!unmounted) {
            await Promise.all(promises);
            const dataBaru = data.sort(
              (a, b) => parseFloat(b.uidTime) - parseFloat(a.uidTime)
            );
            setHistoryChat(dataBaru);
            setEmpty(false);
            setLoading(false);
          } else {
            setLoading(false);
            setEmpty(true);
          }
        }
      });

    Fire.database()
      .ref(`users/${user.uid}/data/`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          if (!unmounted) {
            setDataMedical(snapshot.val());
          }
        }
      });

    Fire.database()
      .ref(`users/${user.uid}/statusKonsultasi`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          setLoading(false);
          const oldData = snapshot.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });

          const dataSukses = data.filter((uid) => uid.data.status === "sukses");
          if (!unmounted) {
            setStatusKonsultasi(dataSukses);
          }
        }
      });

    return () => {
      unmounted = true;
    };
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map((chat) => {
          const dataDoctor = {
            id: chat.detailDoctor.uid,
            data: chat.detailDoctor,
            status: statusKonsultasi,
            dataMedical: dataMedical,
            // uidDokter: result.data.uidDokter,
          };

          const shortDesc = chat.lastContentChat;
          shortDesc.toString();
          let fixedDesc = "";
          if (shortDesc.length > 30) {
            fixedDesc = shortDesc.substring(0, 28) + "...";
          } else {
            fixedDesc = shortDesc;
          }
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
              .ref(`messages/${user.uid}/${user.uid}_${chat.uidPartner}`)
              .remove();
            Fire.database()
              .ref(`chatting/${user.uid}/${user.uid}_${chat.uidPartner}`)
              .remove();

            //handler for Long Click
          };
          return (
            <View key={chat.id}>
              {empty === false ? (
                <List
                  onPress={() =>
                    navigation.navigate("ChattingPasien", dataDoctor)
                  }
                  key={chat.id}
                  profile={{ uri: chat.detailDoctor.photo }}
                  name={chat.detailDoctor.fullName}
                  desc={fixedDesc}
                  active={true}
                  date={chat.lastChatDate}
                  onLongPress={handlerLongClick}
                  activeOpacity={0.6}
                />
              ) : (
                <View />
              )}
            </View>
          );
        })}
        <Gap height={20} />
        {loading && (
          <View style={styles.noData}>
            <Text style={styles.noData1}>Loading.....</Text>
          </View>
        )}
        {empty && (
          <View style={styles.noData}>
            <Text style={styles.noData1}>Pesan Kosong</Text>
          </View>
        )}
      </ScrollView>

      {/* {chatEmpty && (
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <Text>Uppss Sepertinya anda belum melakukan konsultasi</Text>
        </View>
      )} */}
    </View>
  );
};

export default MessagesPasien;

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
  noData: {
    alignItems: "center",
  },
  noData1: {
    color: colors.inputBorder,
  },
});
