import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('../services/blogs')
import App from './App'

describe('<App />', () => {
  test('renders login form if there is no user loged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('login')
    )

    const userInStorage = localStorage.getItem('loggedBlogsAppUser')

    expect(userInStorage).toBeNull()

    const loginDiv = component.container.querySelector('.login')
    expect(loginDiv).toBeDefined()
  })

  test('renders blogs list form if there is user loged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))

    const userInStorage = localStorage.getItem('loggedBlogsAppUser')

    expect(userInStorage).toBeDefined()

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Blogs')
    )

    const title = component.container.querySelector('.blogs')
    expect(title).toBeDefined()

    const blogs = Array.from(component.container.querySelectorAll('.blog'))
    expect(blogs.length).toBeGreaterThan(0)
  })
})