import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRouter, useNavigation, useLocalSearchParams, router } from "expo-router";
import { StyleSheet } from "react-native";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import About from "@/components/PetDetails/About";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

interface Pet {
  id:number,
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

export default function PetDetails() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const router = useRouter();

  const {user} = useUser();

 
  let pet: Pet | null = null;

  const InitiateChat = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      const petOwnerEmail = pet?.user?.email; // Ensure this accesses the correct email
      if (!userEmail || !petOwnerEmail) {
        console.error("User email or pet owner email is missing.");
        return;
      }
  
      const docId1 = `${userEmail}_${petOwnerEmail}`;
      const docId2 = `${petOwnerEmail}_${userEmail}`;
  
      // Query the Chat collection
      const q = query(collection(db, "Chat"), where("id", "in", [docId1, docId2]));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          router.push({
            pathname: "/chat",
            params: { id: doc.id },
          });
        });
        return; // If a chat exists, exit the function
      }
  
      // If no chat exists, create a new one
      const newDocRef = doc(db, "Chat", docId1);
      await setDoc(newDocRef, {
        id: docId1,
        users: [
          {
            email: userEmail,
            imageUrl: user?.imageUrl || "https://via.placeholder.com/150", // Corrected here
            name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Unknown",
          },
          {
            email: petOwnerEmail,
            imageUrl: pet?.user?.imageUrl || "https://via.placeholder.com/150",
            name: pet?.user?.name || "Unknown",
          },
        ],
      });
  
      // Redirect to the new chat
      router.push({
        pathname: "/chat/index",
        params: { id: docId1 },
      });
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };
  
  

  try {
    if (params.pet) {
      pet = JSON.parse(params.pet as string);
    } else {
      console.error("No pet data found in params.");
    }
  } catch (error) {
    console.error("Failed to parse pet data:", error);
  }

  // Handle missing pet data
  if (!pet) {
    return (
      <View>
        <Text>Error: Unable to load pet details.</Text>
      </View>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {/* Pet Info */}
        <PetInfo pet={pet} />
        {/* Pet Properties */}
        <PetSubInfo pet={pet} />
        {/* About Section */}
        <About pet={pet} />
        {/* Owner Details */}
        <OwnerInfo pet={pet} />
        <View style={{ height: 70 }}>

        </View>
        {/* Adopt Me Button */}
        <View
          style={styles?.container}>
          <TouchableOpacity
          onPress={InitiateChat}
          style={styles?.adopt}>
            <Text
            style={{
                fontSize: 20,
                textAlign:"center",
                fontWeight: 900,
              }}
            >Adopt Me
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width: '100%',
    bottom:0
  },

  adopt: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
  }
})
