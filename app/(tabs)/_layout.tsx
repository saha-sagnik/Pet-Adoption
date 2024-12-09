import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/constants/Colors';


export default function TabLayot() {
    return (

        <Tabs
        screenOptions={{
            tabBarActiveTintColor: Colors.PRIMARY
        }}
        >
            <Tabs.Screen name='home'
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />

                }}
            />
            <Tabs.Screen name='favorite'
                options={{
                    title: 'Favorite',
                    headerShown: false,
                    tabBarIcon:({color})=><MaterialIcons name="favorite" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='inbox'
                options={{
                    title: 'Inbox',
                    headerShown: false,
                    tabBarIcon:({color})=><AntDesign name="inbox" size={24} color={color} />
                }}
            />
            <Tabs.Screen name='profile'

                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon:({color})=><MaterialCommunityIcons name="face-man-profile" size={24} color={color} />
                }} />
        </Tabs>

    )
}