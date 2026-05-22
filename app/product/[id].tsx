import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image,
    Linking,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Product } from '../../types/product';

import api, { imagesURL } from '../../services/api';

export default function ProductDetailScreen() {

    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {

        try {

            const response = await api.get(`/products/${id}/`
            );

            console.log(response.data);

            setProduct(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const onRefresh = async () => {

        setRefreshing(true);

        await fetchProduct();

        setRefreshing(false);
    };

    if (!product) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const callSeller = () => {
        Linking.openURL(`tel:${product?.phone}`);
    };

    const openWhatsApp = () => {
        Linking.openURL(
            `https://wa.me/${product?.phone}?text=Hello, I want to buy this product`
        );
    };

    return (
        <><Stack.Screen
            options={{
                title: 'Product Details',
                headerShown: false,
            }} />
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

                {/* Product Image */}
                <Image
                    source={{
                        uri: `${imagesURL}${product.image}`,
                    }}
                    style={styles.productImage}
                />

                {/* Product Info */}
                <View style={styles.content}>
                    <Text style={styles.productName}>
                        {product.name}
                    </Text>

                    <Text style={styles.category}>
                        🌱 {product.category}
                    </Text>

                    <Text style={styles.price}>
                        ₹ {product.price}
                    </Text>

                    <Text style={styles.quantity}>
                        Available Quantity:
                        {' '}
                        {product.quantity}
                    </Text>

                    <Text style={styles.description}>
                        {product.description}
                    </Text>

                    {/* Seller Info */}
                    <View style={styles.sellerCard}>
                        <Text style={styles.sellerTitle}>
                            Seller Information
                        </Text>

                        <Text style={styles.sellerName}>
                            🏪 {product?.shop}
                        </Text>

                        <Text style={styles.sellerPhone}>
                            📞 {product?.phone}
                        </Text>
                    </View>

                    {/* Buttons */}

                    <TouchableOpacity
                        style={styles.callButton}
                        onPress={callSeller}
                    >
                        <Text style={styles.buttonText}>
                            📞 Call Seller
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.whatsappButton}
                        onPress={openWhatsApp}
                    >
                        <Text style={styles.buttonText}>
                            💬 WhatsApp
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView></>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F8F2',
        padding: 16,
    },

    imageContainer: {
        backgroundColor: '#E8F5E9',
        height: 220,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    productImage: {
        width: '100%',
        height: 250,
        borderRadius: 20,
        resizeMode: 'cover',
    },

    content: {
        padding: 20,
    },

    productName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#1B5E20',
    },

    category: {
        marginTop: 8,
        color: '#43A047',
        fontWeight: '600',
        fontSize: 16,
    },

    price: {
        fontSize: 22,
        color: '#4CAF50',
        marginTop: 10,
        fontWeight: 'bold',
    },

    quantity: {
        marginTop: 10,
        fontSize: 16,
        color: '#444',
    },

    description: {
        fontSize: 16,
        color: '#555',
        marginTop: 20,
        lineHeight: 24,
    },

    sellerCard: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 16,
        marginTop: 25,
        elevation: 3,
    },

    sellerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2E7D32',
    },

    sellerName: {
        fontSize: 17,
        fontWeight: '600',
    },

    sellerPhone: {
        marginTop: 6,
        color: '#666',
        fontSize: 15,
    },

    callButton: {
        backgroundColor: '#2E7D32',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 25,
    },

    whatsappButton: {
        backgroundColor: '#25D366',
        padding: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 40,
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});