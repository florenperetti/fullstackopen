import React, { useState } from 'react'

const Blog = ({ blog, handleLikeBlog, handleRemoveClick, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleBlogClick = () => setVisible(!visible)

  const handleLikeClick = e => {
    e.preventDefault()
    e.stopPropagation()
    handleLikeBlog(blog)
  }

  const handleRemoveClickLocal = e => {
    e.preventDefault()
    e.stopPropagation()
    handleRemoveClick(blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="basic-info" style={hideWhenVisible} onClick={handleBlogClick}>
        {blog.title} {blog.author}
      </div>
      <div className="info" style={showWhenVisible} onClick={handleBlogClick}>
        {blog.title} {blog.author}<br/>
        <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes <button onClick={handleLikeClick}>like</button><br/>
        {blog.user && `added by ${blog.user.name}`}
        { (blog.user && user.name === blog.user.name) && <div><button onClick={handleRemoveClickLocal}>remove</button></div>}
      </div>
    </div>
  )
}

export default Blog