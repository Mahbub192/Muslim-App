import { ViewStyle } from 'react-native';

// Define border types
type BorderType = 'sm' | 'md' | 'lg' | 'xl';

// Define a mapping of border types to width values
const borderWidthMap: Record<BorderType, number> = {
  sm: 1,   // Small border width
  md: 2,   // Medium border width
  lg: 3,   // Large border width
  xl: 4,   // Extra large border width
};

// Define a mapping of border colors
const borderColorMap: Record<string, string> = {
  default: 'gray',   // Default border color
  primary: 'blue',   // Primary border color
  secondary: 'green', // Secondary border color
  danger: 'red',     // Danger border color
  removeBg: 'transparent'
};

// Function to get border style
const getBorderStyle = (
  size: BorderType,
  color: keyof typeof borderColorMap = 'default' // Default to gray if no color is specified
): ViewStyle => ({
    
  borderWidth: borderWidthMap[size],
  borderColor: borderColorMap[color],
  borderRadius: 10, // Set default border radius if needed
});

// Export the utility functions and types
export { getBorderStyle, BorderType };
