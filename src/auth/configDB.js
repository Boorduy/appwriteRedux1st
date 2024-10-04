import conf from "../conf/conf";


import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client()
    databases;
    bucket; //folders in the appwrite folders are called bucket. same logic used in aws etc.
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async getPost(slug) {
        //documentid = slug
        //apparently slug is what is passed onto title and used as id
        //since the id that we are using to create documents are unique slug is used to identify them
        //and load them for us that simple.
        try {
            //we prefix it with await cause this process takes a little time.
            return await this.databases.getDocument(conf.appwriteDatabaseID, conf.appwriteCollectionID, slug)
            //whoever is using this method passes us the documentid which is slug
        } catch (error) {
            console.log("appwrite service :: getPost() ::", error)
        }
    }

    async getPosts(queries = [Query.equal("status", true)]) {
        try {
            //database operation needs to be await
            return await this.databases.listDocuments(conf.appwriteDatabaseID, conf.appwriteCollectionID, queries)
            //important note is that hitash placed query directly in the square bracket above else we
            //have to list it like thisdatabases.listDocuments('<DATABASE_ID>','[COLLECTION_ID]',[       Query.equal('title', ['Avatar', 'Lord of the Rings']),        Query.greaterThan('year', 1999)]);
        } catch (error) {
            console.log('Appwrite Service :: getPosts() ::', error);
            return false
        }
    }

    async createPost({title, slug, content, featuredImage, status, userID }) {
        //slug is title but with dashes that pop up on url.
        try {
            //idk why but for now instead of ID.unique() we used slug
            return await this.databases.createDocument(conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title, content, featuredImage, status, userID
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost() ::", error)
            return false
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}) {
        //these are the fields we are allowing to change
        try {
        return await this.databases.updateDocument( conf.appwriteDatabaseID,
            conf.appwriteCollectionID,
            slug,
            { title, content, featuredImage, status }
            //we wont pass userID because we are not allowing the change of that.
        )            
        } catch (error) {
            console.log("Appwrite service :: updatePost() ::", error)
            return false
        }
    }
    async deletePost(slug) {
        //for delete as i wrote only slug what is true is whats inside it doesnt matter because we
        //want to delete the document itself so things inside it doesnt matter.

        try {
            //we dont have return on this operation if u think about it its something that happens
            //back in the kitchen so what we do at end we return true instead of return await the process.
        
            //its because when u check applications settings in their response u can see deleteDocument
            //method has no response back but a code. but when we use updateDocument it returns us the 
            //document again after the response code so thats why we say return await.

            await this.databases.deleteDocument( conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost() ::", error)
            return false
        }
    }
    //now we go onto storage from below this comment. appwrite storage service.

    async createFile(file) {
        try {
            //we dont have file id but we create it using id and bucket id is made in conf.js
            return await this.bucket.createFile(conf.appwriteBucketID,
                ID.unique(), file
                //can use nanoid aswell but we use appwrite cause whynot
                //appwrite will take care of it and public path will be given to us
            )
        } catch (error) {
            console.log("Appwrite service :: createFile() ::", error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            
            await this.bucket.deleteFile(conf.appwriteBucketID,
                fileId
               //unlike create file we dont need the file or to create unique id we need the fileId
               //of file we want to be deleted.
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile() ::", error)
            return false
        }
    }
    //we have this feature in appwrite which allows us to get a small preview of an image of product,
    //blog picture whatever it might be 8 mb but preview uses few kb to show us the picture.
    //so we dont async it.
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketID,
            fileId
        ).href
        //this whole thing has to be worked a lil different so we use .href to get hostname.
        //if doesnt work we make it async.
    }
}

//run npm install @reduxjs/toolkit
// run npm install react-redux       

const service = new Service()

export default service;