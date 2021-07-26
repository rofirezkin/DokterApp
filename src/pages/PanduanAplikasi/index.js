import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gap, Header, List } from "../../components";
import { colors } from "../../utils";

const PanduanAplikasi = ({ navigation }) => {
  return (
    <View style={styles.pages}>
      <Header title="Panduan Aplikasi" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Gap height={15} />
        <List
          name="Melihat Data Pasien"
          desc="Panduan Lengkap"
          type="next"
          icon="help"
          onPress={() =>
            navigation.navigate("PanduanDetail", "Melihat Data Pasien")
          }
        />
        <List
          name="Memberikan Resep Obat"
          desc="Panduan Lengkap"
          type="next"
          icon="help"
          onPress={() =>
            navigation.navigate("PanduanDetail", "Memberikan Resep Obat")
          }
        />
        <List
          name="Memberikan Catatan"
          desc="Panduan Lengkap"
          type="next"
          icon="help"
          onPress={() =>
            navigation.navigate("PanduanDetail", "Memberikan Catatan")
          }
        />
      </View>
    </View>
  );
};

export default PanduanAplikasi;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
