import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ListData, Gap, Button } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const Monitoring = ({ navigation }) => {
  const [uidUser, setUidUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [dataMonitoring, setDataMonitoring] = useState([]);
  const getUserData = () => {
    getData("user").then((res) => {
      setUidUser(res.uid);
    });
  };

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    setEmpty(true);
    getUserData();
    Fire.database()
      .ref(`users/${uidUser}/data/`)
      .on("value", (snapshot) => {
        setLoading(false);

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
  }, [uidUser]);

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Monitoring Data</Text>
      <Gap height={30} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {dataMonitoring.map((data) => {
            const send = false;
            const dataBaru = {
              dataMonitor: data,
              notif: send,
              uidUser: uidUser,
            };

            return (
              <View key={data.id}>
                <ListData
                  title="Data Disimpan"
                  value={data.id}
                  onPress={() => navigation.navigate("SaveData", dataBaru)}
                />
              </View>
            );
          })}
          {loading && (
            <View style={styles.noData}>
              <Text style={styles.noData1}>Loading.....</Text>
            </View>
          )}
          {empty && (
            <View style={styles.noData}>
              <Text style={styles.noData1}>data Kosong</Text>
            </View>
          )}

          <View style={styles.koneksialat}>
            <Text style={styles.koneksi}>Koneksikan Alat Dengan Aplikasi</Text>
            <Button
              title="Koneksikan Alat"
              text="secondary"
              type="secondary"
              onPress={() => navigation.navigate("KoneksiAlat")}
            />
          </View>
        </View>
        <Gap height={20} />
      </ScrollView>
    </View>
  );
};

export default Monitoring;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  noData: {
    alignItems: "center",
  },
  noData1: {
    color: colors.inputBorder,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 30,
    textAlign: "center",
  },
  container: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  marginTanggal: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  koneksialat: {
    paddingHorizontal: 30,
  },
  koneksi: {
    textAlign: "center",
    color: colors.secondary,
    marginVertical: 20,
  },
});
