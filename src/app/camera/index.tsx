import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { Extrapolation, interpolate, runOnJS } from "react-native-reanimated";
import Reanimated from "react-native-reanimated";
import { Camera } from "react-native-vision-camera";

import { ActionButton, ThemedView } from "@/components/core";
import { useCamera } from "@/hooks/camera";
import { baseStyle } from "@/styles/baseStyle";
import { Colors } from "@/theme";

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

export default function Page() {
  const {
    focus,
    facing,
    flash,
    zoom,
    zoomOffset,
    format,
    files,
    device,
    hasCamPermission,
    hasMicPermission,
    cameraRef,
    animatedProps,
    isLongPressed,
    animatedCameraStyle,
    setIsLongPressed,
    startRecordVideo,
    stopRecordVideo,
    takePhoto,
    toggleCameraFacing,
    toggleFlash,
    requestCamPermission,
    requestMicPermission,
  } = useCamera();

  const isImageLast = files[files.length - 1]?.endsWith(".jpg") ? "images" : "videos";

  const startRecord = () => {
    startRecordVideo();
    setIsLongPressed(true);
  };

  const stopRecord = () => {
    if (isLongPressed) {
      stopRecordVideo();
      setIsLongPressed(false);
    }
  };

  if (!hasCamPermission) {
    requestCamPermission();
    return <ThemedView />;
  }

  if (!hasMicPermission) {
    requestMicPermission();
    return <ThemedView />;
  }

  if (device == null) return null;

  const gestureTap = Gesture.Tap().onEnd(({ x, y }) => {
    runOnJS(focus)({ x, y });
  });

  const gesturePinch = Gesture.Pinch()
    .onBegin(() => {
      zoomOffset.value = zoom.value!;
    })
    .onUpdate((event) => {
      const z = zoomOffset.value * event.scale;
      zoom.value = interpolate(z, [1, 10], [device.minZoom, device.maxZoom], Extrapolation.CLAMP);
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={[baseStyle.flexGrow, { backgroundColor: Colors.dark.background }]}>
        <GestureDetector gesture={gestureTap}>
          <GestureDetector gesture={gesturePinch}>
            <ReanimatedCamera
              style={[StyleSheet.absoluteFill, animatedCameraStyle]}
              device={device}
              format={format}
              photo={true}
              video={true}
              audio={true}
              isActive={true}
              ref={cameraRef}
              animatedProps={animatedProps}
            />
          </GestureDetector>
        </GestureDetector>
        <ActionButton
          iconName={"none"}
          fn={!isLongPressed ? takePhoto : stopRecord}
          variant="primary"
          active={true}
          style={{
            borderWidth: 8,
            borderColor: !isLongPressed ? Colors.light.background : Colors.dark.textWarn,
            right: "50%",
            marginRight: -30,
            bottom: 0,
            marginBottom: 30,
          }}
          onLongPress={startRecord}
        />
        <ActionButton
          iconName={"camera-flip"}
          fn={toggleCameraFacing}
          variant="secondary"
          active={!isLongPressed ? true : false}
          style={{
            right: "25%",
            marginRight: -20,
            bottom: 0,
            marginBottom: 35,
            backgroundColor: Colors.dark.background,
          }}
        />
        <ActionButton
          disabled={files.length === 0}
          iconName={"none"}
          fn={() => router.push("camera/modals/Preview")}
          variant="secondary"
          active={!isLongPressed ? true : false}
          style={{
            left: "25%",
            marginLeft: -20,
            bottom: 0,
            marginBottom: 35,
            backgroundColor: Colors.dark.secondaryContainer,
          }}
          img_uri={
            files.length > 0
              ? `${FileSystem.documentDirectory}camera/${isImageLast}/${files[files.length - 1]}`
              : undefined
          }
        />
        <ActionButton
          disabled={facing === "front" ? true : false}
          iconName={flash === "on" ? "flash" : "flash-off"}
          fn={toggleFlash}
          variant="secondary"
          active={!isLongPressed && facing === "back" ? true : false}
          style={{
            right: "5%",
            top: "5%",
            backgroundColor: Colors.dark.background,
          }}
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
}
