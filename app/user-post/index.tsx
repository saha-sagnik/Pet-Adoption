import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';

export default function UserPost() {

    const navigation = useNavigation();
    const {user} = useUser();
    
    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'User Post'
        });
        if (user && user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) {
            GetUserPost();
        } else {
            console.log('No user email address available');
        }
    }, [user]);
    

    const GetUserPost = async () => {
        try {
            const q = query(collection(db, 'Pets'), where('email', '==', user?.primaryEmailAddress?.emailAddress));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                console.log('No posts found for the user.');
                return;
            }
    
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
        }
    };
    

  return (
    <View>
      <Text>UserPost</Text>
    </View>
  )
}