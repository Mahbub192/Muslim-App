import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  getPaddingStyles,
  getPaddingTopStyle,
  getMarginStyles,
  getMarginLeftStyle,
  SpacingType,
} from "../app/utils/space";
import { getBorderStyle, BorderType } from '../app/utils/border';

// Define the props interface
export type ThemedTextInputProps = TextInputProps & {
  // Additional props can be defined here if needed
  lightColor?: string;
  darkColor?: string;
};

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  lightColor,
  darkColor,
  style,
  ...props
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <TextInput
      style={[styles.input, { color }, style]} // Merge with custom styles
      {...props} // Spread props to include all TextInput props
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...getBorderStyle('md','default'),
    ...getPaddingStyles('sm'),
    backgroundColor: "transparent",
  },
});

export default ThemedTextInput;
