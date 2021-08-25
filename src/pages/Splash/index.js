import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Fire } from "../../config";
import Logo from "./logoNew.png";
const Splash = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged((user) => {
      console.log("userrr", user);
      setTimeout(() => {
        if (user) {
          if (user.emailVerified === true) {
            Fire.database()
              .ref(`users/${user.uid}`)
              .on("value", (snapshot) => {
                if (snapshot.val()) {
                  navigation.replace("MainAppPasien");
                } else {
                  Fire.database()
                    .ref(`doctors/${user.uid}`)
                    .on("value", (snapshot) => {
                      if (snapshot.val()) {
                        navigation.replace("MainApp");
                      } else
                        Fire.database()
                          .ref(`admin/`)
                          .on("value", (snapshot) => {
                            if (snapshot.val()) {
                              navigation.replace("DashboardAdmin");
                            }
                          });
                    });
                }
              });
          } else {
            navigation.replace("EmailVerification");
          }
        } else {
          navigation.replace("GetStarted");
        }
      }, 4000);
    });
    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.pages}>
      <Image style={styles.logo} source={Logo} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  pages: {
    backgroundColor: "#56AEAA",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 122,
    height: 107,
  },
  title: { fontSize: 20, fontWeight: "600", color: "white" },
});
