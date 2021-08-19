import React from "react";
import { WebView } from "react-native";
import { Platform } from "react-native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { KTP } from "../../assets";
import { Gap, Header } from "../../components";
import { colors } from "../../utils";

const PanduanDetail = ({ navigation, route }) => {
  const dataPanduan = route.params;

  return (
    <View style={styles.page}>
      <Header title="Panduan Lengkap" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.textJudul}>{`Panduan ${dataPanduan}`}</Text>
          <Gap height={15} />
          {dataPanduan === "Melihat Data Pasien" && (
            <View>
              <Text>1. Pertama Masuk ke Halaman Messages</Text>
              <Gap height={7} />
              <Text>
                2. pilih pasien untuk konsultasi lalu akan masuk kehalaman
                chatting
              </Text>
              <Gap height={7} />
              <Text>
                3. klik lihat data pada bottom bar di halaaman chatting
              </Text>
              <Gap height={7} />
              <Text>
                4. di halaman data history, pilih data terbaru dari pasien, lalu
                klik
              </Text>
              <Gap height={7} />
              <Text>5. Klik menu AR</Text>
              <Gap height={7} />
              <Text>6. persiapkan kartu KTP untuk marker AR</Text>
              <Gap height={7} />
              <Text>
                7. untuk pemindaian AR diusahakan scanning Kartu dengan posisi
                seperti gambar dibawah ini
              </Text>
              <Gap height={7} />
              <Image source={KTP} style={styles.image} />
              <Gap height={7} />
              <Text>
                8. Selanjutnya lakukan pemindaian kartu pada kamera anda
              </Text>
            </View>
          )}
          {dataPanduan === "Memberikan Resep Obat" && (
            <View>
              <Text>1. Pertama Masuk ke Halaman Messages</Text>
              <Gap height={7} />
              <Text>
                2. pilih pasien untuk konsultasi lalu akan masuk kehalaman
                chatting
              </Text>
              <Gap height={7} />
              <Text>
                3. lalu klik "resep" pada bottom bar, maka akan masuk ke halaman
                pembuatan resep obat
              </Text>
              <Gap height={7} />
              <Text>4. Buat resep obat sesuai jumlah keinginan dokter</Text>
              <Gap height={7} />
              <Text>5. Kirim pada pasien</Text>
              <Gap height={7} />
              <Text>6. Data Resep Obat bisa dilihat di halaman chatting</Text>
            </View>
          )}
          {dataPanduan === "Memberikan Catatan" && (
            <View>
              <Text>1. Pertama Masuk ke Halaman Messages</Text>
              <Gap height={7} />
              <Text>
                2. pilih pasien untuk konsultasi lalu akan masuk kehalaman
                chatting
              </Text>
              <Gap height={7} />
              <Text>
                3. Selanjutnya Klik "Catatan" pad bottom Bar, maka akan masuk ke
                halaman membuat catatan untuk pasien
              </Text>
              <Gap height={7} />
              <Text>4. Buat catatan sesuai diagnosa dari dokter</Text>
              <Gap height={7} />
              <Text>5. Kirim pada pasien</Text>
              <Gap height={7} />
              <Text>
                6. Data Catatan Dokter bisa dilihat di halaman chatting
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default PanduanDetail;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    margin: 18,
  },
  image: {
    width: 170,
    height: 270,
    alignSelf: "center",
  },
  textJudul: {
    fontSize: 18,
  },
});
