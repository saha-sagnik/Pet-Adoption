import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '@/components/Home/Header';
import Slider from '@/components/Home/Slider';
import CategoryList from '@/components/Home/PetListByCategory';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

export default function HOME() {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        padding: '4%',
        paddingTop: '2%'
      }}
    >
      {/* Header */}
      <Header />

      {/* Slider */}
      <Slider />

      {/* Category List */}
      <CategoryList />

      {/* Add a new pet */}
      <Link href={'/add-new-pet'}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 20,
          marginTop: 20,
          backgroundColor: Colors.PRIMARY,
          textAlign: 'center',
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          borderRadius: 15,
          justifyContent:'center'
        }}
      >
        <MaterialIcons
        name="pets" size={24} color="red" />
        <Text style={{ marginLeft: 10 }}>Add New Pet</Text>
      </Link>
    </ScrollView>
  );
}
