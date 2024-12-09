import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

export default function Header() {

    const user = useUser();

    const fullName = user ? `${user.user?.firstName}` : '';

    if (!user.isLoaded) {
        return <Text>Loading...</Text>;
    }

    // console.log(user)
    return (
        <View
        style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }}
        >
            <View>
            <Text
            style={{
                fontFamily:'',
                fontSize:12
            }}
            >Welcome,</Text>
            <Text
            style={{
                fontFamily:'',
                fontSize:20
            }}
            >
                {fullName}
            </Text>
            </View>
            <Image source={{uri:user.user?.imageUrl}}
            style={{
                width:40,
                height:40,
                borderRadius:99
            }}
            />
        </View>
    )
}