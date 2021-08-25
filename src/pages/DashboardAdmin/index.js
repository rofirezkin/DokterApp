import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Gap, List, ListAdmin } from "../../components";

import { Fire } from "../../config";

const DashboardAdmin = ({ navigation }) => {
  const [dataAdmin, setDataAdmin] = useState([]);

  useEffect(() => {
    let unmounted = false;

    Fire.database()
      .ref("verifikasi/")
      .orderByChild("status")
      .equalTo("Belum dikonfirmasi")
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
          if (!unmounted) {
            setDataAdmin(data);
          }
        }
      });

    return () => {
      unmounted = true;
    };
  }, [dataAdmin.uidPasien]);

  const signout = () => {
    Fire.auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Splash" }],
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Dashboard Pesan Konsultasi</Text>
      </View>
      <View style={styles.container}>
        <Gap height={20} />
        {dataAdmin.map((data) => {
          const uidData = {
            uidPasien: data.data.uidPasien,
            dataSemua: data.data,
            uidDokter: data.data.uidDokter,
          };

          return (
            <View key={data.id}>
              <ListAdmin
                onPress={() =>
                  navigation.navigate("DetailPembayaranAdmin", uidData)
                }
                uidPasien={data.data.uidDokter}
                statusPembayaran={data.data.status}
              />
            </View>
          );
        })}
        <Gap height={20} />
        <View>
          <TouchableOpacity onPress={signout} style={styles.Button}>
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashboardAdmin;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#33B9B2",
    padding: 20,
    borderBottomEndRadius: 30,
    borderBottomLeftRadius: 30,
  },
  textHeader: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  Button: {
    paddingVertical: 15,
    width: "100%",
    backgroundColor: "#33B9B2",
    borderRadius: 8,
    alignSelf: "center",
  },
  textButton: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});
