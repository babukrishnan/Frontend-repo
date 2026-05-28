import * as Location from "expo-location";

const API_KEY = "1084044d8fd028a5d6a26dafdc989f3c";

export const getWeatherData = async () => {
  try {
    // LOCATION PERMISSION
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Location permission denied");
    }

    // ENABLE GPS CHECK
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      throw new Error("GPS is disabled");
    }

    // HIGH ACCURACY LOCATION
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    // WEATHER API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    );

    const data = await response.json();

    return {
      city: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.log("WEATHER ERROR:", error);

    return null;
  }
};
