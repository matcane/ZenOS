import AntDesign from "@expo/vector-icons/AntDesign";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import Video, { VideoRef } from "react-native-video";

import { ThemedView } from "@/components/core";
import { useCamera } from "@/hooks/camera";
import { baseStyle } from "@/styles/baseStyle";
import { Colors } from "@/theme";

export default function Preview() {
  const { files, deleteFile } = useCamera();
  const videoRef = useRef<VideoRef>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [headerTitle, setHeaderTitle] = useState<string>("");
  const [currentType, setCurrentType] = useState<"images" | "videos">();

  useEffect(() => {
    const lastElem = files.length - 1;
    if (files[lastElem]) {
      setCurrentType(files[lastElem].endsWith(".jpg") ? "images" : "videos");
    }
    setCurrentIndex(lastElem);
  }, [files]);

  useEffect(() => {
    setHeaderTitle(new Date(parseInt(files[currentIndex]?.slice(6, -4))).toLocaleString());
    setCurrentType(files[currentIndex]?.endsWith(".jpg") ? "images" : "videos");
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

  const gestureSwipe = Gesture.Pan()
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
    deleteFile(currentIndex);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={{ backgroundColor: Colors.dark.background }}>
        <Stack.Screen
          options={{
            headerTitle: files.length > 0 ? headerTitle : "",
            headerRight: () => (
              <Pressable onPress={handlePhotoDelete}>
                <AntDesign name="delete" size={24} color={Colors.dark.text} />
              </Pressable>
            ),
          }}
        />
        <GestureDetector gesture={gestureSwipe}>
          <Animated.View
            style={[
              baseStyle.flexGrow,
              animatedStyle,
              { backgroundColor: Colors.dark.background },
            ]}>
            {currentType === "images" ? (
              <Image
                source={`${FileSystem.documentDirectory}camera/images/${files[currentIndex]}`}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Video
                onLoad={() => setIsVideoLoaded(true)}
                source={{
                  uri: `${FileSystem.documentDirectory}camera/videos/${files[currentIndex]}`,
                }}
                style={{ width: "100%", height: "100%" }}
                ref={videoRef}
                controls={isVideoLoaded}
                controlsStyles={{
                  hideSettingButton: false,
                }}
              />
            )}
          </Animated.View>
        </GestureDetector>
      </ThemedView>
    </GestureHandlerRootView>
  );
}
