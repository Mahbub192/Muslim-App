import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="signIn"   options={{ title: "Sign In" }}/>
      {/* <Stack.Screen
        name="locationAuthentication"
        options={{ title: "Location Take" }}
      /> */}
      <Stack.Screen name="signUp"   options={{ title: "Sign Up" }}/>
      <Stack.Screen name="emailVerification"   options={{ title: "Email Verification" }} />
      <Stack.Screen name="OTPOptionPhoneEmail"   options={{ title: "OTP Option Phone Email" }} />
      <Stack.Screen name="setPassword"   options={{ title: "Set Password" }}/>
    </Stack>
  );
};
