import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../../utils";
import { Picker } from "@react-native-community/picker";
const Input = ({
  onValueChange,
  selectItem,
  select,
  disable,
  placeholder,
  label,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const [border, setBorder] = useState("#F3F3F3");
  const onFocusForm = () => {
    setBorder(colors.send);
  };
  const onBLurForm = () => {
    setBorder("#F3F3F3");
  };
  if (select) {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.picker}>
          <Picker selectedValue={value} onValueChange={onValueChange}>
            {selectItem.map((item) => {
              return (
                <Picker.Item
                  key={item.id}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.label}> {label}</Text>
      <TextInput
        placeholder={placeholder}
        onFocus={onFocusForm}
        onBlur={onBLurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (border) => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#F3F3F3",
  }),
  picker: {
    backgroundColor: "#F3F3F3",
    borderColor: colors.border,
    borderRadius: 7,
    paddingHorizontal: 4,
  },
  label: { fontSize: 16, color: "#7D8797", marginBottom: 6 },
});
