import React from 'react'
import { connect } from 'react-redux'
import {
  Link
} from 'react-router-dom'

import { Segment } from 'semantic-ui-react'

const Blog = ({ blog }) => {
  return (
    <Segment className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
    </Segment>
  )
}

const mapStateToProps = ({ userStore }) => {
  return {
    user: userStore
  }
}

export default connect(mapStateToProps)(Blog)