import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Header, HealthInfo } from "../../components";
import { Fire } from "../../config";
import { colors } from "../../utils";

const AllArtikel = ({ navigation }) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      getNews();
    }
    return () => {
      unmounted = true;
    };
  }, []);
  const getNews = () => {
    Fire.database()
      .ref("news/")
      .once("value", (snapshot) => {
        const oldData = snapshot.val();
        const data = [];
        Object.keys(oldData).map((key) => {
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        data.reverse();
        setNews(data);
      });
  };
  console.log("news", news);
  return (
    <View style={styles.page}>
      <Header title="Halaman Artikel" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        {news.map((item) => {
          return (
            <HealthInfo
              onPress={() => navigation.navigate("ArtikelPage", item.data)}
              key={item.id}
              title={item.data.title}
              body={item.data.body}
              image={item.data.image}
            />
          );
        })}
      </View>
    </View>
  );
};

export default AllArtikel;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    flex: 1,
  },
  container: {
    marginTop: 20,
  },
  TopHealth: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.text.default,
    marginHorizontal: 18,
  },
});
