import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../utils";
import { Gap } from "../../atoms";

const ListData = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity style={styles.page} onPress={onPress}>
      <Gap height={10} />
      <View style={styles.list}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.nilai}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListData;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  list: {
    backgroundColor: "#ECECEC",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
  },
  title: {
    color: "#616161",
    fontSize: 15,
    fontWeight: "bold",
  },
  nilai: {
    color: "#5F5F5F",
    fontSize: 18,
    fontWeight: "bold",
  },
});
