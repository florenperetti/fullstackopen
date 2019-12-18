const initialState = {
  message: '',
  successful: true,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    state = {
      message: action.data.message,
      successful: !!action.data.successful
    }
    return state
  case 'CLEAR_NOTIFICATION':
    state = ''
    return state
  default:
    return state
  }
}

export default reducer

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}
export const addNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: notification
  }
}

export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}