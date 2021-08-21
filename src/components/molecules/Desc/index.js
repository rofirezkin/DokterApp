import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../utils";
import { Gap } from "../../atoms";

const Desc = ({ nilaiBMI, jk }) => {
  const [rekomendasi, setRekomendasi] = useState("0");

  useEffect(() => {
    if (jk === "pria") {
      if (nilaiBMI > 0) {
        if (nilaiBMI >= 25) {
          setRekomendasi(
            "Melakukan olahraga akan membantu mengurangi risiko terkena penyakit yang disebabkan obesitas. Studi yang dilakukan American College of Sports Medicine (ACSM) meneliti berbagai rekomendasi berapa jumlah waktu latihan yang dibutuhkan untuk menurunkan berat badan. Hasil penelitian merekomendasikan untuk melakukan olahraga  ringan hingga berat setidaknya 150-250 menit dalam seminggu. ACSM juga menyatakan lebih banyak latihan akan lebih baik lagi. Untuk  mencapai penurunan berat badan yang signifikan, ACSM merekomendasikan olahraga lebih dari 250 menit per minggu. Selain itu, jangan lupa untuk menjalankan pola makan sehat yang juga dapat membantu mengendalikan berat badan."
          );
        } else if (nilaiBMI >= 18 && nilaiBMI < 25) {
          setRekomendasi(
            "Anda berhasil menjaga berat badan tetap ideal, untuk menjaga berat badan anda agar tetap ideal di sarankan melakukan olahraga di tengah kesibukan anda, agar tidak bosan, cobalah kelas aerobik baru atau jenis olahraga baru"
          );
        } else if (nilaiBMI >= 17 && nilaiBMI < 18) {
          setRekomendasi(
            "Olahraga secara rutin tidak hanya dilakukan untuk menurunkan berat badan, tetapi juga menambah berat badan. Dengan rutin berolahraga, tubuh akan membentuk lebih banyak jaringan otot dan memangkas kelebihan lemak. Jika diikuti dengan pola makan sehat, rutin berolahraga bisa membantu Anda mencapai berat badan yang lebih ideal."
          );
        } else if (nilaiBMI < 17) {
          setRekomendasi(
            "Untuk menambah berat badan, Anda perlu tambahan asupan kalori dalam menu makan sehari-hari. Pilihlah sumber kalori tambahan yang sehat, misalnya dengan taburan keju parut pada roti, mentega pada tumisan, atau krim dan susu pada sup. Meski demikian, Anda perlu berhati-hati dalam memilih makanan penambah kalori agar tidak mengakibatkan kelebihan gula darah, garam, dan kolesterol, yang dapat mengganggu kesehatan tubuh.Untuk menambah berat badan, Anda perlu tambahan asupan kalori dalam menu makan sehari-hari. Pilihlah sumber kalori tambahan yang sehat, misalnya dengan taburan keju parut pada roti, mentega pada tumisan, atau krim dan susu pada sup. Meski demikian, Anda perlu berhati-hati dalam memilih makanan penambah kalori agar tidak mengakibatkan kelebihan gula darah, garam, dan kolesterol, yang dapat mengganggu kesehatan tubuh."
          );
        }
      } else {
        setRekomendasi("process");
      }
    } else {
      if (nilaiBMI >= 23) {
        setRekomendasi(
          "Melakukan olahraga akan membantu mengurangi risiko terkena penyakit yang disebabkan obesitas. Studi yang dilakukan American College of Sports Medicine (ACSM) meneliti berbagai rekomendasi berapa jumlah waktu latihan yang dibutuhkan untuk menurunkan berat badan. Hasil penelitian merekomendasikan untuk melakukan olahraga  ringan hingga berat setidaknya 150-250 menit dalam seminggu. ACSM juga menyatakan lebih banyak latihan akan lebih baik lagi. Untuk  mencapai penurunan berat badan yang signifikan, ACSM merekomendasikan olahraga lebih dari 250 menit per minggu. Selain itu, jangan lupa untuk menjalankan pola makan sehat yang juga dapat membantu mengendalikan berat badan."
        );
      } else if (nilaiBMI >= 17 && nilaiBMI < 23) {
        setRekomendasi(
          "Anda berhasil menjaga berat badan tetap ideal, untuk menjaga berat badan anda agar tetap ideal di sarankan melakukan olahraga di tengah kesibukan anda, agar tidak bosan, cobalah kelas aerobik baru atau jenis olahraga baru"
        );
      } else if (nilaiBMI >= 16 && nilaiBMI < 17) {
        setRekomendasi(
          "Olahraga secara rutin tidak hanya dilakukan untuk menurunkan berat badan, tetapi juga menambah berat badan. Dengan rutin berolahraga, tubuh akan membentuk lebih banyak jaringan otot dan memangkas kelebihan lemak. Jika diikuti dengan pola makan sehat, rutin berolahraga bisa membantu Anda mencapai berat badan yang lebih ideal."
        );
      } else if (nilaiBMI > 0 && nilaiBMI < 16) {
        setRekomendasi(
          "Untuk menambah berat badan, Anda perlu tambahan asupan kalori dalam menu makan sehari-hari. Pilihlah sumber kalori tambahan yang sehat, misalnya dengan taburan keju parut pada roti, mentega pada tumisan, atau krim dan susu pada sup. Meski demikian, Anda perlu berhati-hati dalam memilih makanan penambah kalori agar tidak mengakibatkan kelebihan gula darah, garam, dan kolesterol, yang dapat mengganggu kesehatan tubuh.Untuk menambah berat badan, Anda perlu tambahan asupan kalori dalam menu makan sehari-hari. Pilihlah sumber kalori tambahan yang sehat, misalnya dengan taburan keju parut pada roti, mentega pada tumisan, atau krim dan susu pada sup. Meski demikian, Anda perlu berhati-hati dalam memilih makanan penambah kalori agar tidak mengakibatkan kelebihan gula darah, garam, dan kolesterol, yang dapat mengganggu kesehatan tubuh."
        );
      } else {
        setRekomendasi("process");
      }
    }
  }, [nilaiBMI, jk]);

  return (
    <View style={styles.card}>
      <Text>Rekomendasi Untuk Anda</Text>
      <Gap height={5} />
      <Text style={styles.rekomendasitext}>{rekomendasi}</Text>
    </View>
  );
};

export default Desc;

const styles = StyleSheet.create({
  card: {
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
    textAlign: "justify",
  },
});
