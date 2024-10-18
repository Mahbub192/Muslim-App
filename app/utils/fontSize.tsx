// utils/fontSize.tsx
import { TextStyle } from 'react-native';

// Define size types for font sizes
type FontSizeType = 'sm' | 'md' | 'lg' | 'xl';

// Define a mapping of size types to font size values
const fontSizeMap: Record<FontSizeType, number> = {
  sm: 12, // Small font size
  md: 16, // Medium font size
  lg: 20, // Large font size
  xl: 24, // Extra large font size
};

// Define the function to get the font size style
const getFontSizeStyle = (size: FontSizeType): TextStyle => {
  return {
    fontSize: fontSizeMap[size], // Get the font size from the mapping
  };
};

// Export the utility function and types
export { getFontSizeStyle, FontSizeType };
