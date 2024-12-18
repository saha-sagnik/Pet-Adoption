import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, DocumentData, getDocs } from 'firebase/firestore'; // Import getDocs instead of getDoc
import { db } from '@/config/FirebaseConfig';
import { StyleSheet } from 'react-native';

export default function Slider() {

    const [sliderList,setsliderList] = useState<DocumentData[]>([]);

    useEffect(()=>{
        getSliders();
    },[])

    const getSliders = async (): Promise<void> => {
        setsliderList([]);
        try {
            const slidersCollection = collection(db, 'Sliders');
            const snapshot = await getDocs(slidersCollection); // Use getDocs here
            snapshot.forEach(doc => {
                //console.log(doc.id, " => ", doc.data());
                setsliderList(sliderList=>[...sliderList,doc.data()])
            });
        } catch (error) {
            //console.error("Error fetching documents: ", error);
        }
    }

    return (
        <View
        style={{
            marginTop:15
        }}
        >
          
            <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
    data={sliderList}
    keyExtractor={(item, index) => index.toString()} // Add keyExtractor for performance optimization
    renderItem={({ item }) => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles?.sliderImage}
                onError={(e) => console.log('Loading image failed:', e.nativeEvent.error)} // Log any errors
            />
        </View>
    )}
/>
        </View>
    )

}

const styles = StyleSheet.create({
    sliderImage:{
      width:Dimensions.get('screen').width*0.9,
      height:  160,
      borderRadius:15,
      marginRight:15
    } 
})
