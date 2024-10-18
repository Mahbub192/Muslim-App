import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

type OtpComponentProps = {
  lightColor?: string;
  darkColor?: string;
  onOtpChange: (otp: string) => void; // New prop to pass OTP to parent
};

export default function OtpComponent({ lightColor, darkColor, onOtpChange }: OtpComponentProps) {
  const [otp, setOtp] = useState<string>(''); // State to store OTP
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    pinCodeContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      width: 50,
      height: 60,
      textAlign: 'center',
    },
    pinCodeText: {
      fontSize: 20,
      color: textColor, // Apply the dynamic text color
    },
    focusStick: {
      height: 2,
      backgroundColor: 'green',
    },
    activePinCodeContainer: {
      borderColor: 'green',
      borderWidth: 2,
    },
    otpText: {
      marginTop: 20,
      fontSize: 18,
      color: textColor, // Apply the theme color here as well
    },
  });

  // Update the OTP state and call the parent function to pass the OTP value up
  const handleOtpChange = (text: string) => {
    setOtp(text);
    onOtpChange(text); // Pass the OTP to the parent (App) component
  };

  return (
    <View>
      <OtpInput
        numberOfDigits={6}
        focusColor="green"
        focusStickBlinkingDuration={500}
        onTextChange={handleOtpChange} // Update OTP state and pass it up
        textInputProps={{
          accessibilityLabel: 'One-Time Password',
        }}
        theme={{
          containerStyle: styles.container,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: styles.activePinCodeContainer,
        }}
      />
    </View>
  );
}
