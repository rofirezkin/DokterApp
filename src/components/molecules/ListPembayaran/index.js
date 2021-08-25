import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const ListPembayaran = ({ data, key, onPress }) => {
  return (
    <View key={key}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.page}>
          <View style={styles.container}>
            <Image source={{ uri: data.photo }} style={styles.avatar} />
            <View style={styles.wrapperText}>
              <Text style={styles.name}>{data.fullName}</Text>
              <Text style={styles.category}>{data.category}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListPembayaran;

const styles = StyleSheet.create({
  page: {
    width: "100%",
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

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 60 / 2,
    marginRight: 12,
  },
  name: {
    maxWidth: 200,
    fontSize: 18,
    fontWeight: "bold",
    color: "#727272",
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
  },
  imageIcon: {
    width: 15,
    height: 15,
  },
  smallDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 15,
  },

  nameDesc: {
    color: "#808080",
    fontSize: 13,
    marginLeft: 4,
  },
});
