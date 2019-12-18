import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const Blogs = (props) => {
  const handleLikeBlog = (blog) => {
    props.likeBlog(blog)
  }

  const { handleRemoveClick, user } = props
  const blogsList = () => props.blogs.map(blog => (
    <Blog key={blog.id} blog={blog} handleLikeBlog={handleLikeBlog} handleRemoveClick={handleRemoveClick} user={user}></Blog>
  ))
  return blogsList()
}

const mapStateToProps = ({ blogs }) => {
  return {
    blogs
  }
}

export default connect(mapStateToProps, {
  likeBlog
})(Blogs)