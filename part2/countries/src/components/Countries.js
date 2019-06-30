import React from 'react'

const Countries = ({results, handleShow}) => {
    const countries = () => results.map(country => (
            <p key={country.alpha3Code}>
                {country.name} <button onClick={() => handleShow(country)}>show</button>
            </p>
        )
    )
    return <div>{countries()}</div>
}

export default Countries