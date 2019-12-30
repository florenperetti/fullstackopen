import React from 'react'

import { Segment, Header } from 'semantic-ui-react'

const User = ({ user }) => {
  if (user === undefined) {
    return null
  }
  const blogs = () => user.blogs.map(blog => <li key={blog.id}>{blog.title} by {blog.author}</li>)

  return (
    <Segment>
      <Header as="h2">{user.name}</Header>

      <Header as="h3">Blogs added</Header>
      <ul>
        {blogs()}
      </ul>
    </Segment>
  )
}


export default User