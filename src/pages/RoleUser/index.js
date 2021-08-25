import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Gap, Header } from "../../components";

const RoleUser = ({ navigation, route }) => {
  const role = route.params;
  console.log("rolleee", role);
  return (
    <View style={styles.page}>
      <Header title="Pilih Role Anda" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={styles.roleUser}>
          <Text>Role User</Text>
        </View>
        {role === "Register" && (
          <View>
            <Gap height={20} />
            <Button
              type="secondary"
              text="secondary"
              title="Register Sebagai Pasien"
              onPress={() => {
                navigation.navigate("Register", "users");
              }}
            />
            <Gap height={20} />
            <Button
              type="secondary"
              text="secondary"
              title="Register Sebagai Dokter"
              onPress={() => {
                navigation.navigate("Register", "doctors");
              }}
            />
          </View>
        )}
        {role === "Masuk" && (
          <View>
            <Gap height={20} />
            <Button
              type="secondary"
              text="secondary"
              title="Masuk Sebagai Pasien"
              onPress={() => {
                navigation.navigate("Login", "users");
              }}
            />
            <Gap height={20} />
            <Button
              type="secondary"
              text="secondary"
              title="Masuk Sebagai Dokter"
              onPress={() => {
                navigation.navigate("Login", "doctors");
              }}
            />
            <Gap height={20} />
            <Button
              type="secondary"
              text="secondary"
              title="Masuk Sebagai Admin"
              onPress={() => {
                navigation.navigate("Login", "admin");
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default RoleUser;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F3FFFE",
    flex: 1,
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  roleUser: {
    alignSelf: "center",
  },
});
