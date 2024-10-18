import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Button";
import {
  getGapStyle,
  getMarginBottomStyle,
  getMarginTopStyle,
} from "../utils/space";
import { useRouter } from "expo-router";
import ParallaxScrollViewWithoutImage from "@/components/ParallaxScrollViewWithoutImage";
import ThemedTextInput from "@/components/ThemedTextInput";
import Icon from "../utils/icon";

export default function setPassword() {
  const route = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const [checkedBiometric, setcheckedBiometric] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    createPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handelSetPasswordButton = () => {
    // route.push('./')
  };
  const handleBiometriceIconPress =()=>{
    setcheckedBiometric(!checkedBiometric)
  }
  const handleIconPress = () => {
    setChecked(!checked);
  };
  return (
    <>
      <ParallaxScrollViewWithoutImage>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Set Password</ThemedText>
        </ThemedView>
        <ThemedTextInput
          value={formData.createPassword}
          onChangeText={(value) => handleInputChange("createPassword", value)}
          placeholder="Create Password"
          placeholderTextColor="gray"
        />
        <ThemedTextInput
          value={formData.confirmPassword}
          onChangeText={(value) =>
            handleInputChange("firsconfirmPasswordtName", value)
          }
          placeholder="Confirm Password"
          placeholderTextColor="gray"
        />

        <ThemedView style={styles.titleContainer}>
          <ThemedView style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <ThemedText type="subtitle">Biometric/face ID login</ThemedText>
            <Icon
              name={checkedBiometric ? "toggle-switch" : "toggle-switch-off"}
              size={30}
              type="MaterialCommunityIcons"
              lightColor="black"
              darkColor="white"
              onPress={handleBiometriceIconPress}
            />
          </ThemedView>

          <ThemedText>
            By enabling the biometric login you will be in with your devices
            fingerprint or face look
          </ThemedText>
        </ThemedView>
        <Button
          title="Set Password"
          onPress={handelSetPasswordButton}
          lightColor="white" // Text color for light mode
        />

        <ThemedView style={styles.IconTextContainer}>
          <Icon
            name={checked ? "check-square" : "square-o"}
            size={20}
            type="FontAwesome"
            lightColor="black"
            darkColor="white"
            onPress={handleIconPress}
          />
          <ThemedText>Remember this device</ThemedText>
        </ThemedView>
      </ParallaxScrollViewWithoutImage>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    ...getMarginTopStyle("sm"),
    ...getMarginBottomStyle("lg"),
    ...getGapStyle("sm"),
  },
  IconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    ...getGapStyle("sm"),
  },
});
