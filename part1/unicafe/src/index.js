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

const Statistic = ({text, value, suffix}) => <tr><td>{text}:</td><td>{value || 0}{suffix}</td></tr>

const Statistics = ({good, neutral, bad}) => {
    if (!(good || neutral || bad)) {
        return <div>No feedback given</div>
    }
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = good * 100 / all
    return (
        <table>
            <tbody>
                <Statistic text={'good'} value={good}/>
                <Statistic text={'neutral'} value={neutral}/>
                <Statistic text={'bad'} value={bad}/>
                <Statistic text={'all'} value={all}/>
                <Statistic text={'average'} value={average} suffix={' %'}/>
                <Statistic text={'positive'} value={positive} suffix={' %'}/>
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Title text={'give feedback'}/>
            <Button text={'good'} handleClick={() => setGood(good + 1)} />
            <Button text={'neutral'} handleClick={() => setNeutral(neutral + 1)} />
            <Button text={'bad'} handleClick={() => setBad(bad+ 1)} />
            <Title text={'statistics'}/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)