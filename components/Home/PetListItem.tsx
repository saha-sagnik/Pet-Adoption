import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Text, Image, View, TouchableOpacity } from "react-native";

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
  

interface PetListItemProps {
    pet: Pet;
}

const PetListItem: React.FC<PetListItemProps> = ({ pet }) => {
    //console.log('Pet data before navigation:', pet);
    const router = useRouter();

    return (
        <TouchableOpacity

        onPress={() => {
            console.log('Navigating to /pet-details/index');
            router.push({
            pathname: '/pet-details',
            params: { pet: JSON.stringify(pet) },
            });
        }}
        
        style={{
            padding:10,
            marginRight:15,
            backgroundColor:Colors.WHITE,
            borderRadius:10
        }}
        >
            {pet.imageUrl && (
                <Image
                    source={{ uri: pet.imageUrl }}
                    style={{ width: 150, height: 135,
                        objectFit: 'cover',
                        borderRadius:10
                    }}
                />
            )}
            <Text
            style={{
                fontSize:18,
                fontWeight: "bold",
            }}
            >{pet.name}</Text>
            <View
            style={{
                display:"flex",
                justifyContent: "space-between"
            }}
            >
            <Text
            style={{
                fontSize:10,
                color:Colors.GRAY
            }}
            >{pet.breed}</Text>
           <Text
    style={{
        fontSize: 10,
        color: Colors.GRAY 
    }}
>
    {pet.age} {parseInt(pet.age) <= 1 ? 'year' : 'years'}
</Text>
            </View>
            
        </TouchableOpacity>
    );
}


export default PetListItem;
