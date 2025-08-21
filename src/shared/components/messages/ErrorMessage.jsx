import React from 'react'

const ErrorMessage = ({message = "Something went wrong"}) => {
  return (
    <div>
      {message}
    </div>
  )
}

export default ErrorMessage
