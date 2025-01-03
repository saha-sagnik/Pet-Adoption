import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Text, Image, View, TouchableOpacity } from "react-native";
import MarkFav from "../PetDetails/MarkFav";

interface User {
  name: string;
  email: string;
  imageUrl: string;
}

interface Pet {
  id:number;
  about: string;
  age: string | number; // Handle both string and number
  breed: string;
  category: string;
  imageUrl?: string; // Mark optional if it can be undefined
  name: string;
  sex: string;
  address: string;
  weight: number;
  user?: User;
}

interface PetListItemProps {
  pet: Pet;
  color: string;
}

const PetListItem: React.FC<PetListItemProps> = ({ pet }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Navigating to /pet-details/index");
        router.push({
          pathname: "/pet-details",
          params: { pet: JSON.stringify(pet) },
        });
      }}
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          right: 10,
          top: 10,
        }}
      >
        <MarkFav pet={pet} color="white"/>
      </View>

      {pet.imageUrl && (
        <Image
          source={{ uri: pet.imageUrl }}
          style={{
            width: 150,
            height: 135,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
      )}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {pet.name}
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: Colors.GRAY,
          }}
        >
          {pet.breed}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: Colors.GRAY,
          }}
        >
          {parseInt(`${pet.age}`) > 1 ? `${pet.age} years` : `${pet.age} year`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;
