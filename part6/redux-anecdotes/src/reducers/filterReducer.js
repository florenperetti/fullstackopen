const initialState = ""

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      state = action.data
      return state
    case 'CLEAR_FILTER':
      state = ""
      return state
    default:
      return state
  }
}

export default reducer

export const clearFilter = () => {
  return {
    type: "CLEAR_FILTER"
  }
}
export const setFilter = (data) => {
  return {
    type: "SET_FILTER",
    data
  }
}