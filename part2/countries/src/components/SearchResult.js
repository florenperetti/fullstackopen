import React from 'react'

import Countries from './Countries'
import Country from './Country'

const SearchResult = ({results, count, handleShow, weather}) => {
    if (!count) {
        return <p>no results</p>
    }
    if (count > 10) {
        return <p>too many results</p>
    }
    if (count === 1) {
        return <Country country={results[0]} weather={weather}/>
    }
    return <Countries results={results} handleShow={handleShow} />
}

export default SearchResult