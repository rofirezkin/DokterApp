import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Button, Gap, Header, ListData } from "../../components";
import { Fire } from "../../config";
import { colors } from "../../utils";

const SaveData = ({ route, navigation }) => {
  const dataParams = route.params;
  const dataMonitoring = dataParams.dataMonitor;
  console.log("dataParam", dataMonitoring.data);

  const deleteData = () => {
    Fire.database()
      .ref(`users/${dataParams.uidUser}/data/${dataMonitoring.id}`)
      .remove();
    showMessage({
      message: "Penghapusan Berhasil",
      type: "default",
      backgroundColor: "#27DE3A",
      color: colors.white,
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "MainAppPasien" }],
    });
  };
  return (
    <View style={styles.page}>
      <Header title="Monitoring Data" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {dataMonitoring.data !== undefined ? (
            <View>
              <ListData
                title="Suhu Tubuh"
                value={`${dataMonitoring.data.suhu}°C `}
              />
              <ListData
                title="Berat Badan"
                value={`${dataMonitoring.data.beratBadan} Kg`}
              />
              <ListData
                title="tinggi Badan"
                value={`${dataMonitoring.data.tinggiBadan} cm`}
              />
              <ListData
                title="Detak Jantung"
                value={`${dataMonitoring.data.detakJantung} bpm`}
              />
              <ListData
                title="Tekanan Darah"
                value={`${dataMonitoring.data.tekananDarah} mmHg`}
              />
              <ListData title="BMI" value={dataMonitoring.data.bmi} />
              <Gap height={7} />

              <Text
                style={styles.tanggal}
              >{`Tanggal Penyimpanan : ${dataMonitoring.id} `}</Text>
              <Gap height={20} />
              <View style={{ marginHorizontal: 20 }}>
                <Button
                  onPress={deleteData}
                  title="Hapus Data"
                  type="secondary"
                  text="secondary"
                />
                <Gap height={20} />
              </View>
            </View>
          ) : (
            <View>
              <ListData
                title="Suhu Tubuh"
                value={`${dataMonitoring.suhu}°C `}
              />
              <ListData
                title="Berat Badan"
                value={`${dataMonitoring.beratBadan} Kg`}
              />
              <ListData
                title="tinggi Badan"
                value={`${dataMonitoring.tinggiBadan} cm`}
              />
              <ListData
                title="Detak Jantung"
                value={`${dataMonitoring.detakJantung} bpm`}
              />
              <ListData
                title="Tekanan Darah"
                value={`${dataMonitoring.tekananDarah} mmHg`}
              />
              <ListData title="BMI" value={dataMonitoring.bmiPasien} />
              <Gap height={7} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default SaveData;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  tanggal: {
    marginTop: 20,
    textAlign: "center",
  },
});
