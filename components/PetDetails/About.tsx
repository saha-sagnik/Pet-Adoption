import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react';
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

const About: React.FC<{ pet: Pet }> = ({ pet }) => {
    const [readMore, useReadMore] = useState(true)
    return (
        <View
            style={{
                padding: 20,
            }}
        >
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 600,
                }}
            >About {pet.name}</Text>
            <Pressable
            onPress={
                ()=>useReadMore(false)
            }
            >
                <Text

                    numberOfLines={readMore ? 3 : 20}
                    style={{
                        fontSize: 16
                    }}
                >{pet.about}</Text>
                {readMore &&
                    <Text
                        style={{
                            fontSize: 14,
                            color: Colors.PRIMARY
                        }}
                    >Read More</Text>

                }
            </Pressable>
        </View>
    )
}

export default About;