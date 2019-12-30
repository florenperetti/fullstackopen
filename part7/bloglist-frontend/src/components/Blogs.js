import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {
  const blogsList = () => props.blogs.map(blog => (
    <Blog key={blog.id} blog={blog}></Blog>
  ))
  return blogsList()
}

const mapStateToProps = ({ blogs }) => {
  return {
    blogs
  }
}

export default connect(mapStateToProps)(Blogs)