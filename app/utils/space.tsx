// utils/spacing.tsx
import { ViewStyle } from 'react-native';

// Define size types for spacing
type SpacingType = 'sm' | 'md' | 'lg' | 'xl';

// Define a mapping of size types to spacing values
const spacingMap: Record<SpacingType, number> = {
  sm: 8,  // Small spacing
  md: 16, // Medium spacing
  lg: 24, // Large spacing
  xl: 32, // Extra large spacing
};

// Function to get padding styles
const getPaddingStyles = (size: SpacingType): ViewStyle => ({
  padding: spacingMap[size],
  paddingTop: spacingMap[size],
  paddingBottom: spacingMap[size],
  paddingLeft: spacingMap[size],
  paddingRight: spacingMap[size],
});

// Function to get specific padding styles
const getPaddingTopStyle = (size: SpacingType): ViewStyle => ({
  paddingTop: spacingMap[size],
});

const getPaddingBottomStyle = (size: SpacingType): ViewStyle => ({
  paddingBottom: spacingMap[size],
});

const getPaddingLeftStyle = (size: SpacingType): ViewStyle => ({
  paddingLeft: spacingMap[size],
});

const getPaddingRightStyle = (size: SpacingType): ViewStyle => ({
  paddingRight: spacingMap[size],
});

// Function to get margin styles
const getMarginStyles = (size: SpacingType): ViewStyle => ({
  margin: spacingMap[size],
  marginTop: spacingMap[size],
  marginBottom: spacingMap[size],
  marginLeft: spacingMap[size],
  marginRight: spacingMap[size],
});

// Function to get specific margin styles
const getMarginTopStyle = (size: SpacingType): ViewStyle => ({
  marginTop: spacingMap[size],
});

const getMarginBottomStyle = (size: SpacingType): ViewStyle => ({
  marginBottom: spacingMap[size],
});

const getMarginLeftStyle = (size: SpacingType): ViewStyle => ({
  marginLeft: spacingMap[size],
});

const getMarginRightStyle = (size: SpacingType): ViewStyle => ({
  marginRight: spacingMap[size],
});

const getGapStyle = (size: SpacingType): ViewStyle => ({
    gap: spacingMap[size],
  });

  
// Export the utility functions and types
export {
  getPaddingStyles,
  getPaddingTopStyle,
  getPaddingBottomStyle,
  getPaddingLeftStyle,
  getPaddingRightStyle,
  getMarginStyles,
  getMarginTopStyle,
  getMarginBottomStyle,
  getMarginLeftStyle,
  getMarginRightStyle,
  getGapStyle,
  SpacingType,
};
