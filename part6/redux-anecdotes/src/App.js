import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  }, [props])

  return (
    <div>
      <Filter/>
      <Notification/>
      <h2>create new</h2>
      <AnecdoteForm/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)