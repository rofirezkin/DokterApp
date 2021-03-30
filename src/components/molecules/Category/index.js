import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Category = ({ image }) => {
  return (
    <View>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  image: {
    width: 277,
    height: 120,
    borderRadius: 4,
  },

  container: {
    marginRight: 10,
    marginTop: 20,
  },
});
