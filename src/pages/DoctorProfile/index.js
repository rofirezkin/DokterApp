import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Garuda, Universitas, Work } from "../../assets";
import { Button, Gap, Header, Profile } from "../../components";
import { colors } from "../../utils";

const DoctorProfile = ({ navigation, route }) => {
  const dataDoctor = route.params;
  return (
    <View style={styles.page}>
      <Header title="Profil Dokter" onPress={() => navigation.goBack()} />

      <View style={styles.doublePage}>
        <View>
          <Profile
            photo={{ uri: dataDoctor.data.photo }}
            profile
            name={dataDoctor.data.fullName}
            desc={dataDoctor.data.category}
          />
          <Gap height={5} />
          <Text style={styles.univ}>{dataDoctor.data.universitas}</Text>
          <Text style={styles.status}>Sedang Buka Konsultasi</Text>

          <Gap height={10} />
        </View>
        <View style={styles.description}>
          <View style={styles.desc}>
            <Text style={styles.nameDesc}>Tentang Saya</Text>
            <Text style={styles.about}>
              Saya Adalah Dokter Di Rumah Sakit Sari Asih Serang, keseharian
              saya selalu melakukan pemeriksaan kepada pasien pasien yang
              mempunyai penyakit ringan, dan saya juga membuka konsultasi secara
              online di aplikasi Adadokter
            </Text>
            <Gap height={13} />
            <Text style={styles.nameDesc}>Tempat Kerja</Text>
            <Gap height={10} />
            <View style={styles.universitas}>
              <View style={styles.logoUniv}>
                <Image source={Universitas} />
              </View>
              <View>
                <Text style={styles.penjelasan}>
                  - Rumah Sakit Sari Asih Serang
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  doublePage: {
    justifyContent: "space-between",
    flex: 1,
  },
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
    fontWeight: "600",
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
