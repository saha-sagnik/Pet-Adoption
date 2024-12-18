import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import Colors from '@/constants/Colors';

export default function Category() {
  
    const [categoryList, setCategoryList] = useState<DocumentData[]>([]);
    const [selectedCategory,setSelectedCategory] = useState<DocumentData[]>('Dogs');
    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async (): Promise<void> => {
        setCategoryList([]); // Reset the list before fetching new data
        try {
            const categoriesCollection = collection(db, 'Category');
            const snapshot = await getDocs(categoriesCollection); // Use getDocs to fetch data
            snapshot.forEach(doc => {
                setCategoryList(categoryList => [...categoryList, doc.data()]); // Append new category data
            });
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }

    return (
        <View style={{ marginTop: 15 }}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={categoryList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    onPress={()=>setSelectedCategory(item.name)}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.categoryImage}
                            onError={(e) => console.log('Loading image failed:', e.nativeEvent.error)}
                        />
                        <Text style={[styles.categoryName, selectedCategory==item.name && styles.selectedCategoryContainer]}>{item.name}</Text>
                    </TouchableOpacity
                    
                    >
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    categoryImage: {
        width: Dimensions.get('screen').width * 0.25,
        height: 100,
        borderRadius: 15,
        marginRight: 15
    },
    categoryName: {
        textAlign: 'center',
        marginTop: 5
    },
    selectedCategoryContainer:{
        textDecorationLine: 'underline',
        //backgroundColor: Colors.PRIMARY,
    }
});
