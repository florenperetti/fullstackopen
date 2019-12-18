import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blog">
    <div>
      <span className="title">{blog.title}</span> <span className="author">{blog.author}</span>
    </div>
    <div>
      blog has <span className="likes-amount">{blog.likes}</span> likes
      <button className="like-button" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog