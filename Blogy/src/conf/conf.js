const conf = {

    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceapi: String(import.meta.env.VITE_TINY_MCE_API),
}

export default conf


// This is a configuration file . This ensures that we get all the env variables values in string format
// this is a production grade practice to stop unexpected app crashes

// In React, a **config file** is used to store app-wide settings (like API URLs, keys, constants) in one place.
// It helps with **maintainability, environment management, and scalability** by avoiding hardcoding values in multiple components.
