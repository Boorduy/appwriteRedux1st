import React from 'react'
import {Container} from '../container/Container.jsx'
import {logo} from '../Logo.jsx'
import { Link } from 'react-router-dom'
import LogoutBtn from './LogoutButton.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//And forcing to useNavigate
function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  //we use use useSelector to create query
  //this will fullfill the value of true and false.
  const navigate = useNavigate()
  //now we need to design a const of navigation items. once they're as arrays we can
  //loop through them and generate html from them. 
  const navItems = [
    {
      name: "home",
      slug: "/",
      active: true
    },
    {
     name: "Login",
     slug: "/login",
     active: !authStatus
     //!authStatus means the opposite of whats happening. if (authStatus) then u are logged in and its
     //true. if !authStatus then ur not logged in. and if u are logged in i dont want u to see this page. 
    },
    {
    name: "Signup",
    slug: "/signup",
    active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <link to={"/"}>
            <logo />
            </link>
          </div>
          <ul className='flex ml-auto'>
            {
            navItems.map((item)=> item.active ? (
            <li key={item.name}>
              <button onClick={() => navigate(item.slug)}
              className='inline-block px-6 py-2 duration-200 hover:bg-blue-300 rounded-full'>
                {item.name}
              </button>
            </li>) : null)
            }
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header