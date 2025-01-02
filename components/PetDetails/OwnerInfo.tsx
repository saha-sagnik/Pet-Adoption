import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


interface Pet {
  about: string;
  age: string;
  breed: string;
  category: string;
  imageUrl: string;
  name: string;
  sex: string;
  address: string;
  weight: number;
  user?: {
    name: string;
    email: string;
    imageUrl: string;
  };
}

const OwnerInfo: React.FC<{ pet: Pet }> = ({ pet }) => {
  //console.log("Fetched Pet Data", pet);
  //console.log("Fetched Pet Data", JSON.stringify(pet, null, 2));
  if (pet.user) {
    //console.log("Pet User Name:", pet.user.name);
    //console.log("Pet User Email:", pet.user.email);  // Specifically log the user object
  }

  if (!pet.user) {
    return (
      <View style={{ paddingHorizontal: 20, alignItems: 'center', marginTop: 20 }}>
        <Text>User information is not available for this pet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
      style={{
        display:"flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap:10
      }}
      >
      <Image
        source={{ uri: pet.user.imageUrl }}

        onError={() => console.log('Failed to load user image')}
        style={{
           width: 60, 
          height: 60, 
          borderRadius: 99
        }}
      />
      <View
      
      >
      <Text
      style={{
        fontSize:17
      }}
      >{pet?.user?.name || 'No name provided'}</Text>
      
      <Text
      
      style={{
        color: Colors.GRAY
      }}>Pet Owner</Text>
      </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container:{
    marginHorizontal:20,
    paddingHorizontal: 20,
    display:"flex",
    flexDirection:"row",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    borderRadius: 30,
    padding: 20,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between"
  }
})



export default OwnerInfo;
