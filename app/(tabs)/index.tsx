import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() { 
  return (
    <ScrollView style={styles.container}>
    
    {/* Header */}
    <View style={styles.header}>
      <Text style={styles.greeting}>👋 Vanakkam Farmer</Text>
      <Text style={styles.subText}>Welcome to Smart Farmer App</Text>
    </View>

    {/* Weather Card */}
    <View style={styles.weatherCard}>
        <Text style={styles.weatherTitle}>🌤️ Weather Today</Text>
        <Text style={styles.weatherText}>Madurai - 32°C</Text>
        <Text style={styles.weatherText}>Good day for irrigation</Text>
    </View>

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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8F2',
    padding: 16,
  },

  header: {
    marginTop: 20,
    marginBottom: 20,
  },

  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  subText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },

  weatherCard: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
  },

  weatherTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
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