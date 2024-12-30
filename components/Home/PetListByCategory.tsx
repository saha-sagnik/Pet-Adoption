import { View, FlatList,StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import PetListItem from './PetListItem';

interface Pet {
  name: string;
  breed: string;
  age: string;
  category: string;
  imageUrl: string;
  sex: string;
  about: string;
  address: string
}

export default function CategoryList() {
  const [petList, setPetList] = useState<Pet[]>([])

  

  const [loader,setloader] = useState(false)
    useEffect(() => {
      GetPetList('Dogs');
    }, []);

    const GetPetList = async (category: string) => {
      setloader(true)
      const q = query(collection(db, 'Pets'), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const pets = querySnapshot.docs.map(doc => {
     
          const data = doc.data();
          return {
              name: data.name,
              breed: data.breed,
              age: data.age,
              category: data.category,
              imageUrl: data.imageUrl,
              sex: data.sex,
              about:data.about,
          } as Pet; 
      });
      setloader(false);
      setPetList(pets); 
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
