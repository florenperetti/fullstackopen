import React from 'react'
import { Button, Form, Segment, Input } from 'semantic-ui-react'

const FormInput = ({ label, value, onChange }) => (
  <Form.Field>
    <label>{label}:</label> <Input value={value} onChange={onChange} />
  </Form.Field>
)

const BlogForm = ({ onSubmit, inputs }) => {
  const formInputs = () => inputs.map(
    ({ label, value, onChange }) => <FormInput key={label} label={label} value={value} onChange={onChange} />
  )

  return (
    <Segment>
      <Form onSubmit={onSubmit}>
        {formInputs()}
        <Button primary type="submit">Add blog</Button>
      </Form>
    </Segment>
  )
}

export default BlogForm