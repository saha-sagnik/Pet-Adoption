import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import * as ImagePicker from "expo-image-picker";

import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME } from "@env";

interface Category {
  name: string;
}

export default function AddNewPet() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState<{
    name?: string;
    category?: string;
    breed?: string;
    age?: string;
    sex?: string;
    weight?: string;
    address?: string;
    about?: string;
    imageUrl?: string;
  }>({});

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Dogs");
  const [gender, setGender] = useState<"Male" | "Female" | undefined>();

  const [image, setImage] = useState<string | null>(null);
console.log("CLOUDINARY_UPLOAD_PRESET:", CLOUDINARY_UPLOAD_PRESET);

  const pickImage = async () => {
    try {
      console.log("Opening image picker...");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Image Picker Result:", result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log("Image URI set:", result.assets[0].uri);
      } else {
        console.log("Image picking was canceled.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Pet",
    });
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const categoriesCollection = collection(db, "Category");
      const snapshot = await getDocs(categoriesCollection);
      const categories = snapshot.docs.map((doc) => doc.data() as Category);
      setCategoryList(categories);
      //console.log("Fetched Categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (fieldName: string, fieldValue: string) => {
    console.log(`Updating formData for ${fieldName}:`, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting form...");
    console.log("Form Data:", formData);
    console.log("Image:", image);

    // Validate required fields
    const requiredFields: Array<keyof typeof formData> = ["name", "category", "breed", "age", "sex", "weight", "address", "about"];
    const isFormValid = requiredFields.every(
      (field) => formData[field] && formData[field]?.trim() !== ""
    );

    if (!isFormValid) {
      ToastAndroid.show("Enter All Details", ToastAndroid.SHORT);
      console.log("Validation failed: Missing required fields.");
      return;
    }

    if (!image) {
      ToastAndroid.show("Upload an Image", ToastAndroid.SHORT);
      console.log("Validation failed: Image is missing.");
      return;
    }

    // Upload image to Cloudinary
    try {
      const imageUrl = await uploadImageToCloudinary();
      if (!imageUrl) {
        ToastAndroid.show("Image upload failed", ToastAndroid.SHORT);
        console.log("Image upload failed.");
        return;
      }

      const finalFormData = { ...formData, imageUrl };
      console.log("Final Form Data Submitted:", finalFormData);

      // Show success message
      ToastAndroid.show("Pet added successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error during form submission:", error);
      ToastAndroid.show("Something went wrong. Please try again.", ToastAndroid.SHORT);
    }
  };

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      console.log("Uploading image to Cloudinary...");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Cloudinary Response:", data);

      if (data.secure_url) {
        return data.secure_url;
      } else {
        console.error("Cloudinary upload error:", data);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.title}>Add New Pet for Adoption</Text>

      <Pressable onPress={pickImage}>
        {!image ? (
          <Image
            style={styles.image}
            source={require("../../assets/images/favicon.png")}
          />
        ) : (
          <Image style={styles.image} source={{ uri: image }} />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          style={styles.input}
          onValueChange={(itemValue) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    paddingBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    marginVertical: 10,
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 15,
    backgroundColor: Colors.WHITE_GRAY,
    borderRadius: 15,
    borderWidth: 1,
  },
  label: {
    marginVertical: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "red",
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
  },
});
