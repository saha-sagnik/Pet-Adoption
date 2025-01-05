import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { GiftedChat, IMessage } from 'react-native-gifted-chat'

interface User {
  email: string;
  imageUrl: string;
  name: string;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const navigation = useNavigation();
  const { user } = useUser();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      GetUserDetails(id);
      const messagesRef = collection(db, 'Chat', id, 'Messages');
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: {
            _id: doc.data().user._id,
            name: doc.data().user.name,
            avatar: doc.data().user.avatar,
          },
        })) as IMessage[];

        setMessages(messageData);
      });

      return () => unsubscribe();
    }
  }, [id]);

  const GetUserDetails = async (chatId: string) => {
    const docRef = doc(db, "Chat", chatId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("No such document!");
      return;
    }

    const result = docSnap.data() as { users: User[] };
    const otherUser = result.users?.find(
      (item) => item.email !== user?.primaryEmailAddress?.emailAddress
    );

    if (otherUser) {
      navigation.setOptions({
        headerTitle: otherUser.name
      });
    }
  };

  const onSend = async (newMessages: IMessage[] = []) => {
    if (newMessages.length > 0) {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
      await addDoc(collection(db, 'Chat', id || '', 'Messages'), newMessages[0]);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.id || user?.primaryEmailAddress?.emailAddress || 'unknown_id',
        name: user?.fullName || 'Anonymous',
        avatar: user?.imageUrl || undefined
      }}
    />
  );
}
