import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';

interface Pet {
    about: string,
    age: string;
    breed: string;
    category: string;
    imageUrl: string;
    name: string;
    sex: string;
    address: string;
    weight: number;
  }

const PetSubInfo: React.FC<{pet: Pet}>=({pet})=> {
  return (
    <View
    style={{
        paddingHorizontal:20,
        
    }}
    >
      <View
      style={{
        display:'flex',
        flexDirection: 'row'
      }}
      >
        <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            padding: 10,
            margin: 5,
            borderRadius: 8,
            gap:10,
            flex: 1

        }}
        >
            <Image source={require('./../../assets/images/calendar.png')}
            style={{
                width:40,
                height:40
            }}
            />
            <View>
            <Text
            style={{
                fontSize: 14,
                color: Colors.GRAY
            }}
            >Age:</Text>
            <Text
            style={{
                fontSize:20,
                fontWeight: 800,
            }}
            >{pet.age} {parseInt(pet.age) <= 1 ? 'year' : 'years'}</Text>
            </View>
        </View>
        <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            padding: 10,
            margin: 5,
            borderRadius: 8,
            gap:10,
            flex: 1,

        }}
        >
            <Image source={require('./../../assets/images/calendar.png')}
            style={{
                width:40,
                height:40
            }}
            />
            <View>
            <Text
            style={{
                fontSize: 14,
                color: Colors.GRAY
            }}
            >Breed:</Text>
            <Text
            style={{
                fontSize:15,
                fontWeight: 800,

            }}
            >{pet.breed}</Text>
            </View>
        </View>
      </View>
      <View
      style={{
        display:'flex',
        flexDirection: 'row'
      }}
      >
        <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            padding: 10,
            margin: 5,
            borderRadius: 8,
            gap:10,
            flex: 1

        }}
        >
            <Image source={require('./../../assets/images/calendar.png')}
            style={{
                width:40,
                height:40
            }}
            />
            <View>
            <Text
            style={{
                fontSize: 14,
                color: Colors.GRAY
            }}
            >Sex:</Text>
            <Text
            style={{
                fontSize:20,
                fontWeight: 800,
            }}
            >{pet.sex}</Text>
            </View>
        </View>
        <View
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.WHITE,
            padding: 10,
            margin: 5,
            borderRadius: 8,
            gap:10,
            flex: 1,

        }}
        >
            <Image source={require('./../../assets/images/calendar.png')}
            style={{
                width:40,
                height:40
            }}
            />
            <View>
            <Text
            style={{
                fontSize: 14,
                color: Colors.GRAY
            }}
            >Weight:</Text>
            <Text
            style={{
                fontSize:15,
                fontWeight: 800,

            }}
            >{pet.weight} kgs</Text>
            </View>
        </View>
      </View>
    </View>
  )
}

export default PetSubInfo;