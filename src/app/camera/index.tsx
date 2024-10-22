import { CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

import { ActionButton, ThemedView } from "@/components/core";
import { useCamera } from "@/hooks/camera";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

export default function Page() {
  const theme = useTheme();
  const { files, facing, permission, cameraRef, takePhoto, toggleCameraFacing, requestPermission } =
    useCamera();

  if (!permission) {
    requestPermission();
    return <ThemedView />;
  }

  return (
    <ThemedView style={[baseStyle.transparent, baseStyle.flexGrow]}>
      <CameraView style={baseStyle.flexGrow} facing={facing} ref={cameraRef}>
        <ActionButton
          iconName={"none"}
          fn={takePhoto}
          variant="primary"
          active={true}
          style={{
            borderWidth: 8,
            borderColor: theme.invBackground,
            right: "50%",
            marginRight: -30,
            bottom: 0,
            marginBottom: 30,
          }}
        />
        <ActionButton
          iconName={"camera-flip"}
          fn={toggleCameraFacing}
          variant="secondary"
          active={true}
          style={{ right: "25%", marginRight: -20, bottom: 0, marginBottom: 35 }}
        />
        <ActionButton
          disabled={files.length === 0}
          iconName={"none"}
          fn={() => router.push("camera/modals/Preview")}
          variant="secondary"
          active={true}
          style={{ left: "25%", marginLeft: -20, bottom: 0, marginBottom: 35 }}
          img_uri={
            files.length > 0
              ? `${FileSystem.documentDirectory}camera/images/${files[files.length - 1]}`
              : undefined
          }
        />
      </CameraView>
    </ThemedView>
  );
}
