import * as ImagePicker from 'expo-image-picker';

import { router, useLocalSearchParams } from 'expo-router';

import { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import api, { imagesURL } from '../services/api';

export default function AddEditProductScreen() {

  const { id } = useLocalSearchParams();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [shop, setShop] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  // LOAD PRODUCT IF EDIT
  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, []);

  const fetchProduct = async () => {

    try {
      const response = await api.get(`/products/${id}/`);
      const product = response.data;

      console.log("response", response)
      console.log("product details", product)

      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setQuantity(product.quantity);
      setCategory(product.category);
      setShop(product.shop);
      setPhone(product.phone);

      if (product.image) {
        setImage(`${imagesURL}${product.image}`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Failed to load product'
      );
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
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

    if (!result.canceled) {

      setImage(result.assets[0].uri);

    }
  };

  // ADD PRODUCT

  const addProduct = async () => {

    try {

      // VALIDATION

      if (
        !name ||
        !description ||
        !price ||
        !quantity ||
        !category ||
        !shop ||
        !phone ||
        !image
      ) {

        Alert.alert(
          'Error',
          'Please fill all fields'
        );

        return;
      }

      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('category', category);
      formData.append('shop', shop);
      formData.append('phone', phone);

      // IMAGE
      if (image && !image.startsWith('http')) {
        formData.append('image', {
          uri: image,
          name: 'product.jpg',
          type: 'image/jpeg',
        } as any);
      }

      let response;
      // EDIT PRODUCT
      if (id) {
        response = await api.put(`/products/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        );
      }  // ADD PRODUCT
      else {
        if (!image) {
          Alert.alert(
            'Error',
            'Please select an image'
          );
          return;
        }
        response = await api.post('/products/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        );
      }
      console.log(response.data);

      Alert.alert(
        'Success',
        isEdit ? 'Product updated successfully' :
          'Product added successfully',
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
        'Operation failed'
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
    >

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >

        {/* HEADER */}

        <Text style={styles.title}>
          {isEdit ? 'Edit Product'
            : 'Add Product'}
        </Text>

        {/* IMAGE */}

        <TouchableOpacity
          style={styles.imagePicker}
          onPress={pickImage}
        >

          <Image
            source={
              image
                ? { uri: image }
                : require('../assets/images/user.png')
            }
            style={styles.image}
          />

          <Text style={styles.imageText}>
            Tap to select image
          </Text>

        </TouchableOpacity>

        {/* FORM */}

        <View style={styles.card}>

          <TextInput
            placeholder="Product Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={[
              styles.input,
              {
                height: 120,
              },
            ]}
            multiline
          />

          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            style={styles.input}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
          />

          <TextInput
            placeholder="Shop Name"
            value={shop}
            onChangeText={setShop}
            style={styles.input}
          />

          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />

        </View>

        {/* BUTTON */}

        <TouchableOpacity
          style={styles.button}
          disabled={loading}
          onPress={addProduct}
        >

          <Text style={styles.buttonText}>
            {loading ? 'Please wait...' : isEdit ? 'Update Product' : 'Upload Product'}
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F8F2',
    padding: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
  },

  imagePicker: {
    alignItems: 'center',
    marginBottom: 25,
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },

  imageText: {
    marginTop: 10,
    color: '#666',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 3,
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 14,
    padding: 15,
    fontSize: 16,
    marginBottom: 18,
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});