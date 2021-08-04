import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { Fire } from "../../../config";
import { colors, setDateChat, showError } from "../../../utils";
import { Gap } from "../../atoms";

const Modals = ({
  type,
  showWarningFalse,
  visible,
  onRequestClose,
  onPress,
  dataDoctor,
  user,
  navigation,
  setSymptoms,
  setAdvice,
  setDiagnosis,
  symptoms,
  advice,
  diagnosis,
}) => {
  //catatan

  const KirimDataAkhirKonsultasi = () => {
    const kirimData = {
      status: "feedback",
    };
    Fire.database()
      .ref(
        `users/${dataDoctor.data.uid}/statusKonsultasi/${dataDoctor.uidDokter}`
      )
      .update(kirimData);
    Fire.database()
      .ref(`verifikasi/${dataDoctor.uidDokter}_${dataDoctor.id}`)
      .remove();
    navigation.reset({
      index: 0,
      routes: [{ name: "Success" }],
    });
  };

  return (
    <>
      {type === "tutup" && (
        <View>
          <Modal
            visible={visible}
            transparent
            onRequestClose={onRequestClose}
            animationType="slide"
            hardwareAccelerated
          >
            <View style={styles.centered_view}>
              <View style={styles.warning_modal}>
                <View style={styles.warning_title}>
                  <Text style={styles.text}>PERINGATAN!</Text>
                </View>
                <View style={styles.warning_body}>
                  <Text style={styles.text}>
                    Jika anda menutup konsultasi dengan pasien, sesi konsultasi
                    di tutup dan pasien tidak bisa mengirim pesan.
                  </Text>
                  <Text style={styles.text}>
                    apakah anda ingin mengakhiri Konsultasi dengan pasien anda ?
                  </Text>
                </View>
                <View style={styles.modalsButton}>
                  <TouchableOpacity
                    onPress={showWarningFalse}
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
          </Modal>
        </View>
      )}
      {type === "catatan" && (
        <Modal
          visible={visible}
          transparent
          onRequestClose={onRequestClose}
          animationType="slide"
          hardwareAccelerated
        >
          <View style={styles.centered_view}>
            <View style={styles.warning_modal_catatan}>
              <View style={styles.warning_title_cttn}>
                <Text style={styles.text}>Buat Catatan</Text>
              </View>
              <View style={styles.warning_body_catatan}>
                <Gap height={8} />
                <Text>Symptoms</Text>
                <TextInput
                  onChangeText={setSymptoms}
                  value={symptoms}
                  style={styles.judul}
                  placeholder="patient symptoms"
                />
                <Gap height={8} />
                <Text>Possible Diagnosis</Text>
                <TextInput
                  onChangeText={setDiagnosis}
                  value={diagnosis}
                  style={styles.judul}
                  placeholder="patient diagnosis"
                />
                <Gap height={8} />
                <Text>Advice</Text>
                <TextInput
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder="advice for patients"
                  placeholderTextColor="grey"
                  numberOfLines={2}
                  multiline={true}
                  onChangeText={setAdvice}
                  value={advice}
                />
              </View>
              <View style={styles.modalsButton}>
                <TouchableOpacity
                  onPress={showWarningFalse}
                  style={styles.warning_button}
                >
                  <Text style={styles.textModals}>Cencel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPress}
                  style={styles.warning_button}
                >
                  <Text style={styles.textModals}>Kirim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {type === "lihat data" && (
        <Modal
          visible={visible}
          transparent
          onRequestClose={onRequestClose}
          animationType="slide"
          hardwareAccelerated
        >
          <View style={styles.centered_view}>
            <View style={styles.warning_modal}>
              <View style={styles.warning_title}>
                <Text style={styles.text}>PERINGATAN!</Text>
              </View>
              <View style={styles.warning_body}>
                <Text style={styles.text}>
                  Anda disarankan untuk melihat data medical checkup pasien.
                  dengan melihat data medical checkup, anda terbantu untuk
                  mendiagnosa penyakit pasien
                </Text>
                <Text style={styles.text}>
                  apakah anda ingin melihat data medical checkup pasien ?
                </Text>
              </View>
              <View style={styles.modalsButton}>
                <TouchableOpacity
                  onPress={showWarningFalse}
                  style={styles.warning_button}
                >
                  <Text style={styles.textModals}>Cencel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPress}
                  style={styles.warning_button}
                >
                  <Text style={styles.textModals}>Lihat Data</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default Modals;

const styles = StyleSheet.create({
  //datamodals
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: "#ffffff",

    borderRadius: 10,
  },
  warning_modal_catatan: {
    width: 300,
    height: 400,
    backgroundColor: "#ffffff",

    borderRadius: 10,
  },

  warning_title: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3E494",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  warning_title_cttn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  warning_body: {
    height: 200,

    paddingHorizontal: 14,
  },
  warning_body_catatan: {
    height: 300,

    paddingHorizontal: 14,
  },
  warning_button: {
    backgroundColor: colors.primary,
    width: 100,
    borderRadius: 10,
  },
  text: {
    color: "#000000",
    fontSize: 13,
    margin: 10,
    textAlign: "center",
  },
  textModals: {
    color: colors.white,
    fontSize: 13,
    margin: 10,
    textAlign: "center",
  },
  button: {
    width: 150,
    height: 50,
    alignItems: "center",
  },
  modalsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },

  //catatan
  judul: {
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
  },
  textArea: {
    borderRadius: 4,
    backgroundColor: "#F3F3F3",
    justifyContent: "flex-start",
    textAlignVertical: "top",
    height: 100,
  },
  catatanHasil: {
    paddingHorizontal: 18,
  },
  buttonCatatanHasil: {
    backgroundColor: colors.border,
    borderRadius: 8,
  },
  textHasilCatatan: {
    textAlign: "center",
    padding: 15,
    color: colors.primary,
  },
});
