import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GetFavList, updateFav } from "../../shared/Shared";
import { useUser } from "@clerk/clerk-expo";

interface Pet {
  id: number; 
}

interface MarkFavProps {
  pet: Pet;
  color: string; 
}

export default function MarkFav({ pet, color }: MarkFavProps) {
  const { user } = useUser();
  const [favList, setFavList] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    try {
      const result = await GetFavList(user);
      //console.log("Favorite List:", result);
      setFavList(result?.favorites ?? []);
    } catch (error) {
      //console.error("Error fetching favorite list:", error);
    }
  };

  const AddToFav = async () => {
    try {
      if (!pet?.id) {
        //console.error("Pet ID is undefined");
        return;
      }

      const updatedFavList = [...favList, pet.id];
      //console.log("Favorites being updated:", updatedFavList);

      await updateFav(user, updatedFavList);
      setFavList(updatedFavList);
      //console.log("Added to favorites:", updatedFavList);
    } catch (error) {
      //console.error("Error adding to favorites:", error);
    }
  };

  const removeFav = async () => {
    try {
      const updatedFavList = favList.filter((item) => item !== pet.id);
      //console.log("Favorites after removal:", updatedFavList);

      await updateFav(user, updatedFavList);
      setFavList(updatedFavList);
    } catch (error) {
      //console.error("Error removing favorite:", error);
    }
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={removeFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
