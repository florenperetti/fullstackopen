import React from 'react'
import { connect } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { useField } from '../hooks'
import { Button, Form, Input, Divider } from 'semantic-ui-react'

const Comment = ({ comment }) => {
  return (
    <li>
      {comment.message}
    </li>
  )
}

const Comments = connect(null, {
  createComment,
})((props) => {
  let content = null
  if (props.comments.length > 0) {
    const commentsList = () => props.comments.map((comment, i) => <Comment key={i} comment={comment}></Comment>)
    content = (
      [
        <h3 key="title">Comments</h3>,
        <ul key="list">{commentsList()}</ul>
      ]
    )
  }

  const comment = useField('text')

  const submitHandler = e => {
    e.preventDefault()
    const message = comment.fieldAttrs.value
    if (!message.trim()) {
      return
    }
    comment.reset()
    props.createComment({
      blogId: props.blogId,
      message
    })
  }

  return (
    <div>
      <Divider></Divider>
      {content}
      <Form onSubmit={submitHandler}>
        <Form.Group><Form.Field><Input {...comment.fieldAttrs}></Input></Form.Field><Button primary type="submit">add comment</Button></Form.Group>
      </Form>
    </div>
  )
})

export default connect(null, {
  createComment,
})(Comments)