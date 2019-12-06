
import anecdotesService from '../services/anecdotes'

const sortAnecdotes = (a, b) => a.votes > b.votes ? -1 : 1

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const temp = state.map(anecdote => anecdote.id === action.data.id ? {
        ...anecdote,
        votes: anecdote.votes + 1
      } : anecdote);
      state = temp.sort(sortAnecdotes)
      return state
    case 'NEW_ANECDOTE':
      state = state.concat(action.data)
      return state
    default:
      return state
  }
}

export default reducer

export const voteAnecdote = ({ content, votes, id }) => {
  return async dispatch => {
    const newContent = {
      content,
      votes: votes + 1
    }
    await anecdotesService.vote({ id, newContent })
    dispatch({
      type: "VOTE",
      data: { id }
    })
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    const sortedAnecdotes = anecdotes.sort(sortAnecdotes)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: sortedAnecdotes,
    })
  }
}