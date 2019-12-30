import React from 'react'
import { Button, Form, Container, Segment, Input, Header } from 'semantic-ui-react'

const LoginForm = ({ handleLogin, username, password }) => {

  const submitHandler = (event) => {
    handleLogin(event)
    username.reset()
    password.reset()
  }

  return (
    <Container className="login">
      <Segment>
        <Header as="h1">Login to the application</Header>
        <Form onSubmit={submitHandler}>
          <Form.Field>
            <label>Username</label>
            <Input
              {...username.fieldAttrs}
              name="Username"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              {...password.fieldAttrs}
              name="Password"
            />
          </Form.Field>
          <Button primary type="submit">Login</Button>
        </Form>
      </Segment>
    </Container>
  )
}

export default LoginForm