import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat } from 'react-native-gifted-chat'

interface User {
  email: string;
  imageUrl: string;
  name: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([])
  const navigation = useNavigation();
  const { user } = useUser();
  const params = useLocalSearchParams() as { id: string };

  useEffect(() => {
    GetUserDetails();
  }, []);

  const GetUserDetails = async () => {
    if (!params.id || typeof params.id !== "string") {
      console.error("Invalid chat ID");
      return;
    }

    const docRef = doc(db, "Chat", params.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data() as { users: User[] };
    console.log(result);

    const otherUser = result.users?.filter(
      (item) => item.email !== user?.primaryEmailAddress?.emailAddress
    );
    console.log("Other User:", otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0].name
    })
  };

  const onSend =(messages = []) => {
    
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
