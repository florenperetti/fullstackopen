const initialState = ""

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      state = action.data
      return state
    case 'CLEAR_NOTIFICATION':
      state = ""
      return state
    default:
      return state
  }
}

export default reducer

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION"
  }
}
export const addNotification = (message) => {
  return {
    type: "SHOW_NOTIFICATION",
    data: message
  }
}