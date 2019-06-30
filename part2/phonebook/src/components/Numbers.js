import React from 'react'

const Numbers = ({numbers, handleDelete}) => {
    const numberList = () => {
        return numbers.map(
            number => <p key={number.id}>{number.name} {number.number} <button onClick={() => handleDelete(number)}>delete</button></p>
        )
    }
    return numberList()
}

export default Numbers