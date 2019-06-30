import React from 'react'

import Weather from './Weather'

const Country = ({country, weather}) => {
    if (!country) {
        return null
    }
    const languages = () => country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)
    
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {languages()}
            </ul>
            <img width='150' src={country.flag} alt={country.name} />
            <Weather data={weather}/>
        </div>
    )
}

export default Country