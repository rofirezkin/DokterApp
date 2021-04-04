import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { TambahGambar } from "../../assets";
import { Button, Gap, Header } from "../../components";
import { colors } from "../../utils";

const UpdateStatus = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <Header title="Buat Artikel" onPress={() => navigation.goBack()} />
      <Gap height={30} />
      <View style={styles.container}>
        <View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Tulis Artikel Anda disini"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <Gap height={15} />
          <TouchableOpacity>
            <View style={styles.tambahFoto}>
              <Text>Tambah Foto</Text>
              <Image source={TambahGambar} />
            </View>
          </TouchableOpacity>
        </View>
        <Button title="Update Status" type="secondary" text="secondary" />
        <Gap height={10} />
      </View>
    </View>
  );
};

export default UpdateStatus;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.background,
  },
  textAreaContainer: {
    borderColor: "#BCBCBC",
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 200,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  tambahFoto: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: colors.border,
    alignSelf: "center",
    alignItems: "center",
  },
});
