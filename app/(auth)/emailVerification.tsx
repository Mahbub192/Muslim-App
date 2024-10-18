import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import OtpComponent from "@/components/OtpComponent";
import Button from "@/components/Button";
import { getGapStyle } from "../utils/space";
import { useRouter } from "expo-router";
import axios from "axios";

export default function emailVerification() {
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();

  // Function to update OTP in App component
  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
  };

  const handleOtpButtonPress = async () => {
    const data = {
      otp: otp,
      to: "maxitmahbub@gmail.com",
      purpose: "signup",
    };
  
    try {
      const response = await axios.post(
        `https://authms.muallimmadrasa.com/api/v1/auth/verify-otp`,
        data
      );
      console.log(32, response);
  
      if (response.data.success === 'true') {
        router.push("./setPassword");
      } else {
        Alert.alert("OTP verification failed, please try again");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      Alert.alert("An error occurred, please try again later");
    }
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">E-mail Verification</ThemedText>
          <ThemedText>We sent a verification code to</ThemedText>
          <ThemedText type="defaultSemiBold">example@email.com</ThemedText>
          <ThemedText>Check your email and enter the code.</ThemedText>
        </ThemedView>
        <OtpComponent
          lightColor="black"
          darkColor="white"
          onOtpChange={handleOtpChange}
        />
        <Button
          title="Submit"
          onPress={handleOtpButtonPress}
          lightColor="white" // Text color for light mode
        />
        <ThemedView
          style={[
            styles.titleContainer,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <ThemedText>09:50</ThemedText>
          <ThemedText type="defaultSemiBold">Resend Code</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  titleContainer: {
    ...getGapStyle("sm"),
  },
  container: {
    // Define your style for the container
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  pinCodeContainer: {
    // Define your style for each pin code box
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: 50,
    height: 60,
    textAlign: "center",
  },
  pinCodeText: {
    // Define your style for the pin code text
    fontSize: 20,
    color: "white",
  },
  focusStick: {
    // Define your style for the focus stick
    height: 2,
    backgroundColor: "green",
  },
  activePinCodeContainer: {
    // Define your style for the active pin code container when focused
    borderColor: "green",
    borderWidth: 2,
  },
});
