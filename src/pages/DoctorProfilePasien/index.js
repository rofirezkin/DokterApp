import React, { useEffect, useState } from "react";

import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Garuda, Universitas } from "../../assets";
import { Button, Gap, Header, LikeAndExp, Profile } from "../../components";
import { Fire } from "../../config";

import { colors, getData } from "../../utils";

const DoctorProfilePasien = ({ navigation, route }) => {
  const detail = route.params;
  const statusKonsultasi = detail.status;
  const dataDoctor = detail.data;
  const [user, setUser] = useState({});
  const [dataAdmin, setDataAdmin] = useState({});
  const [dataMedical, setDataMedical] = useState("");

  if (statusKonsultasi) {
    const datafilter = statusKonsultasi.filter(
      (uid) =>
        (uid.data.status === "sukses" &&
          uid.data.uidDokter === dataDoctor.data.uid) ||
        (uid.data.status === "Belum dikonfirmasi" &&
          uid.data.uidDokter === dataDoctor.data.uid)
    );
    var dataKonsul = datafilter[0];
  } else {
  }

  useEffect(() => {
    let unmounted = false;
    getData("user").then((res) => {
      setUser(res);
    });
    Fire.database()
      .ref(`users/${user.uid}/statusKonsultasi/`)
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

  const ButtonKonsultasi = () => {
    if (dataDoctor.data.pembayaran === "Berbayar") {
      if (dataKonsul === undefined) {
        const detailPembayaran = {
          data: dataDoctor,
          status: statusKonsultasi,
        };
        return (
          <Button
            type="secondary"
            text="secondary"
            title="Lakukan Konsultasi "
            onPress={() => navigation.navigate("Pembayaran", detailPembayaran)}
          />
        );
      } else {
        if (dataKonsul.data.status === "sukses") {
          const chatting = {
            data: dataDoctor.data,
            status: dataKonsul.data.status,
            uidDokter: dataKonsul.data.uidDokter,
            dataMedical: dataMedical,
          };
          return (
            <Button
              type="secondary"
              text="secondary"
              title="Lakukan Konsultasi"
              onPress={() => navigation.navigate("ChattingPasien", chatting)}
            />
          );
        } else if (dataKonsul.data.status === "Belum dikonfirmasi") {
          return (
            <Button
              type="secondary"
              text="secondary"
              title="Lakukan Konsultasi"
              onPress={() => navigation.navigate("StatusPembayaran", dataAdmin)}
            />
          );
        }
      }
    }
    {
      const chatting = {
        data: dataDoctor.data,
        status: "sukses",
        dataMedical: dataMedical,
      };
      return (
        <Button
          type="secondary"
          text="secondary"
          title="Lakukan Konsultasi Langsung"
          onPress={() => navigation.navigate("ChattingPasien", chatting)}
        />
      );
    }
  };

  return (
    <View style={styles.page}>
      <Header title="Profil Dokter" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View>
          <Profile
            photo={{ uri: dataDoctor.data.photo }}
            profile
            name={dataDoctor.data.fullName}
            desc={dataDoctor.data.category}
          />
          {dataDoctor.data.pembayaran === "Berbayar" ? (
            <View>
              <Text style={styles.status}>Rp15.000</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.status}>GRATIS</Text>
            </View>
          )}

          <Gap height={10} />
          <Gap height={18} />
          <View style={styles.description}>
            <View style={styles.desc}>
              <View>
                <LikeAndExp
                  rate={dataDoctor.data.rate.ratePersentasi}
                  experienced={dataDoctor.data.pengalaman}
                />
              </View>
              <Text style={styles.nameDesc}>Tentang Saya</Text>
              <Text style={styles.about}>{dataDoctor.data.shortDesc}</Text>
              <Gap height={13} />
              <Text style={styles.nameDesc}>Tempat Kerja</Text>
              <Gap height={10} />
              <View style={styles.universitas}>
                <View style={styles.logoUniv}>
                  <Image source={Universitas} />
                </View>
                <View>
                  <Text style={styles.penjelasan}>
                    {`- ${dataDoctor.data.hospital}`}
                  </Text>
                </View>
              </View>
              <Gap height={13} />
              <Text style={styles.nameDesc}>Pendidikan Terakhir</Text>
              <Gap height={10} />
              <View style={styles.universitas}>
                <View style={styles.logoUniv}>
                  <Image source={Universitas} />
                </View>
                <View>
                  <Text style={styles.penjelasan}>
                    {`- ${dataDoctor.data.universitas}`}
                  </Text>
                </View>
              </View>
              <Gap height={13} />
              <Text style={styles.nameDesc}>Nomor STR</Text>
              <Gap height={10} />
              <View style={styles.universitas}>
                <View style={styles.logoUniv}>
                  <Image source={Garuda} style={styles.garuda} />
                </View>
                <View>
                  <Text style={styles.penjelasan}>
                    - {dataDoctor.data.nomorSTR}
                  </Text>
                </View>
              </View>
              <Gap height={20} />
              <ButtonKonsultasi />
              <Gap height={20} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorProfilePasien;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  univ: {
    color: colors.white,
    fontWeight: "200",
    textAlign: "center",
  },
  work: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    padding: 5,
    borderRadius: 5,
    alignSelf: "center",
  },
  imageWork: {
    marginTop: 3,
  },
  description: {
    backgroundColor: colors.background,
    height: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  desc: {
    padding: 23,
  },
  nameDesc: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  penjelasan: {
    fontWeight: "300",
    fontSize: 12,
    color: "#575757",
    flex: 1,
    textAlignVertical: "center",
    paddingLeft: 7,
  },
  universitas: {
    borderRadius: 10,
    padding: 7,
    backgroundColor: "#FFF4E8",
    flexDirection: "row",
  },
  logoUniv: {
    padding: 12,
    backgroundColor: "#FFBC11",
    borderRadius: 10,
  },
  status: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: colors.white,
    marginTop: 10,
  },
  about: {
    textAlign: "justify",
    fontWeight: "300",
    fontSize: 12,
    color: "#575757",
  },
  garuda: {
    width: 24,
    height: 24,
  },
});
