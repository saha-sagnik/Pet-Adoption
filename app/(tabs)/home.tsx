import { View, Text } from 'react-native'
import React from 'react'
import Header from '@/components/Home/Header'
import Slider from '@/components/Home/Slider'
import CategoryList from '@/components/Home/PetListByCategory'

export default function HOME() {
  return (
    <View
    style={{
      padding:'4%',
      marginTop:'2%'
  }}>
      {/* Header */}
      <Header/>

      {/* Slider */}
      <Slider/>

      {/* Category */}
      <CategoryList/>

      {/* List of Pets */}
    </View>
  )
}