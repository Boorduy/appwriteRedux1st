import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../auth/configDB.js'
//we can use any name we like to import the whole thing then use . to get to the method we created.
function PostCard({
    $id, title, featuredImage
    //mongoDB gets -id appwrite takes dollarid
}) {
  return (
    <link to={`/posts/${$id}`}>
    <div className='w-full bg-gray-300 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl '/>
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
    </div>
    </link>
  )
}

export default PostCard