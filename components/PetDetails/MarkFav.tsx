import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GetFavList, updateFav } from "../../shared/Shared";
import { useUser } from "@clerk/clerk-expo";

interface Pet {
  id: number;
}

export default function MarkFav({ pet }: { pet: Pet }) {
  const { user } = useUser();
  const [favList, setFavList] = useState<number[]>([]); // Typed as number[]

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    try {
      const result = await GetFavList(user);
      console.log("Favorite List:", result);
      setFavList(result?.favorites ?? []);
    } catch (error) {
      console.error("Error fetching favorite list:", error);
    }
  };

  const AddToFav = async () => {
    try {
      if (!pet?.id) {
        console.error("Pet ID is undefined");
        return;
      }

      // Append pet.id to the favorites list
      const updatedFavList = [...favList, pet.id];
      console.log("Favorites being updated:", updatedFavList);

      // Update Firestore and local state
      await updateFav(user, updatedFavList);
      setFavList(updatedFavList); // Update local state
      console.log("Added to favorites:", updatedFavList);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFav = async () => {
    try {
      const updatedFavList = favList.filter((item) => item !== pet.id);
      console.log("Favorites after removal:", updatedFavList);

      // Update Firestore and local state
      await updateFav(user, updatedFavList);
      setFavList(updatedFavList); // Update local state
    } catch (error) {
      console.error("Error removing favorite:", error);
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
          <Ionicons name="heart-outline" size={30} color="black" />
        </Pressable>
      )}
    </View>
  );
}
