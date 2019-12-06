import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = (props) => {
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

export default App