import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { ImageGetStarted } from "../../assets";
import { Button, Gap } from "../../components/atoms";
import { colors } from "../../utils";

const GetStarted = ({ navigation }) => {
  return (
    <>
      <View style={styles.pages}>
        <Image source={ImageGetStarted} style={styles.image} />
      </View>
      <View style={styles.pageTwo}>
        <View style={styles.titleGeneral}>
          <Text style={styles.titleOne}>Free Online Chatting With</Text>
          <Text style={styles.titleOne}>certified doctors </Text>
          <Text style={styles.titleTwo}>
            Get free consultations with the best doctors
          </Text>
          <Text style={styles.titleTwo}>
            out there to understand your symptoms
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.text}>Get Started</Text>
          </TouchableOpacity>
          <Gap height={12} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.text}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  pageTwo: {
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: "#33B9B2",
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pages: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    flex: 1,
  },
  image: {
    marginTop: 40,
    width: 250,
    height: "90%",
  },
  titleGeneral: {
    alignItems: "center",
  },
  titleOne: {
    fontSize: 25,
    fontWeight: "600",
    alignItems: "center",
    color: "white",
    fontFamily: "Nunito-SemiBold",
  },
  titleTwo: {
    fontSize: 15,
    color: "#DEDEDE",
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
});
