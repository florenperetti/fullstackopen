import React from 'react'
import { Button } from 'semantic-ui-react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blog">
    <div>
      <span className="title">{blog.title}</span> <span className="author">{blog.author}</span>
    </div>
    <div>
      blog has <span className="likes-amount">{blog.likes}</span> likes
      <Button className="like-button" onClick={onClick}>like</Button>
    </div>
  </div>
)

export default SimpleBlog