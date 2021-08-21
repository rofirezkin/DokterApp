import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Gap, Header, ItemMonitoring } from "../../components";
import { colors, getData, setDateChat, showError } from "../../utils";
import { Fire } from "../../config";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";

const RealtimeData = ({ route, navigation }) => {
  const dataId = route.params;

  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const [dataMonitoring, setDataMonitoring] = useState({
    suhu: "0",
    tekananDarah: "0",
    beratBadan: "0",
    tinggiBadan: "0",
    detakJantung: "0",
    fullName: "",
    photo: "",
    bodyMassIndex: "",
  });
  const nilaiKondisi = {
    kondisi: 0,
  };
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getDataUserFromLocal();
    }

    Fire.database()
      .ref(`dataRealtime/${dataId}`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (!unmounted) {
            setDataMonitoring(data);
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, [dataId]);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };
  const goBackToKoneksi = () => {
    const uidAktif = {
      alatMedical: 0,
    };
    Fire.database()
      .ref(`users/${user.uid}/`)
      .update(uidAktif)
      .catch((err) => {
        showMessage({
          message: err.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
    Fire.database()
      .ref(`dataRealtime/${dataId}/`)
      .update(nilaiKondisi)
      .then((data) => {
        navigation.navigate("MainAppPasien");
      })
      .catch((err) => {
        showMessage({
          message: err.message,
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  const saveDataMonitoring = () => {
    dispatch({ type: "SET_LOADING", value: true });
    const bb = dataMonitoring.beratBadan;
    const tb = dataMonitoring.tinggiBadan;
    const calBMI = parseInt(bb / Math.pow(tb / 100, 2), 10);
    const uidAktif = {
      alatMedical: 0,
    };

    const fixData = {
      tinggiBadan: dataMonitoring.tinggiBadan,
      beratBadan: dataMonitoring.beratBadan,
      detakJantung: dataMonitoring.detakJantung,
      tekananDarah: dataMonitoring.tekananDarah,
      bmi: calBMI,
      suhu: dataMonitoring.suhu,
      gender: user.gender,
    };

    const today = new Date();

    Fire.database()
      .ref(`users/${user.uid}/data/${setDateChat(today)}/`)
      .set(fixData)
      .then((res) => {
        dispatch({ type: "SET_LOADING", value: false });

        navigation.reset({
          index: 0,
          routes: [{ name: "MainAppPasien" }],
        });
        Fire.database()
          .ref(`users/${user.uid}/`)
          .update(uidAktif)
          .catch((err) => {
            showMessage({
              message: err.message,
              type: "default",
              backgroundColor: colors.error,
              color: colors.white,
            });
          });
        Fire.database()
          .ref(`dataRealtime/${dataId}/`)
          .update(nilaiKondisi)
          .catch((err) => {
            showMessage({
              message: err.message,
              type: "default",
              backgroundColor: colors.error,
              color: colors.white,
            });
          });
      })
      .catch((err) => {
        showError(err.message);
        dispatch({ type: "SET_LOADING", value: false });
      });
    sendBMI();
  };
  const sendBMI = () => {
    const dataBMI = {
      beratBadan: dataMonitoring.beratBadan,
      tinggiBadan: dataMonitoring.tinggiBadan,
      gender: user.gender,
    };

    Fire.database().ref(`users/${user.uid}/dataBMI/`).set(dataBMI);
  };

  return (
    <View style={styles.page}>
      <Header title="Data Realtime" onPress={goBackToKoneksi} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.padding}>
          <View style={styles.container}>
            <ItemMonitoring
              satuan="&deg;C"
              title="Suhu"
              data={dataMonitoring.suhu}
              gambar="suhu"
            />
            <ItemMonitoring
              satuan="mm/hg"
              title="Tekanan Darah"
              data={dataMonitoring.tekananDarah}
              gambar="tekanan"
            />
          </View>
          <Gap height={30} />
          <View style={styles.container}>
            <ItemMonitoring
              satuan="cm"
              title="Tinggi Badan"
              data={dataMonitoring.tinggiBadan}
              gambar="tinggi"
            />
            <ItemMonitoring
              satuan="Kg"
              title="Berat Badan"
              data={dataMonitoring.beratBadan}
              gambar="berat"
            />
          </View>
          <Gap height={30} />
          <View style={styles.single}>
            <ItemMonitoring
              satuan="BPM"
              title="Detak Jantung"
              data={dataMonitoring.detakJantung}
              gambar="detakJantung"
            />
          </View>
          <Gap height={13} />
          <View>
            <Text style={styles.textSaran}>
              disarankan untuk menyimpan data medical checkup, agar dokter bisa
              melihat data anda
            </Text>
          </View>
          <Gap height={15} />
          <Button
            type="secondary"
            text="secondary"
            title="Simpan"
            onPress={saveDataMonitoring}
          />
        </View>
        <Gap height={30} />
      </ScrollView>
    </View>
  );
};

export default RealtimeData;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 30,
    textAlign: "center",
  },
  single: {
    alignSelf: "center",
    marginBottom: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  padding: {
    marginTop: 40,
    paddingHorizontal: 35,
    flex: 1,
  },
  textSaran: {
    textAlign: "center",
  },
});
