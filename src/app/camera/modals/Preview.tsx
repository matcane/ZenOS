import AntDesign from "@expo/vector-icons/AntDesign";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from "react-native-reanimated";

import { ThemedView } from "@/components/core";
import { useCamera } from "@/hooks/camera";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

export default function Preview() {
  const theme = useTheme();
  const { files, deletePhoto } = useCamera();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [headerTitle, setHeaderTitle] = useState<string>("");

  useEffect(() => {
    setCurrentIndex(files.length - 1);
  }, [files]);

  useEffect(() => {
    setHeaderTitle(new Date(parseInt(files[currentIndex]?.slice(6, -4))).toLocaleString());
  }, [currentIndex, files]);

  const translateX = useSharedValue(0);

  const showNextPhoto = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const showPrevPhoto = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd((e) => {
      if (e.translationX < -50) {
        runOnJS(showPrevPhoto)();
      } else if (e.translationX > 50) {
        runOnJS(showNextPhoto)();
      }
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handlePhotoDelete = () => {
    deletePhoto(currentIndex);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView>
        <Stack.Screen
          options={{
            headerTitle: files.length > 0 ? headerTitle : "",
            headerRight: () => (
              <Pressable onPress={handlePhotoDelete}>
                <AntDesign name="delete" size={24} color={theme.text} />
              </Pressable>
            ),
          }}
        />
        <GestureDetector gesture={swipeGesture}>
          <ThemedView style={[baseStyle.flexGrow, animatedStyle]}>
            <Image
              source={`${FileSystem.documentDirectory}camera/images/${files[currentIndex]}`}
              style={{ width: "100%", height: "100%" }}
            />
          </ThemedView>
        </GestureDetector>
      </ThemedView>
    </GestureHandlerRootView>
  );
}
