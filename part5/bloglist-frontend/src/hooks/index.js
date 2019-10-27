import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    fieldAttrs: {
      type,
      value,
      onChange
    },
    reset
  }
}

export const useResource = () => {
  const [resource, setResource] = useState('')
  
  return {

  }
}