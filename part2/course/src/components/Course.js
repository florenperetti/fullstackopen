import React from 'react'

const Header = ({title}) => <h1>{title}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({value}) => <p><strong>total of {value} exercises</strong></p>

const Content = (props) => {
    const parts = () => props.parts.map(part => <Part key={part.id} part={part}/>)
    
    const totalExcercises = props.parts.reduce((acc, curr) => acc + curr.exercises, 0)

    return (
        <div>
            {parts()}
            <Total value={totalExcercises}/>
        </div>
    )
}

const Course = (props) => {
    const courses = () => props.courses.map(course => {
        return (
            <div key={course.id}>
                <Header title={course.name}/>
                <Content parts={course.parts}/>
            </div>
        )
    })

    return <div>{courses()}</div>
}

export default Course