import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, ListData } from "../../components";

import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const DataHistory = ({ navigation, route }) => {
  const uidPasien = route.params;
  const [uidUser, setUidUser] = useState("");
  const [dataMonitoring, setDataMonitoring] = useState([]);
  const [fullName, setFullName] = useState("");
  const [profile, setProfile] = useState("");
  console.log("uid Docctor", uidPasien);
  useEffect(() => {
    let unmounted = false;
    getNameAndPhoto();
    getUserData();
    Fire.database()
      .ref(`users/${uidPasien}/data/`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const oldData = snapshot.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log("data hasil parse", data);
          if (!unmounted) {
            setDataMonitoring(data);
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
      console.log("get usreeee", res.uid);
    });
  };

  const getNameAndPhoto = () => {
    Fire.database()
      .ref(`users/${uidPasien}/`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();

          console.log("data hasil parseuntuk poto", data);
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
});
