import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js' //we
import authService from '../../auth/auth.js'
// are having logout functionality alone is to we can make request
//to the slice. state.status turns to false state.userData turns null


function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logOut().then(() =>{
      dispatch(logout());
          //once we have logout use promise(.then) to dispatch logout from authslice so info gets emptied
    //and status turns false.
    })

  }
  return (
    <button className='inline-block py-2 px-6 duration-200 hover:bg-blue-200 rounded-full' 
    onClick={logoutHandler}>Logout</button>
  )//dont write it as logoutHandler() because we just want to pass reference.
}

export default LogoutBtn