import React from 'react'

const Notification = ({ message, successful }) => {
    if (message === null) {
         return null
    }

    const className = 'message ' + (successful ? '' : 'red')
  
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification