import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import About from "@/components/PetDetails/About";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";
import Colors from "@/constants/Colors";

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
  user?: User;
}

export default function PetDetails() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  let pet: Pet | null = null;

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
        <View
          style={styles?.container}>
          <TouchableOpacity style={styles?.adopt}>
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
      {/* Adopt Me Button */}

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
