import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import api, { imagesURL } from '../services/api';

export default function EditProfileScreen() {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [farming, setFarming] = useState('');
  const [landSize, setLandSize] = useState('');
  const [image, setImage] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  const removeImage = () => { setImage(''); };

  const onRefresh = async () => {

    setRefreshing(true);

    await fetchProfile();

    setRefreshing(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await api.get('/profile/');

      const data = response.data;

      console.log(data);

      setName(data.name || '');
      setPhone(data.phone || '');
      setVillage(data.village || '');
      setDistrict(data.district || '');
      setFarming(data.farming || '');
      setLandSize(data.land_size || '');

      if (data.profile_image) {

        setImage(
          `${imagesURL}${data.profile_image}`
        );
      }

    } catch (error) {

      console.log(error);

    }
  };

  // PICK IMAGE

  const pickImage = async () => {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {

      Alert.alert(
        'Permission required'
      );

      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

    if (!result.canceled) {

      setImage(result.assets[0].uri);

    }
  };

  // UPDATE PROFILE

  const updateProfile = async () => {

    try {

      const formData = new FormData();

      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('village', village);
      formData.append('district', district);
      formData.append('farming', farming);
      formData.append('land_size', landSize);

      // IMAGE

      if (image && !image.startsWith('http')) {

        const filename = image.split('/').pop();

        const match = /\.(\w+)$/.exec(filename || '');

        const type = match
          ? `image/${match[1]}`
          : `image`;

        formData.append('profile_image', {
          uri: Platform.OS === 'ios'
            ? image.replace('file://', '')
            : image,
          name: filename,
          type,
        } as any);

      }

      if (!image) {
        formData.append('remove_image', 'true');
      }

      const response = await api.put(
        '/profile/',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        }
      );

      console.log(response.data);

      Alert.alert(
        'Success',
        'Profile updated successfully',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Error',
        'Update failed'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 50 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

          {/* IMAGE */}

          <View style={styles.header}>

            <TouchableOpacity onPress={pickImage}>

              <Image
                source={image ? { uri: image } : require('../assets/images/user.png')}
                style={styles.profileImage}
              />

            </TouchableOpacity>

            <Text style={styles.changePhoto}>
              Tap to change photo
            </Text>

            <TouchableOpacity onPress={removeImage}>
              <Text style={styles.changePhoto}>
                Remove Photo
              </Text>
            </TouchableOpacity>

          </View>

          {/* FORM */}

          <View style={styles.card}>

            <Text style={styles.label}>
              Name
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <Text style={styles.label}>
              Phone
            </Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>
              Village
            </Text>

            <TextInput
              value={village}
              onChangeText={setVillage}
              style={styles.input}
            />

            <Text style={styles.label}>
              District
            </Text>

            <TextInput
              value={district}
              onChangeText={setDistrict}
              style={styles.input}
            />

            <Text style={styles.label}>
              Farming
            </Text>

            <TextInput
              value={farming}
              onChangeText={setFarming}
              style={styles.input}
            />

            <Text style={styles.label}>
              Land Size (acres)
            </Text>

            <TextInput
              value={landSize}
              onChangeText={setLandSize}
              style={styles.input}
              keyboardType="phone-pad"
            />

          </View>

          {/* BUTTON */}

          <TouchableOpacity
            style={styles.updateButton}
            onPress={updateProfile}
          >

            <Text style={styles.updateText}>
              Update Profile
            </Text>

          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>

    </KeyboardAvoidingView>
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

  changePhoto: {
    marginTop: 10,
    color: '#2E7D32',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1B5E20',
  },

  input: {
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
  },

  updateButton: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40,
  },

  updateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});