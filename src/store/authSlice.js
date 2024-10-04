import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,

}
//then after initialState we create slice

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            //also to note something. once we createSlice this and call initialState inside the object.
            //we have access to it to customize it.
            state.status = true
            state.userData = action.payload.userData
            //grabs Data from User. using action.payload.userData
            //little explanation to add on top of it is that when we see user is login we change their status
            //to true and grab their userData to be uploaded where it goes back to store and gets saved. and 
            //then everyone has access to it from other components like a youtube video posted.
            
        //when login we give access to state and action. state is the current state of what store is detecting.
        //action is when they want to access reducers... they use action to reach and access payload and envoke
        //these actions.

        },
        logout: (state) => {
            //we can use action here again but once someone is logged out since we are using status to
            //indicate everything we dont require to use action.

            state.status = false
            state.userData = null
        },


        //inside reducers we create all the methods.
    }
})
//createSlice method that takes an object as parameter. it takes couple of parameters. 1st give name so
//we can refer back to it.


export default authSlice.reducer
//we export default reducer. and also we need to export the methods of reducers.

export const { login, logout } = authSlice.actions
//we export actions(reducers.).