import React from 'react'

const Weather = ({data}) => {
    if (!data) {
        return null
    }
    const { location, current } = data
    const { condition } = current
    return (
        <div>
            <h3>Weather in {location.name}</h3>
            <p><strong>temperature:</strong> {current.temp_c}°C</p>
            <img src={condition.icon} alt={condition.text} title={condition.text}/>
            <p><strong>wind:</strong>{current.wind_kph} kph direction {current.wind_dir}</p>
        </div>
    )
}

export default Weather