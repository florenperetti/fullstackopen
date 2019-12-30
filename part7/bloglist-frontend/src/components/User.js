import React from 'react'


const User = ({user}) => {
  if (user === undefined) {
    return null
  }
  const blogs = () => user.blogs.map(blog => <li key={blog.id}>{blog.title} by {blog.author}</li>)

  return (
    <div>
      <h2>{user.name}</h2>

      <h3>added blogs</h3>
      <ul>
        {blogs()}
      </ul>
    </div>
  )
}


export default User