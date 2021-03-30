import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Category1, Category2, Category3 } from "../../assets";

import {
  Category,
  Gap,
  HealthInfo,
  HomeProfile,
  RatedDoctor,
} from "../../components";
import { colors } from "../../utils";

const Dashboard = ({ navigation }) => {
  const [images] = useState([
    {
      id: 1,
      image: Category1,
    },
    {
      id: 2,
      image: Category2,
    },
    {
      id: 3,
      image: Category3,
    },
  ]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.pages}>
        <View style={styles.wrapperSection}>
          <HomeProfile onPress={() => navigation.navigate("UserProfile")} />
          <Text style={styles.welcome}>Selamat Pagi Shayna Melinda</Text>
          <Text style={styles.welcome2}>
            Ayo Lakukan konsultasi Dengan Dokter Terbaik
          </Text>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal>
              <View style={styles.category}>
                <Gap width={18} />
                {images.map((image) => {
                  return <Category key={image.id} image={image.image} />;
                })}
                <Gap width={8} />
              </View>
            </ScrollView>
          </View>
          <Gap height={25} />
          <Text style={styles.TopDoct}>Top Doctors</Text>
          <Gap height={8} />
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal>
              <View style={styles.topDokter}>
                <Gap width={18} />
                <RatedDoctor
                  onPress={() => navigation.navigate("DoctorProfile")}
                />
                <RatedDoctor />
                <RatedDoctor />
              </View>
            </ScrollView>
          </View>
        </View>
        <Gap height={20} />
        <Text style={styles.TopHealth}>Health Information</Text>
        <HealthInfo />
        <HealthInfo />
        <HealthInfo />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrapperScroll: {
    marginHorizontal: -18,
  },
  wrapperSection: {
    paddingHorizontal: 18,
  },
  pages: {
    paddingVertical: 30,
    backgroundColor: "#F3FFFE",
  },
  welcome: { fontSize: 15, color: colors.text.secondary, marginTop: 20 },
  welcome2: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 7,
  },
  category: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  topDokter: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  TopDoct: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.default,
  },
  TopHealth: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.default,
    marginHorizontal: 18,
  },
});
