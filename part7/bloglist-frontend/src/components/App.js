import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Blogs from './Blogs'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Togglable from './Togglable'
import Users from './Users'
import User from './User'
import BlogView from './BlogView'
import Navigation from './Navigation'

import { useField } from '../hooks'

import blogsService from './../services/blogs'
import loginService from './../services/login'

import { initializeBlogs, createBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser, logoutUser, setUserFromStore } from '../reducers/userReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'

const LogedUserView = ({ inputs, handleLogout, onSubmit, formRef, handleRemoveClick, user, users, blogs }) => {
  const userById = (id) =>
    users.find(user => user.id === id)
  const blogById = (id) =>
    blogs.find(blog => blog.id === id)
  return (
    <div className="content">
      <Router>
        <Navigation handleLogout={handleLogout}></Navigation>
        <div>
          <Route exact path="/users" render={() => <Users users={users} />} />
          <Route exact path="/users/:id" render={({ match }) =>
            <User user={userById(match.params.id)} />
          } />
          <Route exact path="/blogs/:id" render={({ match }) =>
            <BlogView user={user} blog={blogById(match.params.id)} handleRemoveClick={handleRemoveClick} />
          } />
          <Route exact path="/" render={() => (
            <div>
              <h2 className="blogs">Blogs</h2>
              <Togglable buttonLabel="new blog" ref={formRef}>
                <BlogForm onSubmit={onSubmit} inputs={inputs}></BlogForm>
              </Togglable>
              <Blogs></Blogs>
            </div>
          ) } />
        </div>
      </Router>
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
    if (props.user.name) {
      props.initializeBlogs()
      props.initializeUsers()
    }
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
            user={props.user}
            users={props.users}
            blogs={props.blogs}
          >
          </LogedUserView>
      }
    </div>
  )
}

const mapStateToProps = ({ userStore, users, blogs }) => {
  return {
    user: userStore,
    users,
    blogs
  }
}

export default connect(mapStateToProps, { initializeBlogs, initializeUsers, createBlog, removeBlog, setNotification, loginUser, logoutUser, setUserFromStore })(App)