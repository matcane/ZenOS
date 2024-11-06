import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Camera,
  CameraProps,
  Point,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useMicrophonePermission,
} from "react-native-vision-camera";

export function useCamera() {
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [flash, setFlash] = useState<"on" | "off">("off");
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const device = useCameraDevice(facing);
  const { hasPermission: hasCamPermission, requestPermission: requestCamPermission } =
    useCameraPermission();
  const { hasPermission: hasMicPermission, requestPermission: requestMicPermission } =
    useMicrophonePermission();
  const [files, setFiles] = useState<string[]>([]);
  const cameraRef = useRef<Camera>(null);
  const isFocusing = useRef(false);
  const zoom = useSharedValue(device?.neutralZoom);
  const zoomOffset = useSharedValue(0);

  const format = useCameraFormat(device, [
    { videoAspectRatio: 16 / 9 },
    { videoResolution: { width: 3048, height: 2160 } },
    { fps: 60 },
  ]);

  const toggleCameraFacing = () => setFacing((current) => (current === "back" ? "front" : "back"));
  const toggleFlash = () => setFlash((current) => (current === "on" ? "off" : "on"));
  const focus = useCallback((point: Point) => {
    const c = cameraRef.current;
    if (c == null || isFocusing.current) return;

    isFocusing.current = true;
    c.focus(point).finally(() => {
      isFocusing.current = false;
    });
  }, []);

  const animatedProps = useAnimatedProps<CameraProps>(() => ({ zoom: zoom.value }), [zoom]);

  const scale = useSharedValue(1);

  const animatedCameraStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isTakingPhoto ? scale.value : 1 }],
    };
  }, [isTakingPhoto]);

  useEffect(() => {
    if (isTakingPhoto) {
      scale.value = withTiming(0.95, { duration: 100 }, () => {
        scale.value = withTiming(1, { duration: 100 });
      });
    }
  }, [isTakingPhoto, scale]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const folderUri = `${FileSystem.documentDirectory}camera/images/`;
        const photo = await cameraRef.current.takePhoto({ flash: flash });
        setIsTakingPhoto(true);
        const fileUri = `${folderUri}photo_${Date.now()}.jpg`;
        if (photo) {
          await FileSystem.moveAsync({ from: `file://${photo.path}`, to: fileUri });
          await listAllFiles();
        }
      } catch {
        console.info("Picture take aborted");
      } finally {
        setIsTakingPhoto(false);
      }
    }
  };

  const startRecordVideo = async () => {
    if (cameraRef.current && !isLongPressed) {
      cameraRef.current.startRecording({
        flash: flash,
        onRecordingFinished: async (video) => {
          try {
            const folderUri = `${FileSystem.documentDirectory}camera/videos/`;
            const fileUri = `${folderUri}video_${Date.now()}.mov`;
            if (video) {
              await FileSystem.moveAsync({ from: `file://${video.path}`, to: fileUri });
              await listAllFiles();
            }
          } catch {
            console.info("Video take aborted");
          }
        },
        onRecordingError: (error) => console.error(error),
      });
    }
  };

  const stopRecordVideo = async () => {
    if (cameraRef.current) {
      await cameraRef.current.stopRecording();
    }
  };

  const deleteFile = async (index: number) => {
    const isImage = files[index].endsWith(".jpg") ? "images" : "videos";
    try {
      if (files.length > 0) {
        const fileUri = `${FileSystem.documentDirectory}camera/${isImage}/${files[index]}`;
        await FileSystem.deleteAsync(fileUri);
        setFiles((prev) => prev.filter((file) => file !== files[index]));
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania pliku:", error);
    } finally {
      if (files.length === 1) router.replace("camera");
    }
  };

  const listAllFiles = async () => {
    try {
      const vidFolderUri = `${FileSystem.documentDirectory}camera/videos/`;
      const imgFolderUri = `${FileSystem.documentDirectory}camera/images/`;
      const vidFilesList = await FileSystem.readDirectoryAsync(vidFolderUri);
      const imgFilesList = await FileSystem.readDirectoryAsync(imgFolderUri);
      const filesList = [...imgFilesList, ...vidFilesList];
      setFiles(
        filesList.sort((a, b) => {
          const matchA = a.match(/\d+/);
          const matchB = b.match(/\d+/);
          const timestampA = parseInt(matchA ? matchA[0] : "0");
          const timestampB = parseInt(matchB ? matchB[0] : "0");
          return timestampA - timestampB;
        }),
      );
    } catch (error) {
      console.error("Error listing files:", error);
    }
  };

  useEffect(() => {
    listAllFiles();
  }, []);

  return {
    focus,
    facing,
    flash,
    zoom,
    zoomOffset,
    format,
    device,
    hasCamPermission,
    hasMicPermission,
    files,
    cameraRef,
    animatedProps,
    isLongPressed,
    isTakingPhoto,
    animatedCameraStyle,
    setIsLongPressed,
    listAllFiles,
    requestCamPermission,
    requestMicPermission,
    takePhoto,
    startRecordVideo,
    stopRecordVideo,
    deleteFile,
    toggleCameraFacing,
    toggleFlash,
  };
}
