import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const user = useUser();

  useEffect(() => {
    //console.log("Component Mounted. User:", user);
    //console.log("Redirect decision based on user signed-in:", user.isSignedIn);
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      {user.isSignedIn ? (
        <Redirect href={'/(tabs)/home'} />
      ) : (
        <Redirect href={"/login"} />
      )}
    </View>
  );
}
