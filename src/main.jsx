import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
//provider from react-redux not react
import store from './store/store.js'
//import Home page from pages as children of browser Router array we made
//also idk why i had to use 2 dots it would find pages.
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import AllPosts from '../pages/AllPosts.jsx'
import AddPost from '../pages/AddPost.jsx'
import EditPosts from '../pages/EditPosts.jsx'
import Post from '../pages/Post.jsx'
//we want to create a mechanism to not load Login directly
import Protected from './components/AuthLayout.jsx'

const browserRouter = createBrowserRouter([
  //we can simply provide objects in the array which we indicate paths and what element of each page is
  //and what will be shown.
  
  {
    path: "/",
    element: <App />,
  //now what we do is do we have sub paths after this example /signup /posts etc. yes we do have so
  //they go in children category and no its not an object in object. its an array instead of children={}
  //its this array
    children: [
      {
        path: "/",
        element: <Home />
      //now we have to make a sure where we can have a track on how things should be accessed
      //are they logged in and up to where can they checkout the page. example if ur logged in
      //you shouldnt be able to access login page.
      },
      {
        path: "/login",
        //first thing u might think the best aproach is this element: <Login /> but we need different
        //aproach
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        //now whats good about this is that we can provide a prop that says authentication isn't
        //required to login.
        )
        //there's nothing wrong with this aproach but instead of rendering it comepletely we bring
        //another component. now that we have our protected component we do this
      },
      {
        path: "/signup",
        element: 
        <Protected authentication={false}>
          <Signup />
        </Protected>
      },
      {
        path: "/all-posts",
        element: 
        //for this one we want only person who is logged in can see all the posts.
        // u dont need to write authentication={true} because by default it is true
        <Protected authentication>
          <AllPosts />
        </Protected>
        //now that this one is the only one true and that signup and login are both false
        //we are gonna work on the functionality part where how they can turn their authentication to
        //true
      },
      {
        path: "/add-posts",
        element: 
        <Protected authentication>
          <AddPost />
        </Protected>
      },
      {
        path: "/edit-post/:slug",
        //edit post can't just be edit-post we have to pass a slug to go directly on that post
        element: 
        <Protected authentication>
          <EditPosts />
        </Protected>
      },
      {
        path: "/post/:slug",
        element: 
        <Protected authentication>
          <Post />
        </Protected>
      },
      
    ]
  }

])

//browserRouter is new for me lets see. a method that takes an array. it'll take care of the pages
//we havent worked on it yet but we will.
//we remove <App/> from bottom and we will set put it in browserRouter.     <RouterProvider router={browserRouter}/>

//we should have access to store and pages. so how can we make our components know we have a store

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={browserRouter}/>
    </Provider>
  </React.StrictMode>,
)
//after adding provider we can set store of Provider for it<Provider store={store}>
//every page is now being controlled by Provider and Provider has a store that is the main house
//then we have RouterProvider which for the router we used createBrowserRouter([]) which will take
//arrays of different paths of different pages which we will set right now.

