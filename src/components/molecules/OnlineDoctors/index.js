import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  DummyDoctor1,
  Like,
  LikeDokter,
  Pengalaman,
  Work,
} from "../../../assets";
import { colors } from "../../../utils";
import { Gap } from "../../atoms";

const OnlineDoctors = ({
  onPress,
  name,
  photo,
  desc,
  status,
  experience,
  rate,
  pembayaran,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.descrip}>{desc}</Text>
        <View style={styles.smallDesc}>
          <View style={styles.descWork}>
            <View>
              <Gap height={2} />
              <Image source={Work} />
            </View>
            <Text style={styles.nameDesc}>{experience}</Text>
          </View>
          <Gap width={30} />
          {rate.ratePersentasi !== undefined && (
            <View style={styles.descWork}>
              <View>
                <Gap height={2} />
                <Image source={LikeDokter} />
              </View>
              <Text style={styles.nameDesc}>{`${rate.ratePersentasi}%`}</Text>
            </View>
          )}
        </View>
        <View style={styles.spaceDate}>
          {pembayaran === "Berbayar" ? (
            <View>
              <Text style={styles.harga}>Rp15.000</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.harga}>GRATIS</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OnlineDoctors;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: colors.white,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 79,
    height: 100,
    borderRadius: 16,
    margin: 15,
  },
  name: {
    color: "#645B5B",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 15,
  },
  descrip: {
    marginTop: 5,
    color: "#808080",
  },
  status: {
    color: "#5CAF5B",
    fontSize: 10,
    marginTop: 3,
  },

  smallDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 6,
  },
  descWork: {
    backgroundColor: "#EEEEEE",
    padding: 3,
    flexDirection: "row",
  },
  nameDesc: {
    color: "#808080",
    fontSize: 13,
    marginLeft: 4,
  },
  harga: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
