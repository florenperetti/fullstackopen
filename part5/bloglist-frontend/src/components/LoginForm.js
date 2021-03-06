import React from 'react'

const LoginForm = ({ handleLogin, username, password }) => {

  const submitHandler = (event) => {
    handleLogin(event)
    username.reset()
    password.reset()
  }

  return (
    <div className="login">
      <h2>Login to the application</h2>
      <form onSubmit={submitHandler}>
        <div>username
          <input
            {...username.fieldAttrs}
            name="Username"
          />
        </div>
        <div>password
          <input
            {...password.fieldAttrs}
            name="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm