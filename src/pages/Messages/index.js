import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from "../../assets";
import { List } from "../../components";
import { colors } from "../../utils";

const Messages = ({ navigation }) => {
  const [doctors] = useState([
    {
      id: 1,
      profile: DummyDoctor1,
      name: "Alexander Jannie",
      desc: "Baik ibu, terima kasih banyak atas wakt...",
    },
    {
      id: 2,
      profile: DummyDoctor3,
      name: "Nairobi Putri Hayza",
      desc: "Oh tentu saja tidak karena jeruk it...",
    },
    {
      id: 3,
      profile: DummyDoctor2,
      name: "John McParker Steve",
      desc: "Oke menurut pak dokter bagaimana unt...",
    },
  ]);
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Messages</Text>
      {doctors.map((doctor) => {
        return (
          <List
            onPress={() => navigation.navigate("Chatting")}
            key={doctor.id}
            profile={doctor.profile}
            name={doctor.name}
            desc={doctor.desc}
          />
        );
      })}
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.default,
    marginTop: 30,
    textAlign: "center",
  },
});
