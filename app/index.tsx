import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

import { useEffect } from 'react';

import {
  ActivityIndicator,
  View,
} from 'react-native';

export default function Index() {

  useEffect(() => {

    checkLogin();

  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('access');

    console.log('TOKEN:', token);

    if (token) {

      router.replace('/(tabs)');

    } else {

      router.replace('/signUp');

    }
  };

  return (

    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <ActivityIndicator size="large" />

    </View>
  );
}