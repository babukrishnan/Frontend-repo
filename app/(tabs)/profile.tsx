import api, { imagesURL } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {

  const [user, setUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // AUTO RELOAD WHEN SCREEN FOCUSED

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const onRefresh = async () => {

    setRefreshing(true);

    await fetchProfile();

    setRefreshing(false);
  };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  const fetchProfile = async () => {

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem('access');

      console.log('PROFILE TOKEN:', token);

      if (!token) {

        router.replace('/signUp');

        return;
      }

      // API CALL
      const response = await api.get('/profile/');

      console.log('PROFILE DATA:', response.data);

      setUser(response.data);

    } catch (error: any) {

      console.log('PROFILE ERROR:', error.response?.data);

      // TOKEN INVALID
      if (error.response?.status === 401) {

        await AsyncStorage.multiRemove([
          'access',
          'refresh',
        ]);

        router.replace('/signUp');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // NO USER
  if (!user) {

    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text>No Profile Found</Text>
      </View>
    );
  }

  const logout = async () => {
    try {
       // REMOVE TOKENS
      await AsyncStorage.multiRemove(['access','refresh',]);
      // Clear user state
      setUser(null);
      // RESET NAVIGATION
      router.replace('/signUp');
    } catch (error) {
      console.log('LOGOUT ERROR:', error);
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
        <Image
          source={
            user.profile_image
              ? {
                uri: `${imagesURL}${user.profile_image}`,
              }
              : require('../../assets/images/user.png')
          }
          style={styles.profileImage}
        />
        <Text style={styles.name}>
          {user.name}
        </Text>
        <Text style={styles.location}>
          {user.village} {user.district}
        </Text>
      </View>

      {/* Info Card */}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Farmer Details
        </Text>
        <Text style={styles.info}>
          📞 {user.phone}
        </Text>
        <Text style={styles.info}>
          🌾 {user.farming}
        </Text>

        <Text style={styles.info}>
          🚜 {user.land_size} acres
        </Text>
      </View>

      {/* Menu */}

      <TouchableOpacity
        style={styles.menuButton}
      >
        <Text style={styles.menuText}>
          🛒 My Orders
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => router.push('/addeditproduct')}
      >
        <Text style={styles.menuText}>
          ✏️ Add Product
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}
        onPress={() => router.push('/myproduct')}>
        <Text style={styles.menuText}>
          🌱 My Products
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuText}>
          🌐 Language
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => router.push('/editProfile' as any)}
      >
        <Text style={styles.menuText}>
          ✏️ Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

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
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#1B5E20',
  },

  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    elevation: 3,
    marginBottom: 25,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },

  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },

  menuButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 2,
  },

  menuText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },

  logoutButton: {
    backgroundColor: '#D32F2F',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },

  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});