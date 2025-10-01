// In this file we have written functions to create , modify database for posts and files.

import conf from "../conf/conf";
import { Client, ID , Databases , Storage , Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases= new Databases(this.client)
            this.bucket= new Storage(this.client)

    }

    async createPost({title , slug , content , featuredImage ,status , userId}){
        try {
            return await this.databases.createDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title , 
                    content, 
                    featuredImage,
                    status,
                    userId,
                }

            )
        } catch (error) {
            console.log("Appwrite: Error creating post in database : " , error);
        }
            
    }

    async updatePost(slug , {  title , content , featuredImage ,status , userId}){
        try {
            
            return await this.databases.updateDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title , 
                    content, 
                    featuredImage,
                    status,
                }

            )
        } catch (error) {
            console.log("Appwrite: Error updating post in database : " , error);
            
            
        }
    }

    async deletePost(slug){
        try {
            
            return await this.databases.deleteDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite: Error deleting post in database : " , error);
            return false;
            
            
        }
    }

    async getPost(slug){
        try {
            
            return await this.databases.getDocument(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
           
        } catch (error) {
            console.log("Appwrite: Error getting post from database : " , error);
            return false;
            
            
        }
    }

    async getPosts(queries = [Query.equal("status" , "active")]){ // we want to take all posts with status set to active
        try {
            
            return await this.databases.listDocuments(
                conf.appwritedatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
           
        } catch (error) {
            console.log("Appwrite: Error getting post from database : " , error);
            return false;
            
        }

    }

    // File upload methods/services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )

        } catch (error) {
            console.log("Appwrite: Error uploading file to database: ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;

        } catch (error) {
            console.log("Appwrite: Error deleting file to database: ", error);
            return false;
        }
    }

    getFilePreview(fileId){
        this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )
    }

};

const service = new Service();
export default service;