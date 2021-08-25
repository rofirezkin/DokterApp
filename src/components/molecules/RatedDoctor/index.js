import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Hari, LikeDokter, TopDoct1, Waktu, Work } from "../../../assets";
import { colors } from "../../../utils";
import { Gap } from "../../atoms";

const RatedDoctor = ({
  onPress,
  name,
  desc,
  avatar,
  experienced,
  rate,
  metodePembayaran,
}) => {
  if (metodePembayaran) {
    return (
      <View style={styles.page(metodePembayaran)}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Image
              source={{ uri: avatar }}
              style={styles.avatar(metodePembayaran)}
            />
            <View style={styles.wrapperText}>
              <Text style={styles.name(metodePembayaran)}>{name}</Text>
              <Text style={styles.category}>{desc}</Text>

              <View style={styles.smallDesc}>
                <View style={styles.work}>
                  <View style={styles.direction1}>
                    <Image source={Work} />
                    <Gap width={4} />
                    <Text style={styles.pad}>{experienced}</Text>
                  </View>
                </View>
                {rate !== undefined && (
                  <View style={styles.work}>
                    <View style={styles.direction1}>
                      <Image source={LikeDokter} />
                      <Gap width={4} />
                      <Text style={styles.pad}>{`${rate}%`}</Text>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.spaceDate}>
                <View>
                  <Text style={styles.harga}>Rp15.000</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.page(metodePembayaran)}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatar(metodePembayaran)}
          />
          <View style={styles.wrapperText}>
            <Text style={styles.name(metodePembayaran)}>{name}</Text>
            <Text style={styles.category}>{desc}</Text>

            <View style={styles.smallDesc}>
              <View style={styles.work}>
                <View style={styles.direction1}>
                  <Image source={Work} />
                  <Gap width={4} />
                  <Text style={styles.pad}>{experienced}</Text>
                </View>
              </View>
              {rate !== undefined && (
                <View style={styles.work}>
                  <View style={styles.direction1}>
                    <Image source={LikeDokter} />
                    <Gap width={4} />
                    <Text style={styles.pad}>{`${rate}%`}</Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.spaceDate}>
              <View>
                <Text style={styles.harga}>Rp15.000</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RatedDoctor;

const styles = StyleSheet.create({
  page: (metodePembayaran) => ({
    width: metodePembayaran ? "100%" : 259,
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
  }),
  pad: {
    fontSize: 12,
  },
  harga: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  container: {
    flexDirection: "row",
  },
  wrapperText: {},
  avatar: (metodePembayaran) => ({
    width: metodePembayaran ? 70 : 60,
    height: metodePembayaran ? 100 : 100,
    borderRadius: 13,
    marginRight: 12,
  }),
  name: (metodePembayaran) => ({
    maxWidth: metodePembayaran ? 200 : 150,
    fontSize: metodePembayaran ? 18 : 13,
    fontWeight: metodePembayaran ? "bold" : "600",
    color: metodePembayaran ? colors.text.secondary : "#0A3745",
    marginTop: 2,
  }),
  category: {
    fontSize: 10,
    color: "#727272",
    marginTop: 2,
    marginBottom: 4,
  },
  work: {
    justifyContent: "center",
    padding: 2,
    backgroundColor: "#EEEEEE",
    marginRight: 5,
    borderRadius: 3,
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
  },
  imageIcon: {
    width: 15,
    height: 15,
  },
  smallDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 3,
  },
});
