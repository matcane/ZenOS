import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";

export function useCamera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [files, setFiles] = useState<string[]>([]);
  const cameraRef = useRef<CameraView | null>(null);

  const toggleCameraFacing = () => setFacing((current) => (current === "back" ? "front" : "back"));

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const folderUri = `${FileSystem.documentDirectory}camera/images/`;
        const photo = await cameraRef.current.takePictureAsync();
        const fileUri = `${folderUri}photo_${Date.now()}.jpg`;
        if (photo) {
          await FileSystem.moveAsync({ from: photo.uri, to: fileUri });
          await listAllFiles();
        }
      } catch {
        console.info("Picture take aborted");
      }
    }
  };

  const deletePhoto = async (index: number) => {
    try {
      if (files.length > 0) {
        const fileUri = `${FileSystem.documentDirectory}camera/images/${files[index]}`;
        await FileSystem.deleteAsync(fileUri);
        setFiles((prev) => prev.filter((file) => file !== files[index]));
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania pliku:", error);
    } finally {
      router.replace("camera");
    }
  };

  const listAllFiles = async () => {
    try {
      const folderUri = `${FileSystem.documentDirectory}camera/images/`;
      const filesList = await FileSystem.readDirectoryAsync(folderUri);
      setFiles(filesList.sort());
    } catch (error) {
      console.error("Error listing files:", error);
    }
  };

  useEffect(() => {
    listAllFiles();
  }, []);

  return {
    facing,
    permission,
    files,
    cameraRef,
    listAllFiles,
    requestPermission,
    takePhoto,
    deletePhoto,
    toggleCameraFacing,
  };
}
