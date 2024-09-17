//start with appwrite auth service

//note the website doesnt have setEndpoint of the url
//anymore if code didnt work check this place with
//.setEndpoint('https://cloud.appwrite.io/v1')

import conf from "../conf/conf.js";
import { Client, Account, ID, AppwriteException } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    //we want client to run as soon as we create this object
   constructor() {
    //as soon as this constructor is being called that means
    //as soon as someeone creates an object of this class we say
    //it uses the endpoint and then this account gets created.

    this.client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(conf.appwriteProjectID)
    this.account = new account(this.client)

    //imma try this endpoint here for now to see if it will work
    
    } 
    async createAccount({email, password, name, familyName}){
        try {
            //this creates an account so lets store in a variable
            const userAccount = await this.account.create(ID.unique(), email, password, name, familyName)
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }


    }
    async login({email, password}) {
        try {
            return account.createEmailPasswordSession(email, password);
        } catch(error) {
            throw error
        }
    }
    async getCurrentUser() {
        try {
         return await this.account.get()
         //.get() method grabs info from upstairs
        } catch(error) {
            console.log('Appwrite Service :: getCurentUser() :: ', error)
        }
        return null
    }
    async logOut() {
        try {
            //.deletesessions() logs out every device logged in for deletesession('current') its only
            //the current device
            const result = await account.deleteSession(
                'current' // sessionId
            );
        } catch (error) {
            console.log('cannot logout as of right now')
        }
    }
    //now we write logics for them check documents.

   //we're gonna create methods these are appwrite methods so we use async. 

}


//this class needs an object that so that this constructor is invoked at the time 
//of creation of the object AuthService

const authService = new AuthService()
//we make it a constant that create an object of the class we have created and we export that constant.

export default authService
//advantage of exporting this object is at any point of time the constructor is envoked. so endpoints
//are properly created and methods are easy to access because they're objects.
