import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gap, Header, ListData } from "../../components";

import { Fire } from "../../config";
import { colors, getData, getDelay } from "../../utils";

const DataHistory = ({ navigation, route }) => {
  const dataPasien = route.params;
  const urlMessages = dataPasien.urlMessages;
  const uidPasien = dataPasien.dataUid;
  const [uidUser, setUidUser] = useState("");
  const [dataMonitoring, setDataMonitoring] = useState([]);
  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    getNameAndPhoto();
    getUserData();
    Fire.database()
      .ref(`users/${uidPasien}/data/`)
      .on("value", (snapshot) => {
        setLoading(false);
        setEmpty(true);
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          if (!unmounted) {
            setDataMonitoring(data);
            setEmpty(false);
            setLoading(false);
          } else {
            setLoading(false);
            setEmpty(true);
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, [uidPasien]);

  const getUserData = () => {
    getData("user").then((res) => {
      setUidUser(res.uid);
    });
  };

  const getNameAndPhoto = () => {
    Fire.database()
      .ref(`users/${uidPasien}/`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setProfile(data.photo);
          setFullName(data.fullName);
        }
      });
  };
  return (
    <View style={styles.page}>
      <Header title="History Data" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        {dataMonitoring.map((data) => {
          var str1 = fullName.split(" ");

          const datakirim = {
            uidUser: uidUser,
            datamonitor: data.data,
            name: str1[0],
            photo: profile,
            lihatData: "data dilihat",
            urlMessages: urlMessages,
          };
          return (
            <View key={data.id}>
              <ListData
                title="Data Disimpan"
                value={data.id}
                onPress={() => navigation.navigate("AR", datakirim)}
              />
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
            <Text style={styles.noData1}>data kosong</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DataHistory;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    backgroundColor: colors.background,
  },
  noData: {
    alignItems: "center",
  },
  noData1: {
    color: colors.inputBorder,
  },
});
