import React, { useState, useEffect } from 'react'
import Blogs from './Blogs'
import BlogForm from './BlogForm'
import Logout from './Logout'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Togglable from './Togglable'

import { useField } from '../hooks'

import blogsService from './../services/blogs'
import loginService from './../services/login'

const LogedUserView = ({ blogs, inputs, handleLogout, onSubmit, formRef, handleLikeBlog, handleRemoveClick, user }) => {
  return (
    <div className="content">
      <Togglable buttonLabel="new blog" ref={formRef}>
        <BlogForm onSubmit={onSubmit} inputs={inputs}></BlogForm>
      </Togglable>
      <h2 className="blogs">Blogs</h2>
      <Blogs blogs={blogs} handleLikeBlog={handleLikeBlog} handleRemoveClick={handleRemoveClick} user={user}></Blogs>
      <Logout onClick={handleLogout}></Logout>
    </div>
  )
}

function App() {
  const [blogs, setBlogs] = useState([])

  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)

  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

  const [message, setMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)

  const blogFormRef = React.createRef()

  const setSortedBlogs = blogs => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {
    blogsService.getAll()
      .then(response => {
        setSortedBlogs(response)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const showMessage = (text, successful = true) => {
    setMessage(text)
    setSuccessfulMessage(successful)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )

      blogsService.setToken(user.token)

      setUser(user)
    } catch (exception) {
      showMessage('Wrong username or password', false)
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogsAppUser')
  }

  const inputs = [
    {
      label: 'title',
      value: newTitle,
      onChange: handleTitleChange
    },
    {
      label: 'author',
      value: newAuthor,
      onChange: handleAuthorChange
    },
    {
      label: 'url',
      value: newUrl,
      onChange: handleUrlChange
    }
  ]

  const handleLikeBlog = async blog => {
    const likes = blog.likes + 1
    const updatedBlog = {
      ...blog,
      likes,
    }
    await blogsService.update(blog.id, updatedBlog)
    setSortedBlogs(blogs.map(b => b.id === blog.id ? { ...b, likes } : b))
  }

  const handleRemoveClick = async blog => {
    const result = window.confirm(`remove ${blog.title}?`)
    if (!result) {
      return
    }
    await blogsService.remove(blog.id)
    showMessage(`blog ${blog.title} was removed`)
    setBlogs(blogs.filter(b => b.id !== blog.id))
  }

  const handleNewBlogSubmit = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogsService
      .create(newBlog)
      .then(response => {
        setSortedBlogs(blogs.concat(response))
        showMessage(`A new blog ${newBlog.title} added`)
      }).catch(error => {
        showMessage(error.response.data.error || `Information of ${newTitle} has already been removed from server`, false)
      })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <Notification message={message} successful={successfulMessage}/>
      {
        user === null
          ? <LoginForm handleLogin={handleLogin}/>
          : <LogedUserView
            handleRemoveClick={handleRemoveClick}
            handleLikeBlog={handleLikeBlog}
            blogs={blogs}
            handleLogout={handleLogout}
            inputs={inputs}
            onSubmit={handleNewBlogSubmit}
            formRef={blogFormRef}
            user={user}>
          </LogedUserView>
      }
    </div>
  )
}

export default App
