import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const GetFavList = async (user: any) => {
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    throw new Error("Invalid user object");
  }

  const docRef = doc(db, "UserFavPet", user.primaryEmailAddress.emailAddress);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    const newDoc = {
      email: user.primaryEmailAddress.emailAddress,
      favorites: [],
    };
    await setDoc(docRef, newDoc);
    return newDoc;
  }
};

export const updateFav = async (user: any, favorites: string[] = []) => {
  if (!user || !user.primaryEmailAddress?.emailAddress) {
    throw new Error("Invalid user object");
  }

  if (!Array.isArray(favorites)) {
    throw new Error("Favorites must be an array");
  }

  const docRef = doc(db, "UserFavPet", user.primaryEmailAddress.emailAddress);
  console.log("Favorites being updated:", favorites);

  try {
    await updateDoc(docRef, {
      favorites: favorites,
    });
    console.log("Favorites updated successfully:", favorites);
  } catch (error) {
    console.error("Error updating favorites:", error);
    throw error;
  }
};


export default GetFavList;
