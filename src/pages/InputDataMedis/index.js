import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Gap, Header, Input } from "../../components";
import { Fire } from "../../config";
import { colors, getData, setDateChat, showError } from "../../utils";

import { useDispatch } from "react-redux";

const InputDataMedis = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [dataMedis, setDataMedis] = useState({
    beratBadan: "",
    bmi: 0,
    detakJantung: "",
    suhu: "",
    tekananDarah: "",
    tinggiBadan: "",
  });

  const changeText = (key, value) => {
    setDataMedis({
      ...dataMedis,
      [key]: value,
    });
  };

  useEffect(() => {
    getDataUserFromLocal();
  }, []);

  const getDataUserFromLocal = () => {
    getData("user").then((res) => {
      setUser(res);
    });
  };
  const saveDataMonitoring = () => {
    if (
      dataMedis.beratBadan !== "" &&
      dataMedis.tinggiBadan !== "" &&
      dataMedis.suhu !== ""
    ) {
      dispatch({ type: "SET_LOADING", value: true });
      if (dataMedis.beratBadan === "") {
        dataMedis.beratBadan = "0";
      }
      if (dataMedis.detakJantung === "") {
        dataMedis.detakJantung = "0";
      }
      if (dataMedis.suhu === "") {
        dataMedis.suhu = "0";
      }
      if (dataMedis.tekananDarah === "") {
        dataMedis.tekananDarah = "0";
      }
      if (dataMedis.tinggiBadan === "") {
        dataMedis.tinggiBadan = "0";
      }

      const bb = dataMedis.beratBadan;
      const tb = dataMedis.tinggiBadan;
      if (bb > 0 && tb > 0) {
        var calBMI = parseInt(bb / Math.pow(tb / 100, 2), 10);
      } else {
        var calBMI = dataMedis.bmi;
      }

      const fixData = {
        tinggiBadan: dataMedis.tinggiBadan,
        beratBadan: dataMedis.beratBadan,
        detakJantung: dataMedis.detakJantung,
        tekananDarah: dataMedis.tekananDarah,
        bmi: calBMI,
        suhu: dataMedis.suhu,
        gender: user.gender,
      };

      const today = new Date();

      console.log("data medis", fixData);
      Fire.database()
        .ref(`users/${user.uid}/data/${setDateChat(today)}/`)
        .set(fixData)
        .then((res) => {
          dispatch({ type: "SET_LOADING", value: false });
          navigation.replace("MainAppPasien");
        })
        .catch((err) => {
          showError(err.message);
          dispatch({ type: "SET_LOADING", value: false });
        });
      sendBMI();
    } else {
      showError("Anda belum mengisi form");
    }
  };

  const sendBMI = () => {
    const dataBMI = {
      beratBadan: dataMedis.beratBadan,
      tinggiBadan: dataMedis.tinggiBadan,
      gender: user.gender,
    };

    Fire.database().ref(`users/${user.uid}/dataBMI/`).set(dataBMI);
  };

  return (
    <View style={styles.page}>
      <ScrollView>
        <Header
          title="Input Data Medis Anda"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <Text style={styles.inputdata}>
            Input Data Medis hanya menggunakan angka
          </Text>
          <Text>*Wajid diisi</Text>
          <Gap height={23} />
          <Input
            placeholder="Opsional Suhu Badan (°C) "
            value={dataMedis.suhu}
            label="Suhu Badan (°C) *"
            onChangeText={(value) => changeText("suhu", value)}
          />
          <Gap height={23} />
          <Input
            placeholder="Opsional Berat Badan (Kg)"
            value={dataMedis.beratBadan}
            label="Berat Badan (Kg) *"
            onChangeText={(value) => changeText("beratBadan", value)}
          />
          <Gap height={23} />
          <Input
            placeholder="Opsional Tinggi Badan (cm) "
            value={dataMedis.tinggiBadan}
            label="Tinggi Badan (cm) *"
            onChangeText={(value) => changeText("tinggiBadan", value)}
          />
          <Gap height={23} />
          <Input
            placeholder="Opsional Tekanan Darah (mmHg)"
            value={dataMedis.tekananDarah}
            label="Tekanan Darah (mmHg)"
            onChangeText={(value) => changeText("tekananDarah", value)}
          />
          <Gap height={23} />
          <Input
            placeholder="Opsional Detak Jantung (bpm)"
            value={dataMedis.detakJantung}
            label="Detak Jantung (bpm)"
            onChangeText={(value) => changeText("detakJantung", value)}
          />
          <Gap height={15} />
          <Button
            type="secondary"
            text="secondary"
            title="Simpan"
            onPress={saveDataMonitoring}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default InputDataMedis;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    marginHorizontal: 18,
    marginTop: 18,
  },
  inputdata: {
    color: colors.error,
  },
});
