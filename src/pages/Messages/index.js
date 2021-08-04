import React, { useState, useEffect } from "react";

import { Alert, StyleSheet, Text, View } from "react-native";

import { Gap, List } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const Messages = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDataUserFromLocal();
    const rootDB = Fire.database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory);
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
            const urlUidUSer = `users/${oldData[key].uidPartner}`;
            const detailUser = await rootDB.child(urlUidUSer).once("value");

            data.push({
              id: key,
              detailUser: detailUser.val(),
              ...oldData[key],
            });
          });

          if (!unmounted) {
            await Promise.all(promises);
            const dataBaru = data.sort(
              (a, b) => parseFloat(b.uidTime) - parseFloat(a.uidTime)
            );
            console.log("detail user", dataBaru);
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
      .ref(`admin/${user.uid}/`)
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
          console.log("data hasil parse", data);
          const dataSukses = data.filter((uid) => uid.data.status === "sukses");
          setStatusKonsultasi(dataSukses);
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
      <Text style={styles.title}>Messages</Text>
      {historyChat.map((chat) => {
        const dataDoctor = {
          id: chat.detailUser.uid,
          data: chat.detailUser,
          uidDokter: user.uid,
          pembayaran: user.pembayaran,
          lihatDataPasien: chat.lihatData,
          statusKonsul: chat.detailUser.statusKonsultasi,
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
          <View key={chat.id}>
            {empty === false ? (
              <List
                onPress={() => navigation.navigate("Chatting", dataDoctor)}
                profile={{ uri: chat.detailUser.photo }}
                name={chat.detailUser.fullName}
                desc={fixedDesc}
                date={chat.lastChatDate}
                onLongPress={handlerLongClick}
                activeOpacity={0.6}
                active={true}
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
  noData: {
    alignItems: "center",
  },
  noData1: {
    color: colors.inputBorder,
  },
});
