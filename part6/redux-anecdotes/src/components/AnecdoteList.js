import React from 'react'
import { connect } from 'react-redux'
import {
  voteAnecdote
} from '../reducers/anecdoteReducer'
import {
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you just voted ${anecdote.content}`, 3)
  }

  return (
    props.visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
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
  setNotification,
  voteAnecdote,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)