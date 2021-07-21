import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Modals = () => {
  return (
    <View>
      <View style={styles.centered_view}>
        <View style={styles.warning_modal}>
          <View style={styles.warning_title}>
            <Text style={styles.text}>PERINGATAN!</Text>
          </View>
          <View style={styles.warning_body}>
            <Text style={styles.text}>
              Jika anda menutup konsultasi dengan pasien, sesi konsultasi di
              tutup dan pasien tidak bisa mengirim pesan.
            </Text>
            <Text style={styles.text}>
              apakah anda ingin mengakhiri Konsultasi dengan pasien anda ?
            </Text>
          </View>
          <View style={styles.modalsButton}>
            <TouchableOpacity
              onPress={() => SetshowWarning(false)}
              style={styles.warning_button}
            >
              <Text style={styles.textModals}>Cencel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={KirimDataAkhirKonsultasi}
              style={styles.warning_button}
            >
              <Text style={styles.textModals}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Modals;

const styles = StyleSheet.create({});
