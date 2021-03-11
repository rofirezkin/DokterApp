import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header, Input, Button, Gap } from "../../components";
import { colors } from "../../utils";

const Register = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Header
        title="Register"
        onPress={() => navigation.navigate("GetStarted")}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Gap height={20} />
          <Input label="Full Name" />
          <Gap height={20} />
          <Input label="Kategori" />
          <Gap height={20} />
          <Input label="Universitas" />
          <Gap height={20} />
          <Input label="Nomor STR" />
          <Gap height={20} />
          <Input label="Email" />
          <Gap height={20} />
          <Input label="Password" />
          <Gap height={20} />
          <Button
            type="secondary"
            title="Continue"
            text="secondary"
            onPress={() => navigation.navigate("UploadPhoto")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.background, flex: 1 },
  content: {
    padding: 35,
    paddingTop: 0,
    backgroundColor: colors.background,
    flex: 1,
  },
});
