import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('<SimpleBlog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Some Author',
      likes: 5
    }
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  test('renders content', () => {
    const titleSpan = component.container.querySelector('.title')
    expect(titleSpan).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    const authorSpan = component.container.querySelector('.author')
    expect(authorSpan).toHaveTextContent(
      'Some Author'
    )
    const likesSpan = component.container.querySelector('.likes-amount')
    expect(likesSpan).toHaveTextContent(
      '5'
    )
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const button = component.container.querySelector('.like-button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
  
  test('clicking the like button twice calls event handler twice', async () => {
    const button = component.container.querySelector('.like-button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})