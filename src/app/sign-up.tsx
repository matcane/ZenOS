import { ActivityIndicator } from "react-native";

import { AuthForm, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useAuthStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";

export default function SignUp() {
  const theme = useTheme();
  const signUp = useAuthStore((state) => state.signUp);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading)
    return (
      <ThemedView style={[baseStyle.flexGrow, baseStyle.justifyCenter]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </ThemedView>
    );

  return (
    <AuthForm
      title="Sign Up"
      buttonText="Register"
      linkText={["Already have an account?", "Log In"]}
      linkHref="sign-in"
      onSubmit={signUp}
    />
  );
}
