import blogsService from './../services/blogs'

const initialState = {
  username: '',
  name: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    state.username = action.data.username
    state.name = action.data.name
    return { ...state, username: action.data.username, name: action.data.name }
  default:
    return state
  }
}

export default reducer


export const setUserFromStore = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: { username: user.username, name: user.name }
      })
    }
  }
}

export const loginUser = ({ username, name }) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: { username, name }
    })
  }
}

export const logoutUser = () => {
  return {
    type: 'SET_USER',
    data: { username: '', name: '' }
  }
}