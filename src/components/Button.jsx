import React from 'react'

function Button( {
    children,
    type = 'button',
    bgColor = 'blue-blue-600',
    textColor = 'white',
    className= '',
    ...props
}) {
  return (
    <Button
    className= {`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}> 
    {children}</Button>
    //we have default button and one that we can edit instead of '
    //we used {``} and {...props } if we want to pass more
)
}

export default Button