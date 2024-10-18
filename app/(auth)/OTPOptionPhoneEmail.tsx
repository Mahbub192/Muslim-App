import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getGapStyle } from "../utils/space";
import ThemedTextInput from "@/components/ThemedTextInput";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const OTPOptionPhoneEmail = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleNextButtonPress = () => {
    router.push("./emailVerification");
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          To reset your password, you must first verify your account. Muallim
          will send a One-Time Password (OTP) to either your email or phone.
          Please select your preferred method to receive the OTP for
          verification.
        </ThemedText>
      </ThemedView>
      <ThemedTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="gray"
      />
      <Button
        title="Next"
        onPress={handleNextButtonPress}
        lightColor="white" // Text color for light mode
        //darkColor="black" // Text color for dark mode
      />
    </ParallaxScrollView>
  );
};

export default OTPOptionPhoneEmail;

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  stepContainer: {
    ...getGapStyle("sm"),
  },
});
