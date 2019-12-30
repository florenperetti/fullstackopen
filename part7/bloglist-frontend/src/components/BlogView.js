import React from 'react'
import Comments from './Comments'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import {
  Redirect
} from 'react-router-dom'
import { Button, Segment, Icon } from 'semantic-ui-react'

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
    <Segment>
      <h2>{blog.title} by {blog.author}</h2>
      <a target="_blank" rel="noopener noreferrer" href={blog.url}>{blog.url}</a><br />
      {blog.likes} likes <Button size='mini' primary icon onClick={handleLikeClick} circular><Icon name="thumbs up"></Icon></Button><br />
      {blog.user && `added by ${blog.user.name}`}
      {(blog.user && user.name === blog.user.name) && <div><Button size='mini' negative icon onClick={handleRemoveClickLocal}><Icon name='trash' /></Button></div>}
      <Comments blogId={blog.id} comments={blog.comments}></Comments>
    </Segment>
  )
}

export default connect(null, {
  likeBlog,
})(BlogView)