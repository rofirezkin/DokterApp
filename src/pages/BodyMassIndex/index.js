import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Desc, Gap, Header, ItemMonitoring } from "../../components";
import { Fire } from "../../config";
import { colors } from "../../utils";

const BodyMassIndex = ({ navigation, route }) => {
  const [dataBMI, setDataBMI] = useState({
    tinggiBadan: "0",
    beratBadan: "0",
  });
  const [desc, setDesc] = useState("-");
  const [kalkulasiBMI, setKalkulasiBMI] = useState("0");

  const dataId = route.params;
  useEffect(() => {
    let unmounted = false;
    Fire.database()
      .ref(`users/${dataId}/dataBMI/`)
      .on("value", (snapshot) => {
        const data = snapshot.val();

        if (data) {
          setDataBMI(data);
          const pria = [
            [0, 17, "kekurangan berat badan tingkat berat"],
            [17, 18, " kekurangan berat badan tingkat ringan"],
            [18, 25, "normal"],
            [25, 27, "kelebihan berat badan tingkat ringan"],
            [27, 99, "kelebihan berat badan tingkat berat"],
          ];
          const wanita = [
            [0, 16, "kekurangan berat badan tingkat berat"],
            [16, 17, " kekurangan berat badan tingkat ringan"],
            [17, 23, "normal"],
            [23, 27, "kelebihan berat badan tingkat ringan"],
            [27, 99, "kelebihan berat badan tingkat berat"],
          ];
          const tb = data.tinggiBadan;
          const bb = data.beratBadan;
          const jk = data.gender;
          const calBMI = bb / Math.pow(tb / 100, 2);
          const fixBMI = parseInt(calBMI, 10);

          const kategori = jk === "wanita" ? wanita : pria;

          kategori.forEach((element) => {
            if (fixBMI >= element[0] && fixBMI < element[1]) {
              setDesc(element[2]);
            }
          });
          if (!unmounted) {
            setKalkulasiBMI(fixBMI);
          }
        }
      });

    return () => {
      unmounted = true;
    };
  }, [dataId, kalkulasiBMI]);

  return (
    <View style={styles.page}>
      <Header
        title="Lihat Body Mass Index Anda"
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.item}>
            <ItemMonitoring
              type
              satuan="cm"
              title="Tinggi Badan"
              data={dataBMI.tinggiBadan}
              gambar="tinggi"
            />
            <ItemMonitoring
              satuan="kg"
              type
              title="Berat Badan"
              data={dataBMI.beratBadan}
              gambar="berat"
            />
            <ItemMonitoring
              type
              satuan=""
              title="BMI"
              data={kalkulasiBMI}
              gambar="bmi"
            />
          </View>
          <View style={styles.desc}>
            <View style={styles.cardRecomended}>
              <Text>Status BMI Anda</Text>
              <Gap height={5} />
              <Text
                style={styles.rekomendasitext}
              >{`Body Mass Index Anda dalam keadaan ${desc}`}</Text>
            </View>
            <Gap height={20} />
            <Desc nilaiBMI={kalkulasiBMI} jk={dataBMI.gender} />
          </View>
          <Gap height={20} />
        </View>
      </ScrollView>
    </View>
  );
};

export default BodyMassIndex;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    paddingTop: 18,
    paddingHorizontal: 30,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  desc: {
    marginTop: 30,
  },
  cardRecomended: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },

    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 6,
  },
  rekomendasitext: {
    color: "#799291",
  },
});
