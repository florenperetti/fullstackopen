import React from 'react'
import { connect } from 'react-redux'
import {
  createAnecdote
} from '../reducers/anecdoteReducer'
import {
  addNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = event => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    event.target.anecdote.value = ''
    props.addNotification("you just added an anecdote")
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }
  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote, 
  addNotification,
  clearNotification
}

export default connect(
  null, mapDispatchToProps
)(AnecdoteForm)