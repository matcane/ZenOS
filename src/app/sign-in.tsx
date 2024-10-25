import { ActivityIndicator } from "react-native";

import { AuthForm, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useAuthStore } from "@/store/core";
import { baseStyle } from "@/styles/baseStyle";

export default function SignIn() {
  const theme = useTheme();
  const signIn = useAuthStore((state) => state.signIn);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading)
    return (
      <ThemedView style={[baseStyle.flexGrow, baseStyle.justifyCenter]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </ThemedView>
    );

  return (
    <AuthForm
      title="Sign In"
      buttonText="Login"
      linkText={["Don't have an account?", "Register"]}
      linkHref="sign-up"
      onSubmit={signIn}
    />
  );
}
