
import blogsService from '../services/blogs'

const sortBlogs = (a, b) => b.likes - a.likes

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const temp = state.map(blog => blog.id === action.data.id ? {
      ...blog,
      likes: blog.likes + 1
    } : blog)
    state = temp.sort(sortBlogs)
    return state
  }
  case 'NEW_BLOG':
    state = state.concat(action.data)
    return state
  case 'REMOVE_BLOG':
    state = state.filter(({ id }) => action.data !== id)
    return state
  case 'NEW_BLOG_COMMENT':
    state = state.map(blog => blog.id === action.data.blogId ? {
      ...blog,
      comments: blog.comments.concat({ message: action.data.message })
    } : blog)
    return state
  default:
    return state
  }
}

export default reducer

export const createBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    newBlog.user = user
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likes = blog.likes + 1
    const newContent = {
      ...blog,
      likes,
    }
    await blogsService.update(blog.id, newContent)
    dispatch({
      type: 'LIKE',
      data: { id: blog.id }
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogsService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    const sortedBlogs = blogs.sort(sortBlogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: sortedBlogs,
    })
  }
}

export const createComment = data => {
  return async dispatch => {
    await blogsService.createComment(data)
    dispatch({
      type: 'NEW_BLOG_COMMENT',
      data
    })
  }
}