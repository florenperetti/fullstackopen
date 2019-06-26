import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Anecdote = ({index}) => <p>{anecdotes[index]}</p>

const Votes = ({index, array}) => <p>has {array[index]} votes</p>

const App = ({anecdotes}) => {
    const zeroFilledArray = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0);
    
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(zeroFilledArray)
    const [mostVoted, setMostVoted] = useState(0)
    
    const selectRandomIndexFromArray = array => setSelected(Math.floor(Math.random() * array.length))
    const voteForSelected = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
        if (newVotes[selected] > votes[mostVoted]) {
            setMostVoted(selected)
        }
    }

    return (
        <div>
            <Title text={'Anecdote of the day'}/>
            <Anecdote index={selected}/>
            <Votes index={selected} array={votes}/>
            <Button text='vote' handleClick={voteForSelected}/>
            <Button text='next anecdote' handleClick={() => selectRandomIndexFromArray(anecdotes)}/>
            <Title text={'Anecdote with most votes'}/>
            <Anecdote index={mostVoted}/>
            <Votes index={mostVoted} array={votes}/>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)