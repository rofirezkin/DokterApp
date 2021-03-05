import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { ImageGetStarted } from "../../assets";
import { Button, Gap } from "../../components/atoms";

const GetStarted = () => {
  return (
    <>
      <View style={styles.pages}>
        <Text>fhfh</Text>
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
        <View>
          <Button title="Get Started" />
          <Gap height={12} />
          <Button title="Sign In" />
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
});
