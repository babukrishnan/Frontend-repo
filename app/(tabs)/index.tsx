import { getWeatherData } from '@/services/weather';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  };

  useEffect(() => {

    loadWeather();

  }, []);

  const loadWeather = async () => {

    setLoading(true);

    const data = await getWeatherData();

    setWeather(data);

    setLoading(false);
  };

  const getWeatherEmoji = (condition: string) => {

    switch (condition) {

      case 'Clouds':
        return '☁️';

      case 'Rain':
        return '🌧️';

      case 'Clear':
        return '☀️';

      case 'Thunderstorm':
        return '⛈️';

      default:
        return '🌤️';
    }
  };

  return (
    <ScrollView style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>👋 Vanakkam Farmer</Text>
        <Text style={styles.subText}>Welcome to Smart Farmer App</Text>
      </View>

      {/* WEATHER CARD */}
      <LinearGradient
        colors={
          weather?.condition === 'Rain'
            ? ['#4B79A1', '#283E51']
            : weather?.condition === 'Clear'
              ? ['#56CCF2', '#2F80ED']
              : weather?.condition === 'Clouds'
                ? ['#757F9A', '#D7DDE8']
                : ['#43CEA2', '#185A9D']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.weatherCard}
      >
        {
          loading ? (

            <ActivityIndicator
              size="large"
              color="#fff"
            />

          ) : weather ? (

            <>
              {/* TOP ROW */}
              <View style={styles.weatherTop}>

                <View>

                  <Text style={styles.weatherTitle}>
                    Today's Weather
                  </Text>

                  <Text style={styles.weatherCity}>
                    📍 {weather.city}
                  </Text>

                </View>

                <Text style={styles.weatherEmoji}>
                  {getWeatherEmoji(weather.condition)}
                </Text>

              </View>

              {/* TEMP */}
              <Text style={styles.weatherTemp}>
                {weather.temp}°
              </Text>

              <Text style={styles.weatherCondition}>
                {weather.condition}
              </Text>

              {/* GLASS INFO */}
              <View style={styles.weatherInfoRow}>

                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Humidity
                  </Text>

                  <Text style={styles.infoValue}>
                    💧 {weather.humidity}%
                  </Text>
                </View>

                <View style={styles.infoBox}>
                  <Text style={styles.infoLabel}>
                    Wind
                  </Text>

                  <Text style={styles.infoValue}>
                    🌬️ {weather.wind} km/h
                  </Text>
                </View>

              </View>

            </>

          ) : (

            <Text style={styles.weatherError}>
              Unable to load weather
            </Text>

          )
        }

        {/* REFRESH BUTTON */}

        <TouchableOpacity
          style={styles.refreshButton}
          onPress={loadWeather}
        >

          <Text style={styles.refreshText}>
            🔄 Refresh
          </Text>

        </TouchableOpacity>

      </LinearGradient>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardEmoji}>🛒</Text>
          <Text style={styles.cardText}>Buy Fertilizers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardEmoji}>📸</Text>
          <Text style={styles.cardText}>Crop Problem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardEmoji}>📢</Text>
          <Text style={styles.cardText}>Govt Schemes</Text>
        </TouchableOpacity>
      </View>

      {/* Alerts */}
      <Text style={styles.sectionTitle}>Recent Alerts</Text>

      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>🌧️ Rain Alert</Text>
        <Text style={styles.alertText}>
          Heavy rain expected tomorrow in Madurai district.
        </Text>
      </View>

      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>🌱 Farming Tip</Text>
        <Text style={styles.alertText}>
          Apply fertilizer during evening for better absorption.
        </Text>
      </View>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF5EC',
    padding: 16,
  },

  header: {
    marginTop: 20,
    marginBottom: 25,
  },

  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B5E20',
  },

  subText: {
    fontSize: 16,
    color: '#4E944F',
    marginTop: 6,
    fontWeight: '500',
  },

  weatherCard: {
    borderRadius: 30,
    padding: 24,
    marginBottom: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 10,
  },

  weatherTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  weatherTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    opacity: 0.9,
  },

  weatherCity: {
    color: '#fff',
    marginTop: 5,
    fontSize: 15,
    opacity: 0.85,
  },

  weatherEmoji: {
    fontSize: 52,
  },

  weatherTemp: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  weatherCondition: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 25,
  },

  weatherInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoBox: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    padding: 16,

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  infoLabel: {
    color: '#E3F2FD',
    fontSize: 14,
    marginBottom: 8,
  },

  infoValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  refreshButton: {
    marginTop: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  refreshText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  weatherError: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  weatherText: {
    color: '#fff',
    fontSize: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1B5E20',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  card: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },

  cardEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },

  cardText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  alertCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
  },

  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2E7D32',
  },

  alertText: {
    fontSize: 15,
    color: '#444',
  },
});