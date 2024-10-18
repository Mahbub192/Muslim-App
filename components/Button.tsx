// components/Button.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor'; // Adjust the import path as needed

interface ButtonProps {
  title: string; // Button text
  onPress: () => void; // Function to call on press
  style?: object; // Additional styles
  disabled?: boolean; // Disable button state
  lightColor?: string; // Color for light theme
  darkColor?: string; // Color for dark theme
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  disabled = false,
  lightColor,
  darkColor,
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? '#d3d3d3' : '#007bff' }, style]} // Default button color
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, { color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
