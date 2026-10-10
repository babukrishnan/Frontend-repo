import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default function OrdersScreen() {
 const [items,setItems] = useState<any[]>([]);
 const [mode,setMode] = useState('buyer');
 const [error,setError] = useState('');
 const load = async (side:string) => {
   try { const response = await api.get('/orders/',{params:{as:side}}); setItems(response.data); setError(''); }
   catch {setError('Could not load orders');}
 };
 useFocusEffect(useCallback(()=>{load(mode);},[mode]));
 return <ScrollView style={s.page}>
   <Text style={s.title}>My Orders</Text>
   <View style={s.row}>{['buyer','seller'].map(side=>
     <TouchableOpacity key={side} style={s.button} onPress={()=>setMode(side)}><Text style={s.buttonText}>{side==='buyer'?'My Purchases':'Incoming Orders'}</Text></TouchableOpacity>
   )}</View>
   {!!error&&<Text>{error}</Text>}
   {items.length===0?<Text>No orders yet.</Text>:items.map(x=>
     <View key={x.id} style={s.card}>
       <Text style={s.bold}>Order #{x.id}: {x.product_name}</Text>
       <Text>Quantity: {x.quantity} • ₹{x.total_amount}</Text>
       <Text>Status: {x.status}</Text>
       <Text>Delivery: {x.delivery_address}</Text>
     </View>
   )}
 </ScrollView>;
}
const s=StyleSheet.create({
 page:{flex:1,padding:20,backgroundColor:'#f4f8f2'},
 title:{fontSize:26,fontWeight:'bold',color:'#245f33',marginBottom:20},
 row:{flexDirection:'row',gap:10,marginBottom:20},
 button:{backgroundColor:'#2e7d32',padding:10,borderRadius:10,flex:1},
 buttonText:{color:'white',textAlign:'center'},
 card:{padding:16,backgroundColor:'white',borderRadius:12,marginBottom:12},
 bold:{fontWeight:'bold',marginBottom:8}
});
