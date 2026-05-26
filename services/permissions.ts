import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

import * as ImagePicker from "expo-image-picker";

import * as Location from "expo-location";

import * as Notifications from "expo-notifications";

// =======================================
// COMMON SETTINGS ALERT
// =======================================

const openSettingsAlert = (title: string, message: string) => {
  Alert.alert(title, message, [
    {
      text: "Open Settings",
      onPress: () => Linking.openSettings(),
    },
    {
      text: "Cancel",
      style: "cancel",
    },
  ]);
};

// =======================================
// GALLERY PERMISSION
// =======================================

export const requestGalleryPermission = async () => {
  try {
    // ANDROID 13+
    if (Platform.OS === "android" && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: "Gallery Permission",
          message: "செங்காந்தள் needs gallery access to upload images.",
          buttonPositive: "Allow",
          buttonNegative: "Deny",
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }

      openSettingsAlert(
        "Permission Denied",
        "Please allow gallery access from settings.",
      );

      return false;
    }

    // IOS + OLD ANDROID

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted) {
      return true;
    }

    openSettingsAlert(
      "Permission Denied",
      "Please allow gallery access from settings.",
    );

    return false;
  } catch (error) {
    console.log("GALLERY PERMISSION ERROR:", error);

    return false;
  }
};

// =======================================
// CAMERA PERMISSION
// =======================================

export const requestCameraPermission = async () => {
  try {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted) {
      return true;
    }

    openSettingsAlert(
      "Camera Permission",
      "Camera access is required to take photos.",
    );

    return false;
  } catch (error) {
    console.log("CAMERA PERMISSION ERROR:", error);

    return false;
  }
};

// =======================================
// LOCATION PERMISSION
// =======================================

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      return true;
    }

    openSettingsAlert(
      "Location Permission",
      "Location access is required for nearby farmer services.",
    );

    return false;
  } catch (error) {
    console.log("LOCATION PERMISSION ERROR:", error);

    return false;
  }
};

// =======================================
// NOTIFICATION PERMISSION
// =======================================

export const requestNotificationPermission = async () => {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    // REQUEST IF NOT GRANTED

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus === "granted") {
      return true;
    }

    openSettingsAlert(
      "Notification Permission",
      "Enable notifications to receive product updates and farmer alerts.",
    );

    return false;
  } catch (error) {
    console.log("NOTIFICATION PERMISSION ERROR:", error);

    return false;
  }
};
