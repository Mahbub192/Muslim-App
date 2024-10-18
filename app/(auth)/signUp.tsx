import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedTextInput from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getGapStyle } from "../utils/space";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import axios from "axios";
const api = process.env.EXPO_PUBLIC_API_URL;

export default function signUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUpButtonPress = async () => {
    console.log("Sign Up button clicked");
  
    const data = {
      first_name: "mahbub",
      last_name: "ali",
      email: "maxitmahbub@gmail.com",
      password: "@Nayem94",
      mobile: "01600127050",
      verification_method: "code",
    };
  
    try {
      const response = await fetch(`https://authms.muallimmadrasa.com/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
      console.log(32, responseData);
  
      if (response.ok && responseData.success) {
        router.push("./emailVerification");
      } else {
        Alert.alert("Sign Up failed");
      }
    } catch (error) {
      console.error("Error during Sign Up:", error);
      Alert.alert("An error occurred, please try again later");
    }
  };

  const handleRoutingSignInPage = () => {
    router.back();
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
        <ThemedTextInput
          value={formData.first_name}
          onChangeText={(value) => handleInputChange("first_name", value)}
          placeholder="First Name"
          placeholderTextColor="gray"
        />

        <ThemedTextInput
          value={formData.last_name}
          onChangeText={(value) => handleInputChange("last_name", value)}
          placeholder="Last Name"
          placeholderTextColor="gray"
        />

        <ThemedTextInput
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
          placeholder="Email"
          placeholderTextColor="gray"
        />

        <ThemedView style={styles.stepContainer}>
          <ThemedText>E-mail verification will be needed. </ThemedText>
        </ThemedView>

        <Button
          title="Sign Up"
          onPress={handleSignUpButtonPress}
          lightColor="white" // Text color for light mode
        />

        <ThemedView style={styles.stepContainer}>
          <ThemedText>
            Don't have an account?{" "}
            <ThemedText
              type="defaultSemiBold"
              onPress={handleRoutingSignInPage}
            >
              Sign Up
            </ThemedText>{" "}
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    ...getGapStyle("sm"),
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
