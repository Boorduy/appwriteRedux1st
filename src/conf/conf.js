const conf = {
    appwriteUrl: String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectID: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseID: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),
    appwriteCollectionID: String(process.env.REACT_APP_APPWRITE_COLLECTION_ID),
    appwriteBucketID: String(process.env.REACT_APP_APPWRITE_BUCKET_ID)
}
//this simple export helps save so much of time and trouble.

// if we face a problem its all in here and in major projects and big
//companies this is a common practice

export default conf