import React from 'react'
import { connect } from 'react-redux'
import {
  voteAnecdote
} from '../reducers/anecdoteReducer'
import {
  addNotification,
  clearNotification
} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id) => {
    props.voteAnecdote(id)
    props.addNotification("you just voted")
    setTimeout(() => {
      props.clearNotification()
    }, 5000)
  }

  return (
    props.visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const lowercaseFilter = filter.toLowerCase()
  return filter ? anecdotes.filter(a => a.content.toLowerCase().indexOf(lowercaseFilter) >= 0) : anecdotes
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addNotification,
  clearNotification,
  voteAnecdote,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)