import React, { useEffect } from 'react'
import Blogs from './Blogs'
import BlogForm from './BlogForm'
import Logout from './Logout'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Togglable from './Togglable'

import { useField } from '../hooks'

import blogsService from './../services/blogs'
import loginService from './../services/login'

import { initializeBlogs, createBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser, setUserFromStore } from '../reducers/userReducer'
import { connect } from 'react-redux'

const LogedUserView = ({ inputs, handleLogout, onSubmit, formRef, handleRemoveClick, user }) => {
  return (
    <div className="content">
      <Togglable buttonLabel="new blog" ref={formRef}>
        <BlogForm onSubmit={onSubmit} inputs={inputs}></BlogForm>
      </Togglable>
      <h2 className="blogs">Blogs</h2>
      <Blogs handleRemoveClick={handleRemoveClick}></Blogs>
      <Logout onClick={handleLogout}></Logout>
    </div>
  )
}

function App (props) {
  const username = useField('text')
  const password = useField('password')

  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')

  const blogFormRef = React.createRef()

  useEffect(() => {
    props.setUserFromStore()
    props.user.name && props.initializeBlogs()
  }, [])

  const showMessage = (message, successful = true) => {
    props.setNotification({ message, successful }, 4)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({
        username: username.fieldAttrs.value, password: password.fieldAttrs.value,
      })
      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(loggedUser)
      )
      blogsService.setToken(loggedUser.token)
      props.loginUser(loggedUser)
    } catch (exception) {
      showMessage('Wrong username or password', false)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    blogsService.setToken('')
    props.logoutUser()
  }

  const inputs = [
    {
      label: 'title',
      ...newTitle.fieldAttrs,
    },
    {
      label: 'author',
      ...newAuthor.fieldAttrs,
    },
    {
      label: 'url',
      ...newAuthor.newUrl,
    }
  ]

  const handleRemoveClick = async blog => {
    const result = window.confirm(`remove ${blog.title}?`)
    if (!result) {
      return
    }
    try {
      props.removeBlog(blog.id)
      showMessage(`blog ${blog.title} was removed`)
    } catch (error) {
      showMessage(error.response.data.error || `Information of ${newTitle} has already been removed from server`, false)
    }
  }

  const handleNewBlogSubmit = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const newBlog = {
      title: newTitle.fieldAttrs.value,
      author: newAuthor.fieldAttrs.value,
      url: newUrl.fieldAttrs.value
    }

    try {
      props.createBlog(newBlog, props.user)
      showMessage(`A new blog ${newBlog.title} added`)
    } catch (error) {
      showMessage(error.response.data.error || `Information of ${newTitle} has already been removed from server`, false)
    }

    newTitle.reset()
    newAuthor.reset()
    newUrl.reset()
  }

  return (
    <div>
      {props.user.name }
      <Notification/>
      {
        !props.user.name
          ? <LoginForm handleLogin={handleLogin} username={username} password={password} />
          : <LogedUserView
            handleRemoveClick={handleRemoveClick}
            handleLogout={handleLogout}
            inputs={inputs}
            onSubmit={handleNewBlogSubmit}
            formRef={blogFormRef}
          >
          </LogedUserView>
      }
    </div>
  )
}

const mapStateToProps = ({ userStore }) => {
  return {
    user: userStore
  }
}

export default connect(mapStateToProps, { initializeBlogs, createBlog, removeBlog, setNotification, loginUser, logoutUser, setUserFromStore })(App)