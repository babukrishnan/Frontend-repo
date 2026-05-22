import { useEffect, useState } from 'react';

import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';
import api, { imagesURL } from '../services/api';

export default function MyProductsScreen() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {
            const response = await api.get('/my-products/');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // DELETE PRODUCT
    const deleteProduct = async (id: number) => {
        Alert.alert('Delete', 'Are you sure?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    try {
                        await api.delete(`/products/${id}/`);
                        await fetchProducts();
                    } catch (error) {
                        console.log(error);
                    }
                },
            },
        ]
        );
    };

    const renderItem = ({ item }: any) => (

        <View style={styles.card}>

            <Image
                source={{
                    uri: `${imagesURL}${item.image}`,
                }}
                style={styles.image}
            />

            <View style={{ flex: 1 }}>

                <Text style={styles.name}>
                    {item.name}
                </Text>

                <Text style={styles.price}>
                    ₹ {item.price}
                </Text>

                <Text style={styles.category}>
                    {item.category}
                </Text>

            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push({
                    pathname: '/addeditproduct', params: {
                        id: String(item.id),
                    },
                })
                }
            >
                <Text style={styles.deleteText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                    deleteProduct(item.id)
                }
            >

                <Text style={styles.deleteText}>
                    Delete
                </Text>

            </TouchableOpacity>

        </View>
    );

    return (

        <View style={styles.container}>
            <Text style={styles.text}>My product</Text>
            <FlatList
                data={products}
                keyExtractor={(item: any) =>
                    item.id.toString()
                }
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#cfcfcf',
        padding: 15,
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'green',
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        elevation: 3,
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    price: {
        color: 'green',
        marginTop: 5,
    },

    category: {
        color: '#666',
        marginTop: 3,
    },

    editButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 10,
    },

    deleteButton: {
        backgroundColor: 'red',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },

    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});