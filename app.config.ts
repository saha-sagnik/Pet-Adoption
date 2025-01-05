import 'dotenv/config';

export interface AppConfig {
    
    clerkPublicKey: string;
    firebaseApiKey: string;
    cloudinaryCloudName: string;
    cloudinaryApiKey: string;
    cloudinaryApiSecret: string;
    cloudinaryUploadPreset: string;
}

const config: AppConfig = {
    
    clerkPublicKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
};

