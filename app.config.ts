// Assuming TypeScript support in your Expo setup, which typically requires a custom setup

import { ExpoConfig } from '@expo/config-types';

interface MyExtraConfig {
  clerkPublicKey: string;
  firebaseApiKey: string;
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
  cloudinaryUploadPreset: string;
}

export default ({ config }: { config: ExpoConfig }): ExpoConfig => {
  return {
    ...config,
    extra: {
      clerkPublicKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || '',
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
      cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || '',
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
    } as MyExtraConfig,
  };
};
