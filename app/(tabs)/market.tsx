import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api, { imagesURL } from '../../services/api';
import { Product } from '../../types/product';

export default function MarketScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products/');
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onRefresh = async () => {

        setRefreshing(true);

        await fetchProducts();

        setRefreshing(false);
    };

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#4CAF50']}
                />
            }
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>🛒 Farmer Market</Text>
                <Text style={styles.subTitle}>
                    Buy fertilizers and farming products
                </Text>
            </View>

            {/* Search */}
            <TextInput
                placeholder="Search products..."
                placeholderTextColor="#777"
                style={styles.searchInput}
            />

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryContainer}
            >
                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>🌱 Seeds</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>🧪 Fertilizers</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>💧 Pesticides</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.categoryButton}>
                    <Text style={styles.categoryText}>🚜 Tools</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Product Cards */}
            {products.map((product) => (
                <TouchableOpacity
                    key={product.id}
                    style={styles.productCard}
                    onPress={() =>
                        router.push({
                            pathname: '/product/[id]',
                            params: {
                                id: String(product.id),
                            },
                        })
                    }
                >
                    <Image
                        source={{
                            uri: `${imagesURL}${product.image}`,
                        }}
                        style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <Text style={styles.category}>{product.category}</Text>
                        <Text style={styles.productPrice}>{product.price}</Text>
                        <Text style={styles.quantity}>
                            Quantity: {product.quantity}
                        </Text>
                        <Text style={styles.shopName}>{product.shop}</Text>
                    </View>
                    <TouchableOpacity style={styles.buyButton} onPress={() => router.push({ pathname: '/product/[id]', params: { id: String(product.id) } })}>
                        <Text style={styles.buyButtonText}>Buy</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}

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

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2E7D32',
    },

    subTitle: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },

    searchInput: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 14,
        marginBottom: 20,
        fontSize: 16,
        elevation: 2,
    },

    categoryContainer: {
        marginBottom: 20,
    },

    categoryButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        height: 45,
        justifyContent: 'center',
    },

    categoryText: {
        color: '#fff',
        fontWeight: '600',
    },

    productCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },

    productImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        marginRight: 15,
    },

    productInfo: {
        flex: 1,
    },

    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
    },

    category: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },

    productPrice: {
        fontSize: 16,
        color: '#4CAF50',
        marginTop: 4,
    },

    quantity: {
        fontSize: 14,
        color: '#777',
        marginTop: 4,
    },

    shopName: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },

    buyButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
    },

    buyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});