import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Koneksi, NullPhoto } from "../../assets";
import { Button, Gap, Header, Input } from "../../components";
import { Fire } from "../../config";
import { colors, getData } from "../../utils";

const KoneksiAlat = ({ navigation }) => {
  const [kondisi, setKondisi] = useState("");
  const [id, setId] = useState("");
  const [peringatan, setPeringatan] = useState(false);
  const [profile, setProfile] = useState({});
  useEffect(() => {
    let unmounted = false;
    getUserData();
    Fire.database()
      .ref("dataRealtime")
      .on("value", (snapshot) => {
        const nilaiKondisi = snapshot.val();
        if (!unmounted) {
          setKondisi(nilaiKondisi);
        }
      });
    return () => {
      unmounted = true;
    };
  }, []);

  const getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? { uri: res.photo } : NullPhoto;
      setProfile(res);
    });
  };

  const checking = () => {
    if (kondisi[id]) {
      if (kondisi[id].kondisi !== 1) {
        if (kondisi[id].statusAlat === "on") {
          const nilaiKondisi = {
            kondisi: 1,
          };
          const uidAktif = {
            alatMedical: id,
          };
          setId("");
          Fire.database()
            .ref(`dataRealtime/${id}/`)
            .update(nilaiKondisi)
            .catch((err) => {
              showMessage({
                message: err.message,
                type: "default",
                backgroundColor: colors.error,
                color: colors.white,
              });
            });
          Fire.database()
            .ref(`users/${profile.uid}/`)
            .update(uidAktif)
            .catch((err) => {
              showMessage({
                message: err.message,
                type: "default",
                backgroundColor: colors.error,
                color: colors.white,
              });
            });

          navigation.reset({
            index: 0,
            routes: [{ name: "RealtimeData", params: id }],
          });
          setPeringatan(false);
        } else {
          return showMessage({
            message: "Alat Anda tidak aktif",
            type: "default",
            backgroundColor: colors.error,
            color: colors.white,
          });
        }
      } else {
        return showMessage({
          message: "Alat anda sedang di pakai",
          type: "default",
          backgroundColor: colors.error,
          color: colors.white,
        });
      }
    } else {
      return showMessage({
        message: "ID yang anda masukan salah",
        type: "default",
        backgroundColor: colors.error,
        color: colors.white,
      });
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Koneksi Alat" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={Koneksi} style={styles.gambar} />
          <Text style={styles.id}>Masukan ID dari Alat Anda</Text>
          <Input
            placeholder="masukan ID alat"
            onChangeText={(value) => setId(value)}
            value={id}
          />
          <Gap height={15} />

          <Gap height={20} />
          <Button
            type="secondary"
            title="koneksikan"
            text="secondary"
            onPress={checking}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default KoneksiAlat;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  id: {
    textAlign: "center",
    marginTop: 15,
  },
  gambar: {
    width: 269,
    height: 295,
    alignSelf: "center",
  },
  container: {
    padding: 20,
  },
  peringatan: {
    textAlign: "center",
    color: colors.error,
  },
});
