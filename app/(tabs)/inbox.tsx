import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import UserItem from '@/components/Inbox/UserItem';

interface User {
  email: string;
  imageUrl: string;
  name: string;
}

interface ChatDocument {
  id: string;
  userIds: string[];
  users: User[];
}

interface OtherUser {
  docId: string;
  email?: string;
  imageUrl?: string;
  name?: string;
}

const ChatComponent = () => {
  const [userList, setUserList] = useState<ChatDocument[]>([]);
  const { user } = useUser();
  const [loader, setLoader] = useState(false);

  // Define fetchChats outside useEffect
  const fetchChats = async () => {
    setLoader(true);
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.log("User email is missing.");
      setLoader(false); // Ensure the loader is turned off if there's an early return
      return;
    }

    const userEmail = user.primaryEmailAddress.emailAddress;
    const q = query(collection(db, 'Chat'), where('userIds', 'array-contains', userEmail));

    try {
      const querySnapshot = await getDocs(q);
      const chats: ChatDocument[] = [];
      if (querySnapshot.empty) {
        console.log("No chats found.");
      } else {
        querySnapshot.forEach(doc => {
          const chat = doc.data() as ChatDocument;
          chat.id = doc.id;
          chats.push(chat);
        });
        setUserList(chats);
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchChats(); // Call it inside useEffect
  }, [user]);

  const mapOtherUserList = (): OtherUser[] => {
    return userList.map(record => {
      const otherUser = record.users.find(u => u.email !== user?.primaryEmailAddress?.emailAddress);
      return {
        docId: record.id,
        ...otherUser
      };
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <FlatList
        style={{
          marginTop: 20,
        }}
        data={mapOtherUserList()}
        refreshing={loader}
        onRefresh={fetchChats} // Reference the function directly
        keyExtractor={(item) => item.docId}
        renderItem={({ item }) => (
          <UserItem userInfo={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ChatComponent;
