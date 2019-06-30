import React, { useState, useEffect } from 'react'
import axios from 'axios'

import APIXU_API_KEY from './../config'

import SearchResult from './SearchResult'

const App = () => {
    const [ search, setSearch ] = useState('')
    const [ count, setCount ] = useState(0)
    const [ countries, setCountries ] = useState([])
    const [ weather, setWeather ] = useState(null)

    const handleCountryShow = (country) => {
        setSearch(country.name)
    }

    useEffect(() => {
        if (!search) {
            return
        }
        axios.get(`https://restcountries.eu/rest/v2/name/${search}`).then(response => {
            setCount(response.data.length)
            
            if (response.data.length > 10) {
                setCountries([])
                return
            }
            if (response.data.length === 1) {
                const countryName = response.data[0].name.toLowerCase()
                axios.get(`http://api.apixu.com/v1/current.json?key=${APIXU_API_KEY}&q=${countryName}`).then(weatherResponse => {
                    setWeather(weatherResponse.data)
                })
            }
            setCountries(response.data)
        })
    }, [search]);

    return (
        <div>
            <h2>Countries</h2>
            <p>find countries <input value={search} onChange={event => setSearch(event.target.value)}/></p>
            <SearchResult results={countries} count={count} handleShow={handleCountryShow} weather={weather} />
        </div>
    )
}

export default App