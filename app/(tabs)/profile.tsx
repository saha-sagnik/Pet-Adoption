import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useRouter } from 'expo-router';

interface MenuItem {
  id: number;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: string;
}

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const {signOut} = useAuth();

  const Menu: MenuItem[] = [
    {
      id: 1,
      name: 'Add a new Pet',
      icon: 'add-circle',
      path: '/add-new-pet'
    },
    {
      id:5,
      name:'My Post',
      icon: 'bookmark',
      path: '/user-post'
    },
    {
      id: 2,
      name: 'Favorites',
      icon: 'heart',
      path: '/(tabs)/favorite'
    },
    {
      id: 3,
      name: 'Inbox',
      icon: 'chatbubble',
      path: '/(tabs)/inbox'
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'exit',
      path: 'logout'
    }
  ];

  const onPressMenu = (item: MenuItem) => {
    if (item.name === 'Logout') {
      // handle logout
      signOut();
      return;
    }
    router.push('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileInfo}>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
        <Text style={styles.fullName}>{user?.fullName}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList
        data={Menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPressMenu(item)} style={styles.menuItem}>
            <Ionicons name={item.icon} size={30} color={Colors.PRIMARY} style={styles.icon} />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

        <View
        style={{
          padding:20,
        }}>

        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 25,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50, // Updated to use a numeric value for a perfect circle
  },
  fullName: {
    fontWeight: '800',
    fontSize: 25,
    marginTop: 6,
  },
  email: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.GRAY,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    padding: 10,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderRadius: 10,
    marginRight: 10, // Added to replace gap
  },
  menuText: {
    fontSize: 20,
    fontWeight: '500',
  }
});

export default Profile;
