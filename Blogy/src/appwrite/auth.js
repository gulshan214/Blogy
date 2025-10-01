// Authentication using appwrite

import conf from "../conf/conf";
import { Client, Account , ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){ // Connects your app to the correct Appwrite API endpoint + project
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.account = new Account (this.client);
    }

    async createAccount({email, passsword ,name}){
        try {

            const userAccount = await this.account.create(ID.unique() , email , password , name);
            if (userAccount) {
                // call another method which will log in user if the account is succesfully created
                return this.login({email , password});
                
            } else {
                return userAccount;
            }
            
        } catch (error) {
            console.log("Appwrite: Error in creating account: " , error);
            
        }
    }

    async login({email , password}){
        try {
            return await this.account.createEmailPasswordSession(email , password);
            
        } catch (error) {
            console.log("Appwrite: Error in login: " , error);
        }
    }

    // function to check if user is logged in or not

    async getCurrentUser(){
        
        try {

            return await this.account.get()
            
        } catch (error) {
            console.log("Appwrite: Error in checking user status: " , error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite: Error logging out: " , error);
        }
    }
}

const authService = new AuthService();
export default authService