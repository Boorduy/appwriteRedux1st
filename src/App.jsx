import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <main>
          <Outlet/>
        </main>
      </div>
    </>
    //we use outlet from react-router-dom to have all components running to get a test
    //then we check our routes using slash /login /signup 
    //when we http://localhost:5173/edit-post/login we are automatically redirected to login site
    //because we dont have permission nor logged in
  )
}

export default App
