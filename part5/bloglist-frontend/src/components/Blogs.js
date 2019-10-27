import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, handleLikeBlog, handleRemoveClick, user }) => {
  const blogsList = () => blogs.map(blog => (
    <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} handleRemoveClick={handleRemoveClick} user={user}></Blog>
  ))
  return blogsList()
}

export default Blogs