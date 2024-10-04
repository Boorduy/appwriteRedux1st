import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
const store = configureStore({ 
//get onto the store and import reducers into the store and that it's aware of them
//note again reducer is an object {} we added auth: authSlice from authSlice.js but remember
//u can have more lige blog: blogSlice then after u also export default store go to main.js and add
//router

    reducer: {
        auth:authSlice,

    }
 })

//now what goes inside const store = configureStore({ }) a method that takes object as parameter.
//it takes slices or say reducers. we wont make them here we make them in authSlice.js

export default store
//then export store to use it.