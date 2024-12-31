import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';

export default function PetDetails() {
  const pet = useLocalSearchParams();
  const navigation = useNavigation();

  interface Pet {
    about: string,
    age: string;
    breed: string;
    category: string;
    imageUrl: string;
    name: string;
    sex: string;
    address: string;
}



  useEffect(()=>{
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: ''
    })
  },[])

  return (
    <View>
      {/* Pet Info */}
      <PetInfo pet={pet}/>
      {/* Pet properties */}
      <PetSubInfo pet={pet}/>
      {/* about */}
      {/* owner details */}
      {/* adopt me button */}
    </View>
  )
}