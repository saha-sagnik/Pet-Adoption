import Colors from "@/constants/Colors";
import { Text, Image, View } from "react-native";

interface Pet {
    age: string;
    breed: string;
    category: string;
    imageUrl: string;
    name: string;
    sex: string;
}

interface PetListItemProps {
    pet: Pet;
}

const PetListItem: React.FC<PetListItemProps> = ({ pet }) => {
    return (
        <View
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
            
        </View>
    );
}


export default PetListItem;
