import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Header, OnlineDoctors } from "../../components";
import { Fire } from "../../config";
import { colors } from "../../utils";

const ChooseDoctor = ({ navigation, route }) => {
  const [listDoctor, setListDoctor] = useState([]);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const dataDetail = route.params;
  const itemCategory = dataDetail.data;
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      callDoctorByCategory(itemCategory.category);
    }
    return () => {
      unmounted = true;
    };
  }, [itemCategory.category]);
  const callDoctorByCategory = (category) => {
    setLoadingInfo(true);
    //docter umum
    //docter psikiater
    Fire.database()
      .ref("doctors/")
      .orderByChild("category")
      .equalTo(category)
      .once("value")
      .then((res) => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((item) => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          setLoadingInfo(false);
          setListDoctor(data);
        } else {
          setLoadingInfo(false);
        }
      });
  };
  return (
    <View style={styles.page}>
      <Header
        title={`Pilih ${itemCategory.category}`}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {loadingInfo && <Text style={styles.loading}>Loading....</Text>}
          {listDoctor.map((doctor) => {
            const detailDoctor = {
              data: doctor,
              status: dataDetail.status,
            };
            return (
              <OnlineDoctors
                rate={doctor.data.rate}
                onPress={() =>
                  navigation.navigate("DoctorProfilePasien", detailDoctor)
                }
                status={doctor.data.status}
                key={doctor.data.uid}
                name={doctor.data.fullName}
                desc={doctor.data.category}
                experience={doctor.data.pengalaman}
                photo={{ uri: doctor.data.photo }}
                pembayaran={doctor.data.pembayaran}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    marginTop: 30,
    paddingHorizontal: 18,
  },
  loading: {
    textAlign: "center",
  },
});
