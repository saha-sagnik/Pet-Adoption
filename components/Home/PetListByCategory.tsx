import { View, FlatList,StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import PetListItem from './PetListItem';

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

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
  id: number;
  user?: User;
}


export default function CategoryList() {
  const [petList, setPetList] = useState<Pet[]>([])

  

  const [loader,setloader] = useState(false)
    useEffect(() => {
      GetPetList('Dogs');
    }, []);

    const GetPetList = async (category: string) => {
      try {
        setloader(true);
        const q = query(collection(db, 'Pets'), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        const pets = querySnapshot.docs.map(doc => {
          const data = doc.data();
          //console.log("Data:", JSON.stringify(data));
          return {
            name: data.name,
            breed: data.breed,
            age: data.age || 'Not specified',  
            category: data.category,
            imageUrl: data.imageUrl,
            sex: data.sex || 'Not specified',
            about: data.about || 'No bio available',
            address: data.address || 'No address provided',
            weight: data.weight || 0,
            id: data.id,
            user: data.user || { name: 'Unknown', email: 'No email provided', imageUrl: 'default_image_url' }
          } as Pet;
        });
        setPetList(pets);
        //console.log("Pets set in state:", JSON.stringify(pets));
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      } finally {
        setloader(false);
      }
    };
    
    

    return (
      
        <View
       style={{
        marginTop: 5,
       }}
        >
            <Category onCategorySelect={GetPetList} />
            <FlatList
                data={petList}
                horizontal={true}
                refreshing={loader}
                onRefresh={()=>GetPetList('Dogs')}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                  style={styles.petListItemContainer}
                  >
                    <PetListItem
                    
                    color=''
                    pet={item} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  petListItemContainer: {
      paddingTop: 5,
      marginVertical: 5,
      borderRadius: 5, 
  }
});
