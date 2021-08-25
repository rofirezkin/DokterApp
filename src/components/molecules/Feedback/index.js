import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  LikeDokter,
  LikeDokterFeedback,
  UnlikeDokter,
  UnlikeDokterFeedback,
} from "../../../assets";
import { Fire } from "../../../config";

const Feedback = ({ uidDokter, rate, navigation, uidPasien }) => {
  const [rateDokter, setRateDokter] = useState({});

  useEffect(() => {
    let unmounted = false;
    Fire.database()
      .ref(`doctors/${uidDokter}/rate/`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (!unmounted) {
            setRateDokter(data);
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, [uidDokter]);

  const KirimDataRateLike = () => {
    if (rateDokter === "0") {
      const nilaiPersen = ((rateDokter + 1) / 1) * 100;
      const sendDataRate = {
        ratePersentasi: nilaiPersen,
        jumlah: 1,
        like: 1,
      };

      Fire.database().ref(`doctors/${uidDokter}/rate`).set(sendDataRate);
      Fire.database().ref(`verifikasi/${uidDokter}_${uidPasien}`).remove();
      Fire.database()
        .ref(`users/${uidPasien}/statusKonsultasi/${uidDokter}`)
        .remove();
      const kirimDataSuccess = {
        data: "Anda Berhasil Mengirimkan Feedback",
      };
      navigation.reset({
        index: 0,
        routes: [{ name: "Success", params: kirimDataSuccess }],
      });
    } else {
      const nilaiPersen = parseInt(
        ((rateDokter.like + 1) / (rateDokter.jumlah + 1)) * 100,
        10
      );
      const sendDataRate = {
        ratePersentasi: nilaiPersen,
        jumlah: rateDokter.jumlah + 1,
        like: rateDokter.like + 1,
      };

      Fire.database().ref(`verifikasi/${uidDokter}_${uidPasien}`).remove();
      Fire.database()
        .ref(`users/${uidPasien}/statusKonsultasi/${uidDokter}`)
        .remove();
      Fire.database().ref(`doctors/${uidDokter}/rate`).update(sendDataRate);
      const kirimDataSuccess = {
        data: "Anda Berhasil Mengirimkan Feedback",
      };
      navigation.reset({
        index: 0,
        routes: [{ name: "Success", params: kirimDataSuccess }],
      });
    }
  };
  const KirimDataRateUnlike = () => {
    if (rateDokter === "0") {
      const sendDataRate = {
        ratePersentasi: 0,
        jumlah: 1,
        like: 0,
      };

      Fire.database().ref(`doctors/${uidDokter}/rate`).set(sendDataRate);
      Fire.database().ref(`verifikasi/${uidDokter}_${uidPasien}`).remove();
      Fire.database()
        .ref(`users/${uidPasien}/statusKonsultasi/${uidDokter}`)
        .remove();
      const kirimDataSuccess = {
        data: "Anda Berhasil Mengirimkan Feedback",
      };
      navigation.reset({
        index: 0,
        routes: [{ name: "Success", params: kirimDataSuccess }],
      });
    } else {
      const nilaiPersen = parseInt(
        (rateDokter.like / (rateDokter.jumlah + 1)) * 100,
        10
      );

      const sendDataRate = {
        ratePersentasi: nilaiPersen,
        jumlah: rateDokter.jumlah + 1,
        like: rateDokter.like,
      };

      Fire.database().ref(`verifikasi/${uidDokter}_${uidPasien}`).remove();
      Fire.database().ref(`doctors/${uidDokter}/rate`).update(sendDataRate);
      Fire.database()
        .ref(`users/${uidPasien}/statusKonsultasi/${uidDokter}`)
        .remove();
      const kirimDataSuccess = {
        data: "Anda Berhasil Mengirimkan Feedback",
      };
      navigation.reset({
        index: 0,
        routes: [{ name: "Success", params: kirimDataSuccess }],
      });
    }
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.like}>
          <TouchableOpacity onPress={KirimDataRateUnlike}>
            <Image source={UnlikeDokterFeedback} style={styles.feedback} />
            <Text style={styles.textLike}>Unlike</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.like}>
          <TouchableOpacity onPress={KirimDataRateLike}>
            <Image source={LikeDokterFeedback} style={styles.feedback} />
            <Text style={styles.textLike}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textLike: {
    textAlign: "center",
  },
  like: {
    paddingHorizontal: 20,
  },
  feedback: {
    width: 57,
    height: 60,
  },
});
