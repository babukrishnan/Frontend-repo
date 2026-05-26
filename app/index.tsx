import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

import { useEffect } from 'react';

import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Index() {

  useEffect(() => {

    checkLogin();

  }, []);

  const checkLogin = async () => {
    // SPLASH DELAY
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('access');
      console.log('TOKEN:', token);
      if (token) {
        router.replace('/(tabs)');
      } else {
        router.replace('/signUp');

      }
    }, 3000)
  };

  return (

    <ImageBackground
      style={styles.container}
      resizeMode="cover"
    >

      <Image
        source={require('../assets/images/logo-bg.png')}
        style={styles.logo}
      />

      <StatusBar
        barStyle="light-content"
      />

      <View style={styles.overlay}>

        <Text style={styles.title}>
          செங்காந்தள்
        </Text>

        <Text style={styles.subtitle}>
          Farmers Connect
        </Text>

        <Text style={styles.quote}>
          “உழவன் உழைப்பின் விலை உழவன் கையில்”
        </Text>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F2E1D',
    paddingHorizontal: 24,
  },

  logo: {
    width: 140,
    height: 140,
    marginBottom: 28,
    borderRadius: 30,
  },

  overlay: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#F4F8F2',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 8,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#DCE8D5',
    marginTop: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },

  quote: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 35,
    textAlign: 'center',
    lineHeight: 38,
    fontWeight: '700',
    paddingHorizontal: 10,
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },

});