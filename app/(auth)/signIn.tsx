import { Alert, Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import ThemedTextInput from "@/components/ThemedTextInput";
import Button from "@/components/Button";
import Icon from "../utils/icon";
import { getGapStyle } from "../utils/space";
import { useRouter } from "expo-router";
import axios from "axios";
// import { useAuth } from "@/hooks/useAuth";
const api = process.env.EXPO_PUBLIC_API_URL;

export default function SignIn() {
  // const { logIn } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const router = useRouter();

  const handleSignInButtonPress = async () => {
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(api + "v1/auth/signin", data);
      if (response.status === 200) {
        // logIn(response.data); // logIn should now be available
        // router.push("./emailVerification");
      } else {
        Alert.alert("Sign In failed");
      }
    } catch (error) {
      Alert.alert("Sign In failed",);
    }
  };

  const handleIconPress = () => {
    setChecked(!checked);
  };

  const handleRoutingSignUpPage = () => {
    router.push("./signUp");
  };

  const handleRoutingResetPage = () => {
    router.push("./OTPOptionPhoneEmail");
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
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="gray"
        />
        <ThemedTextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="gray"
        />
        <ThemedView style={styles.stepContainer}>
          <ThemedText>
            Forgot email or password?{" "}
            <ThemedText type="defaultSemiBold" onPress={handleRoutingResetPage}>
              Reset
            </ThemedText>{" "}
          </ThemedText>
        </ThemedView>
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
        <Button
          title="Sign In"
          onPress={handleSignInButtonPress}
          lightColor="white" // Text color for light mode
        />
        <ThemedView style={styles.stepContainer}>
          <ThemedText>
            Don't have an account?{" "}
            <ThemedText
              type="defaultSemiBold"
              onPress={handleRoutingSignUpPage}
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
  IconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    ...getGapStyle("sm"),
  },
});
