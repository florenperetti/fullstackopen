import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Some Author',
      likes: 5
    }
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders basic content', () => {
    const basicInfoDiv = component.container.querySelector('.basic-info')
    expect(basicInfoDiv).not.toHaveStyle('display: none')

    const infoDiv = component.container.querySelector('.info')
    expect(infoDiv).toHaveStyle('display: none')
  })

  test('renders all content after click', () => {
    const basicInfoDiv = component.container.querySelector('.basic-info')
    fireEvent.click(basicInfoDiv)

    const infoDiv = component.container.querySelector('.info')
    expect(infoDiv).not.toHaveStyle('display: none')
  })
})