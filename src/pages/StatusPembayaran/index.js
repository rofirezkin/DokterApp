import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gap, Header, List } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const StatusPembayaran = ({ navigation, route }) => {
  const dataAdmin = route.params;
  console.log("daraaadamti", dataAdmin);
  const [user, setUser] = useState({});
  const [dataMedical, setDataMedical] = useState("");

  const [filter, setFilter] = useState([]);

  const getUserData = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };
  useEffect(() => {
    getUserData();

    let unmounted = false;
    Fire.database()
      .ref(`users/${user.uid}/data/`)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          if (!unmounted) {
            setDataMedical(snapshot.val());
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, [user.uid]);

  const dataFilterVerifikasi = dataAdmin.filter(
    (element) => element.data.status === "Belum dikonfirmasi"
  );
  const dataFilterSukses = dataAdmin.filter(
    (element) => element.data.status === "sukses"
  );
  const dataFilterFeedback = dataAdmin.filter(
    (element) => element.data.status === "feedback"
  );
  const _dataFilterVerifikasi = {
    dataVerifikasi: dataFilterVerifikasi,
    status: "Belum dikonfirmasi",
  };
  const _dataFilterSukses = {
    dataVerifikasi: dataFilterSukses,
    status: "Pembayaran berhasil",
    dataMedical: dataMedical,
  };

  const _dataFilterFeedback = {
    dataVerifikasi: dataFilterFeedback,
    status: "Feedback Dokter",
  };
  return (
    <View style={styles.pages}>
      <Header title="Panduan Aplikasi" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Gap height={15} />
        <List
          name="Verifikasi Admin"
          desc="Lihat Verifikasi Admin"
          type="next"
          icon="help"
          onPress={() =>
            navigation.navigate("DetailPembayaranPasien", _dataFilterVerifikasi)
          }
        />
        <List
          name="Berhasil"
          desc="Panduan Lengkap"
          type="next"
          icon="help"
          onPress={() =>
            navigation.navigate("DetailPembayaranPasien", _dataFilterSukses)
          }
        />
        <List
          name="Feedback"
          desc="Panduan Lengkap"
          type="next"
          icon="help"
          onPress={() =>
            navigation.navigate("DetailPembayaranPasien", _dataFilterFeedback)
          }
        />
      </View>
    </View>
  );
};

export default StatusPembayaran;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
