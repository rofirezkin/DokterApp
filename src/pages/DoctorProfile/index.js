import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Garuda, Universitas, Work } from "../../assets";
import { Button, Gap, Header, Profile } from "../../components";
import { colors } from "../../utils";

const DoctorProfile = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Header title="Profil Dokter" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View>
          <Profile profile name="dr. Brooklyn Sam" desc="Dokter Umum" />
          <Gap height={5} />
          <Text style={styles.univ}>
            S1 Kedokteran, Universitas Sebelas Maret
          </Text>
          <Text style={styles.status}>Sedang Buka Konsultasi</Text>
          <Gap height={10} />
          <Gap height={18} />
          <View style={styles.description}>
            <View style={styles.desc}>
              <Text style={styles.nameDesc}>Tentang Saya</Text>
              <Text style={styles.about}>
                Saya Adalah Dokter Di Rumah Sakit Sari Asih Serang, keseharian
                saya selalu melakukan pemeriksaan kepada pasien pasien yang
                mempunyai penyakit ringan, dan saya juga membuka konsultasi
                secara online di aplikasi Adadokter
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
                  <Text style={styles.penjelasan}>- 90949095465868</Text>
                </View>
              </View>
              <Gap height={20} />
              <Button
                type="secondary"
                text="secondary"
                title="Lakukan Konsultasi"
                onPress={() => navigation.navigate("Chatting")}
              />
              <Gap height={20} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorProfile;

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
