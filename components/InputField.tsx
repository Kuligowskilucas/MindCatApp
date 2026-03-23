import colors from "@/theme/colors";
import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  error?: string | null;
};

export default function InputField({ error, style, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor="#888"
        style={[styles.input, error ? styles.inputError : null, style]}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#D9534F",
  },
  errorText: {
    color: "#D9534F",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});