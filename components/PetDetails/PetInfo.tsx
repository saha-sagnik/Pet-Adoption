import { View, Text, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Pet {
  about: string,
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex: string;
  address: string;
  weight: number;
}

// Here, pet should be destructured from props
const PetInfo: React.FC<{ pet: Pet }> = ({ pet }) => {
  console.log("Pet info received in component:", pet);
  return (
    <View>
      <Image source={{ uri: pet.imageUrl }}
        style={{
          width: '100%',
          height: 500,
          objectFit: 'cover'
        }}
      />
      <View style={{
        padding: 25,
        paddingBottom: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <View>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 800
            }}
          >
            {pet.name}
          </Text>
          {/* <Text
            style={{
              fontSize: 20,
            }}
          >
            {pet.address}
          </Text> */}
        </View>
        <View
       
        >
            <Ionicons name="heart-outline" size={24} color="black" />
        </View>
      </View>

    </View>
  );
}

export default PetInfo;
