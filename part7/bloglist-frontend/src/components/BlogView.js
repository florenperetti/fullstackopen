import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import {
  Redirect
} from 'react-router-dom'

const BlogView = ({ blog, likeBlog, user, handleRemoveClick }) => {
  if (blog === undefined) {
    return <Redirect to="/" />
  }

  const handleLikeClick = e => {
    e.preventDefault()
    e.stopPropagation()
    likeBlog(blog)
  }

  const handleRemoveClickLocal = e => {
    e.preventDefault()
    e.stopPropagation()
    handleRemoveClick(blog)
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <button onClick={handleLikeClick}>like</button><br />
      {blog.user && `added by ${blog.user.name}`}
      {(blog.user && user.name === blog.user.name) && <div><button onClick={handleRemoveClickLocal}>remove</button></div>}
    </div>
  )
}

export default connect(null, {
  likeBlog,
})(BlogView)