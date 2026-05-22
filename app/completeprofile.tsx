import { useState } from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { router } from 'expo-router';

import api from '@/services/api';

export default function CompleteProfileScreen() {

  const [name, setName] = useState('');

  const [village, setVillage] = useState('');

  const [district, setDistrict] = useState('');
  const [farming, setFarming] = useState('')
  const [land_size, setLand] = useState('')

  const [loading, setLoading] = useState(false);

  const completeProfile = async () => {

    // SIMPLE VALIDATION

    if (!name || !village || !district) {

      Alert.alert(
        'Error',
        'Please fill all fields'
      );

      return;
    }

    try {

      setLoading(true);

      // GET TOKEN

      const token =
        await AsyncStorage.getItem(
          'token'
        );

      // API CALL

      await api.post(
        '/create-profile/',
        {
          name,
          village,
          district,
          farming,
          land_size
        },
      );

      Alert.alert(
        'Success',
        'Profile completed'
      );

      // GO TO HOME

      router.replace('/(tabs)');

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Failed to complete profile'
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.title}>
        Complete Profile
      </Text>

      {/* NAME */}

      <TextInput
        placeholder="Farmer Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* VILLAGE */}

      <TextInput
        placeholder="Village"
        value={village}
        onChangeText={setVillage}
        style={styles.input}
      />

      {/* DISTRICT */}

      <TextInput
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
        style={styles.input}
      />

      <TextInput
        placeholder="Farme"
        value={farming}
        onChangeText={setFarming}
        style={styles.input}
      />

      <TextInput
        placeholder="Land Size (in acres)"
        value={land_size}
        onChangeText={setLand}
        style={styles.input}
      />

      {/* BUTTON */}

      <TouchableOpacity
        style={styles.button}
        onPress={completeProfile}
        disabled={loading}
      >

        <Text style={styles.buttonText}>

          {loading
            ? 'Saving...'
            : 'Complete Profile'}

        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F4F8F2',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2E7D32',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    padding: 15,
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

});