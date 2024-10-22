import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { useRef, useState } from "react";

import { ActionButton, ThemedView } from "@/components/core";
import { useTheme } from "@/hooks/core";
import { baseStyle } from "@/styles/baseStyle";

export default function Page() {
  const theme = useTheme();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const toggleCameraFacing = () => setFacing((current) => (current === "back" ? "front" : "back"));

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const folderUri = `${FileSystem.documentDirectory}camera/images/`;
        const folderInfo = await FileSystem.getInfoAsync(folderUri);

        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        }

        const photo = await cameraRef.current.takePictureAsync();
        const fileUri = `${folderUri}photo_${Date.now()}.jpg`;
        if (photo) await FileSystem.moveAsync({ from: photo.uri, to: fileUri });

        console.log("Photo saved to:", fileUri);
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  };

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
          iconName={"none"}
          fn={toggleCameraFacing}
          variant="secondary"
          active={true}
          style={{ left: "25%", marginLeft: -20, bottom: 0, marginBottom: 35 }}
        />
      </CameraView>
    </ThemedView>
  );
}
