import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Navigate, useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {
  //we call it protected so that whatever component we wrap around it means its authenticated.
  //it'll act as wrapper accepting childrens and render them.
  //authentication boolean value
  const authStatus = useSelector((state) => state.auth.status)
  //gives true or false value what is auth status is it true or false. boolean value
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (authentication && authStatus !== authentication) {

      //if authentication is require and authStatus is not equal to authentication
      //important: if we are required to visit a page that authentication is required to true
      //but authStatus is not true. it means u are supposed to be logged in to see a specific route(page)
      //but ur status says ur not logged in so u have to be redirected to login page.
      navigate("/login")
    } else if(!authentication && authStatus !== authentication) {
      //and not just a normal else if. we are checking if authentication is not required. this means
      //u are not needed to be logged in to see these pages like login page or sign up page but u are
      //signed in anyway. u are not supposed to see those pages so simply u get logged into the home
      //page
      navigate("/")
    }
    setLoader(false)
    //once everything is done wesetLoader to false to check before loading components
  }, [authStatus, authentication, navigate]

  //these are our dependency arrays now how do we work with it. login page or / page
  )
    
    //as soon as this component loads we have to make some queries to run authStatus and figure out
    //how everything is going on and what to render. this is a simple <>{children}</> component.

//we can verify if ur logged in by making a query to the store.
//  

//the component doesnt know which one to render which one to not render. and in order to fix it we get another
//parameter called authentication which by default is true. indicating whether to render the page or not.
//these parameters help us to decide what components should be rendered or not as a form of security.

  return loader ? null : <>{children}</>

//first check loader if true show null(not a good practice u can create a empty page)
//if loader is false ( : which means if its not true else show this ) then show {children} in a tag
}

export default Protected

//this is just practice to learn

//if (authentication)
  //if authentication is true
//{
//  if (authStatus !== authentication){
//    //it means authentication is required but u are not logged in
//    Navigate('/login')
//  }
//  
//}