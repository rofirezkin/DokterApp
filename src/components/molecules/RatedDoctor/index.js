import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Hari, TopDoct1, Waktu, Work } from "../../../assets";
import { Gap } from "../../atoms";

const RatedDoctor = ({ onPress }) => {
  return (
    <View style={styles.page}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Image source={TopDoct1} style={styles.avatar} />
          <View style={styles.wrapperText}>
            <Text style={styles.name}>Dr. Reza Adrian</Text>
            <Text style={styles.category}>Dokter Umum - RSUD Banten</Text>
            <View style={styles.work}>
              <View style={styles.direction1}>
                <Image source={Work} />
                <Gap width={4} />
                <Text style={styles.pad}>2 Tahun</Text>
              </View>
            </View>
          </View>
        </View>
        <Gap height={2} />
        <Text style={styles.name}>Hari & Waktu</Text>
        <View style={styles.spaceDate}>
          <View style={styles.work}>
            <View style={styles.direction}>
              <Image source={Hari} style={styles.imageIcon} />
              <Gap width={4} />
              <Text style={styles.pad}>Senin - Sabtu</Text>
            </View>
          </View>
          <View style={styles.work}>
            <View style={styles.direction}>
              <Image source={Waktu} style={styles.imageIcon} />
              <Gap width={4} />
              <Text style={styles.pad}>12.00 - 16.00</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RatedDoctor;

const styles = StyleSheet.create({
  page: {
    marginRight: 15,
    marginBottom: 10,
    marginTop: 5,
    alignSelf: "flex-start",
    padding: 13,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  pad: {
    fontSize: 12,
  },
  container: {
    flexDirection: "row",
  },
  wrapperText: {},
  avatar: { width: 60, height: 60, borderRadius: 50 / 2, marginRight: 12 },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0A3745",
    marginTop: 2,
  },
  category: {
    fontSize: 10,
    color: "#727272",
    marginTop: 2,
    marginBottom: 4,
  },
  work: {
    justifyContent: "center",
    padding: 2,
  },
  direction: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
  direction1: {
    flexDirection: "row",

    padding: 2,
  },
  spaceDate: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageIcon: {
    width: 15,
    height: 15,
  },
});
