import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor"; // Adjust the import path as needed

interface IconProps {
  name: string; // Icon name
  size?: number; // Icon size
  type?: "Ionicons" | "FontAwesome" | "MaterialIcons" | "Entypo" | "MaterialCommunityIcons"; // Icon library type
  color?: string; // Icon color
  lightColor?: string; // Icon color for light theme
  darkColor?: string; // Icon color for dark theme
  onPress?: () => void; // Function to call when the icon is pressed
  style?: ViewStyle; // Optional style for the icon container
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24, // Default size
  type = "Ionicons", // Default icon library
  color,
  lightColor,
  darkColor,
  onPress,
  style,
}) => {
  // Use theme colors if lightColor and darkColor are provided
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const renderIcon = () => {
    switch (type) {
      case "Ionicons":
        return <Ionicons name={name} size={size} color={color || themeColor} />;
      case "FontAwesome":
        return (
          <FontAwesome name={name} size={size} color={color || themeColor} />
        );
      case "MaterialIcons":
        return (
          <MaterialIcons name={name} size={size} color={color || themeColor} />
        );
        case "MaterialCommunityIcons":
          return (
            <MaterialCommunityIcons name={name} size={size} color={color || themeColor} />
          );
      case "Entypo":
        return <Entypo name={name} size={size} color={color || themeColor} />;
      default:
        return <Ionicons name={name} size={size} color={color || themeColor} />; // Default to Ionicons
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
      {renderIcon()}
    </TouchableOpacity>
  );
};

export default Icon;
