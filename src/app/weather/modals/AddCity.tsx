import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";

import { ThemedText, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { useCitiesStore } from "@/store/weather";
import { baseStyle } from "@/styles/baseStyle";

export default function AddCity() {
  const theme = useTheme();
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const { success, error, clearSuccess, clearError, addCity } = useCitiesStore();

  const handleNewCity = async () => {
    clearError();
    setLoading(true);
    addCity(cityName);
  };

  const onChange = () => {
    clearError();
    setLoading(false);
  };

  useEffect(() => {
    if (success) {
      clearSuccess();
      setLoading(false);
      router.back();
    }
  }, [clearSuccess, success]);

  return (
    <ThemedView style={[baseStyle.flexGrow, { backgroundColor: theme.secondaryContainer }]}>
      <ThemedView style={[baseStyle.relative, baseStyle.widthFull, baseStyle.transparent]}>
        <TextInput
          autoFocus
          value={cityName}
          onChangeText={(text) => setCityName(text)}
          onSubmitEditing={handleNewCity}
          onSelectionChange={onChange}
          style={[
            baseStyle.marginHorizontalSM,
            baseStyle.roundedLG,
            baseStyle.paddingHorizontalMD,
            { backgroundColor: theme.container },
            { color: theme.text },
          ]}
        />
        {loading && !error ? (
          <ActivityIndicator
            style={{
              position: "absolute",
              right: 20,
              top: 15,
            }}
          />
        ) : undefined}
      </ThemedView>
      <ThemedText style={[baseStyle.textCenter, baseStyle.fontSMD, { color: theme.textWarn }]}>
        {error ? "City not found" : ""}
      </ThemedText>
    </ThemedView>
  );
}
