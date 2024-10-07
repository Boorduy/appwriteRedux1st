import React, { useId }  from 'react'

//we have to get input info to then give information to its parent which has state management
  //passing info to children is using prop but how we can pass it to parent is what we'll do
//  const Input = React.forwardRef( function input() {} )
  const Input = React.forwardRef( function Input({label,
     type = 'text',
     className= '',
      ...props},
    ref) {
        const id = useId
        return (
            <div className='w-full'>
                {label && (
                    <label htmlFor= {id}
                    className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
                )}
                <input
                className= {` px-3 py-2 rounded-lg bg-white text-black outline-none
                    focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                type= {type}
                ref={ref}
                {...props}
                id= {id}
                />

            </div> //if label is available then we display it {label(iflabelisavailable) &&(then)}
        )//need ref for referencing using any form
        //we use ${className to respect others coming in from bigger components(parent)}
        //we used these to send info to parent component
    })