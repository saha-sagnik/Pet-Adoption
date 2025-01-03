import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/clerk-expo";
import GetFavList from "@/shared/Shared";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import PetListItem from "@/components/Home/PetListItem";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string | number;
  category: string;
  imageUrl?: string;
}

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState<string[]>([]);
  const [favPets, setFavPets] = useState<Pet[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetFavPetids();
    }
  }, [user]);

  const GetFavPetids = useCallback(async () => {
    setLoader(true);
    try {
      const result = await GetFavList(user);
      const ids = result?.favorites ?? [];
      setFavIds(ids);

      if (ids.length > 0) {
        GetFavPetList(ids);
      } else {
        setFavPets([]); // Clear pets if no favorites exist
      }
    } catch (error) {
      console.error("Error fetching favorite IDs:", error);
    } finally {
      setLoader(false);
    }
  }, [user]);

  const GetFavPetList = async (ids: string[]) => {
    try {
      const q = query(collection(db, "Pets"), where("id", "in", ids));
      const querySnapshot = await getDocs(q);

      const pets: Pet[] = [];
      querySnapshot.forEach((doc) => {
        pets.push({ id: doc.id, ...doc.data() } as Pet);
      });
      setFavPets(pets);
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "800",
        }}
      >
        Favorites
      </Text>
      {!favPets.length && !loader && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No favorites added yet.
        </Text>
      )}
      <FlatList
        data={favPets}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onRefresh={GetFavPetids}
        refreshing={loader}
        renderItem={({ item }) => (
          <View>
            <PetListItem color="black" pet={item} />
          </View>
        )}
        contentContainerStyle={{
          padding: 20,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      />
    </View>
  );
}
