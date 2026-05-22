import api from '@/services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

import React, { useState } from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignupScreen() {

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [isLogin, setIsLogin] =
    useState(false);

  const handleAuth = async () => {

    try {

      const endpoint =
        isLogin
          ? '/login/'
          : '/signup/';

      const response =
        await api.post(
          endpoint,
          {
            email,
            password,
          }
        );

      await AsyncStorage.setItem(
        'access',
        response.data.access
      );

      await AsyncStorage.setItem(
        'refresh',
        response.data.refresh
      );

      Alert.alert(
        'Success',
        isLogin
          ? 'Login Successful'
          : 'Signup Successful'
      );

      if (
        response.data.is_new_user
      ) {

        router.replace(
          '/completeprofile'
        );

      } else {

        router.replace(
          '/(tabs)'
        );

      }

    } catch (error: any) {

      console.log(error.response?.data);

      Alert.alert(
        'Error',
        error.response?.data?.error ||
        'Authentication Failed'
      );

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Farmer Marketplace
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
      >
        <Text style={styles.buttonText}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F4F8F2',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#2E7D32',
  },

  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#2E7D32',
  },
});