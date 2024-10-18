import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";

import { useTheme } from "@/hooks/core";

import ThemedText from "../ThemedText/ThemedText";
import ThemedView from "../ThemedView/ThemedView";

export function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const onChangeText = (text: string) => setValue(text);
  return { value, onChangeText };
}

export function usePasswordVisibility(initialVisibility = true) {
  const [visible, setVisible] = useState(initialVisibility);
  const toggleVisibility = () => setVisible((prev) => !prev);
  return { visible, toggleVisibility };
}

export function canSubmitForm(inputs: string[]): boolean {
  return inputs.every((input) => input.length > 0);
}

type AuthFormProps = {
  title: string;
  buttonText: string;
  linkText: string[];
  linkHref: string;
  onSubmit: (email: string, password: string) => void;
};

export default function AuthForm({
  title,
  buttonText,
  linkText,
  linkHref,
  onSubmit,
}: AuthFormProps) {
  const theme = useTheme();

  const email = useFormInput("");
  const password = useFormInput("");
  const passwordVisibility = usePasswordVisibility();

  const canSubmit = canSubmitForm([email.value, password.value]);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, paddingBottom: 20 }}>
      <ThemedView style={formStyles.container}>
        <ThemedView style={formStyles.formContent}>
          <ThemedText style={[formStyles.title, { fontSize: 24, fontWeight: "bold" }]}>
            {title}
          </ThemedText>
          <TextInput
            style={
              (formStyles.input,
              { color: theme.text, borderWidth: 1, borderColor: "#ccc", borderRadius: 5 })
            }
            placeholderTextColor={theme.text}
            placeholder="Email"
            {...email}
          />
          <ThemedView style={formStyles.inputContainer}>
            <TextInput
              style={
                (formStyles.input,
                { color: theme.text, borderWidth: 1, borderColor: "#ccc", borderRadius: 5 })
              }
              placeholderTextColor={theme.text}
              secureTextEntry={passwordVisibility.visible}
              placeholder="Password"
              {...password}
            />
            <Pressable style={formStyles.eyeIcon} onPress={passwordVisibility.toggleVisibility}>
              <ThemedText>{passwordVisibility.visible ? "👁" : "🙈"}</ThemedText>
            </Pressable>
          </ThemedView>
          <ThemedText style={formStyles.linkText}>
            {linkText[0]}{" "}
            <Link href={linkHref} replace style={formStyles.link}>
              {linkText[1]}
            </Link>
          </ThemedText>
        </ThemedView>
        <Pressable
          style={[formStyles.button, { backgroundColor: canSubmit ? "#6200ee" : "#aaa" }]}
          disabled={!canSubmit}
          onPress={() => onSubmit(email.value, password.value)}>
          <ThemedText style={formStyles.buttonText}>{buttonText}</ThemedText>
        </Pressable>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 20,
    gap: 20,
  },
  formContent: {
    paddingTop: 50,
    gap: 40,
  },
  title: {
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    width: "100%",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  linkText: {
    textAlign: "right",
  },
  link: {
    color: "#6200ee",
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
