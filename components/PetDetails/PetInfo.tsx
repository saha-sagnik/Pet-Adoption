import { View, Text, Image } from 'react-native';
import React from 'react';
import MarkFav from './MarkFav';

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

interface Pet {
  id:number;
  about: string;
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex: string;
  address: string;
  weight: number;
  user?: User;
}


// Here, pet should be destructured from props
const PetInfo: React.FC<{ pet: Pet }> = ({ pet }) => {
  //console.log("Pet info received in component:", pet);
 // console.log("Pet User:", pet.user?.name, "Email:", pet.user?.email);

 

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
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {pet.address}
          </Text>
        </View>
        <View
       
        >
          <MarkFav color='' pet={pet}/>
        </View>
      </View>

    </View>
  );
}

export default PetInfo;
